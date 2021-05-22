import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, private schoolService: SchoolService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let afterAt = createUserDto.email.indexOf('@');
    let domain = createUserDto.email.substr(afterAt + 1);
    let school = await this.schoolService.findByDomain(domain);
    if (!school)
    {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    let newUser = new User();
    newUser.discord_id = createUserDto.discord_id;
    newUser.email = createUserDto.email;
    newUser.full_name = createUserDto.full_name;
    newUser.hopper_link = createUserDto.hopper_link;
    newUser.linkedin_link = createUserDto.linkedin_link;
    newUser.password = createUserDto.password;
    newUser.skills = createUserDto.skills;
    newUser.school = school;
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

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto).catch(err => {
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
