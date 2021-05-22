import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillsService } from 'src/skills/skills.service';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name)
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>, private skillsService: SkillsService
  ){}


  async create(createProjectDto: CreateProjectDto) : Promise<Project> {
    let project = new Project();
    project.description = createProjectDto.description;
    project.title = createProjectDto.title;
    project.skills = await this.skillsService.getSkills(createProjectDto.skills);

    return this.projectRepository.save(project).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  findAll() : Promise<Project[]> {
    return this.projectRepository.find().catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  findOne(id: number) : Promise<Project> {
    return this.projectRepository.findOne(id).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) : Promise<UpdateResult>{
    let project = new Project();
    project.description = updateProjectDto.description;
    project.title = updateProjectDto.title;
    project.skills = await this.skillsService.getSkills(updateProjectDto.skills);
    return this.projectRepository.update(id, project).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  remove(id: number) : Promise<DeleteResult> {
    return this.projectRepository.delete(id).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async addUser(id: number, user: User) : Promise<UpdateResult>
  {
    let project = await this.findOne(id);
    project.users.push(user);
    return this.projectRepository.update(id, project).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
  findByUserId(userId: number) : Promise<Project[]>
  {
    return this.projectRepository.find({ where: {users: {id: userId}}}).catch(err =>
      {
        this.logger.error(err.message);
        throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
