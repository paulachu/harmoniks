import { HttpException, HttpStatus, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSkillDto } from 'src/skills/dto/create-skill.dto';
import { Skill } from 'src/skills/entities/skill.entity';
import { SkillsService } from 'src/skills/skills.service';
import { UsersService } from 'src/users/users.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { BotGateway } from '../bot/bot.gateway';


@Injectable()
export class RequestsService {
  private readonly logger = new Logger(RequestsService.name);

  constructor(@InjectRepository(Request)
              private requestRepository: Repository<Request>, private skillsService: SkillsService,
              private usersService: UsersService,
              private botGateway: BotGateway) {
  }


  async create(createRequestDto: CreateRequestDto, user_id: number): Promise<Request> {
    let newRequest = new Request();
    newRequest.title = createRequestDto.title;
    newRequest.description = createRequestDto.description;
    newRequest.status = 0;
    let userFrom = await this.usersService.findOne(user_id);
    if (!userFrom) {
      this.logger.error('Invalid user');
      throw new HttpException("Invalid user", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    newRequest.user_from = userFrom;
    if (createRequestDto.skills) {
      newRequest.skills = await this.skillsService.getSkills(createRequestDto.skills)
    }
    newRequest.realDiscordLink = await this.botGateway.afterPostingRequest(newRequest.user_from.discord_id);
    return this.requestRepository.save(newRequest).then(res => {
      res.discordLink = `${process.env.BACKEND_URL}/requests/help/${res.id}`;
      let fixedRequest = this.requestRepository.save(res);
      console.log(fixedRequest);
      return fixedRequest;
    }).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    });
  }

  findAll(): Promise<Request[]> {
    return this.requestRepository.find().then(requests => {
      return requests.sort((first, second) => second.createdAt.getTime() - first.createdAt.getTime())
    }).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    });
  }

  findOne(id: number): Promise<Request> {
    return this.requestRepository.findOne(id).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto): Promise<UpdateResult> {
    let newRequest = new Request();
    newRequest.title = updateRequestDto.title;
    newRequest.description = updateRequestDto.description;
    newRequest.status = 0;


    if (updateRequestDto.skills) {
      newRequest.skills = await this.skillsService.getSkills(updateRequestDto.skills);
    }


    return this.requestRepository.update(id, newRequest).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.requestRepository.delete(id).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  removeRequestByUser(userId: number): Promise<DeleteResult> {
    return this.requestRepository.delete({ user_from: { id: userId } }).catch(err => {
      this.logger.error(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  getRequestsByUser(userId: number): Promise<Request[]> {
    return this.requestRepository.find({ where: { user_from: { id: userId } } }).then(requests => {
      return requests.sort((first, second) => second.createdAt.getTime() - first.createdAt.getTime())
    }).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }


  async addUserToRequest(userId: number, id: number): Promise<UpdateResult>
  {
    let request = await this.requestRepository.findOne(id);
    request.helpers.push(await this.usersService.findOne(userId));
    return this.requestRepository.update(id, request).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async markAsSolved(id: number, user_id: number, user_from_id: number)
  {
    let request = await this.requestRepository.findOne(id);
    if (request.user_from.id !== user_from_id)
    {
      this.logger.error('Bien essayer garcon');
      throw new HttpException("error: Bien essayer garcon", HttpStatus.FORBIDDEN);
    }
    let owner = await this.usersService.findOne(user_from_id);
    owner.debt -= 1;
    await this.usersService.update(user_from_id, owner);
    let user = await this.usersService.findOne(user_id);
    user.debt += 1;
    await this.usersService.update(user_id, user);
    request.status = 1;
    return this.requestRepository.update(id, request).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async helpSomeone(requestId: number, helperUserInfo: {email: string, id: number}) {
    let currentRequest = await this.findOne(requestId);
    if (!currentRequest) {
      throw new NotImplementedException();
    }
    let neederUser = currentRequest.user_from;
    if (neederUser.id !== helperUserInfo.id) {
      let helperUser = await this.usersService.findOne(helperUserInfo.id);
      await this.botGateway.helperWantToJoin(neederUser.discord_id, helperUser.discord_id);
    }
    return currentRequest.realDiscordLink;
  }
}
