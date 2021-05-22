import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto).catch(err =>
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
