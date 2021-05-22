import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { SchoolService } from 'src/school/school.service';
import { SkillsService } from '../skills/skills.service';
import { Skill } from '../skills/entities/skill.entity';
import { CreateSkillDto } from '../skills/dto/create-skill.dto';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, private schoolService: SchoolService, private skillsService: SkillsService
  ) {}

  private async createUserFromDto(userDto: CreateUserDto | UpdateUserDto): Promise<User> {
    let afterAt = userDto.email.indexOf('@');
    let domain = userDto.email.substr(afterAt + 1);
    let school = await this.schoolService.findByDomain(domain);
    if (!school)
    {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    let newUser = new User();
    newUser.discord_id = userDto.discord_id;
    newUser.email = userDto.email;
    newUser.full_name = userDto.full_name;
    newUser.hopper_link = userDto.hopper_link;
    newUser.linkedin_link = userDto.linkedin_link;
    newUser.password = userDto.password;
    newUser.skills = await this.skillsService.getSkills(userDto.skills);
    newUser.school = school;
    return newUser;
  }


  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.createUserFromDto(createUserDto);
    return this.usersRepository.save(newUser).catch(err =>
    {
      this.logger.error(err);
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find().catch(err => {
      this.logger.error(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id).catch(err => {
      this.logger.error(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }


  async updateWithDto(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const newUser = await this.createUserFromDto(updateUserDto);
    return this.usersRepository.update(id, newUser).catch(err => {
      this.logger.error(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
  async update(id, user: User): Promise<UpdateResult> {
    return this.usersRepository.update(id, user).catch(err => {
      this.logger.error(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id).catch(err => {
      this.logger.error(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
