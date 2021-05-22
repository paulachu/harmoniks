import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSkillDto } from 'src/skills/dto/create-skill.dto';
import { Skill } from 'src/skills/entities/skill.entity';
import { SkillsService } from 'src/skills/skills.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';


@Injectable()
export class RequestsService {
  private readonly logger = new Logger(RequestsService.name)
  constructor(@InjectRepository(Request)
  private requestRepository: Repository<Request>, private skillsService: SkillsService)
  {
  }


  private async getSkills(skills: string[]) : Promise<Skill[]>
  {
    let newSkills: Skill[] = [];
    let currentSkills: Skill[] = await this.skillsService.findAll();

    skills.forEach(async (element) => {
      if (!currentSkills.find(el => el.tags === element))
      {
        let dto = new CreateSkillDto();
        newSkills.push(await this.skillsService.create(dto));
      }
      else
      {
        newSkills.push(currentSkills.find(el => el.tags === element));
      }
    });

    return newSkills;
  }
  async create(createRequestDto: CreateRequestDto) : Promise<Request> {
    let newRequest = new Request();
    newRequest.title = createRequestDto.title;
    newRequest.description = createRequestDto.description;
    newRequest.status = 0;


    if (createRequestDto.skills) {
      newRequest.skills = await this.getSkills(createRequestDto.skills)
    }

    return this.requestRepository.save(newRequest).catch(err =>
      {
        this.logger.error(err);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      });
  }

  findAll() : Promise<Request[]> {
    return this.requestRepository.find().then(requests => {
      return requests.sort((first, second) => first.createdAt.getTime() - second.createdAt.getTime())
    }).catch(err =>
      {
        this.logger.error(err);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      });
  }

  findOne(id: number) : Promise<Request>{
    return this.requestRepository.findOne(id).catch(err =>
      {
        this.logger.error(err);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) : Promise<UpdateResult> {
    let newRequest = new Request();
    newRequest.title = updateRequestDto.title;
    newRequest.description = updateRequestDto.description;
    newRequest.status = 0;



    if (updateRequestDto.skills)
    {
      newRequest.skills = await this.getSkills(updateRequestDto.skills);
    }


    return this.requestRepository.update(id, newRequest).catch(err =>
      {
        this.logger.error(err);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      });
  }

  remove(id: number) :Promise<DeleteResult> {
    return this.requestRepository.delete(id).catch(err =>
      {
        this.logger.error(err);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      });
  }
}
