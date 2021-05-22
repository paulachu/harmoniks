import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  private readonly logger = new Logger(SkillsService.name)
  constructor(@InjectRepository(Skill)
  private skillRepository: Repository<Skill>)
  {
  }
  create(createSkillDto: CreateSkillDto) :Promise<Skill> {
    return this.skillRepository.save(createSkillDto).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })
  }

  findAll() : Promise<Skill[]> {
    return this.skillRepository.find().catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })
  }

  findOne(id: number) : Promise<Skill> {
    return this.skillRepository.findOne(id).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })
  }

  update(id: number, updateSkillDto: UpdateSkillDto) : Promise<UpdateResult> {
    return this.skillRepository.update(id, updateSkillDto).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })
  }

  remove(id: number) : Promise<DeleteResult>{
    return this.skillRepository.delete(id).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })
  }

  public async getSkills(skills: string[]): Promise<Skill[]> {
    let newSkills: Skill[] = [];
    let currentSkills: Skill[] = await this.findAll();

    for (const element of skills) {
      if (!currentSkills.find(el => el.tags === element)) {
        let dto = new CreateSkillDto();
        dto.tags = element;
        await this.create(dto).then(skill => {newSkills.push(skill)});
      }
      else
      {
        newSkills.push(currentSkills.find(el => el.tags === element));
      }
    }
    return newSkills;
  }

  /*
  addUser(id: number) : Promise<Skill>{
    this.skillRepository.findOne(id).then(skill => skill.users.push())
  }*/
}
