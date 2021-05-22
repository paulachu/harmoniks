import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { DeleteResult, Repository, UpdateQuery, UpdateResult } from 'typeorm';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './entities/school.entity';

@Injectable()
export class SchoolService {
  private readonly logger = new Logger(SchoolService.name)
  constructor(@InjectRepository(School)
  private schoolRepository: Repository<School>)
  {
  }

  create(createSchoolDto: CreateSchoolDto) : Promise<School>{
    return this.schoolRepository.save(createSchoolDto).
    catch (e =>
      {
        this.logger.error(e.message);
        throw new HttpException("error: " + e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    )
  }

  findAll() : Promise<School[]>{
    return this.schoolRepository.find().
    catch (e =>
      {
        this.logger.error(e.message);
        throw new HttpException("error: " + e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    )
  }

  findOne(id: number) : Promise<School>{
    return this.schoolRepository.findOne(id).
    catch (e =>
      {
        this.logger.error(e.message);
        throw new HttpException("error: " + e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    )
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) : Promise<UpdateResult>{
    return this.schoolRepository.update(id, updateSchoolDto).
    catch (e =>
      {
        this.logger.error(e.message);
        throw new HttpException("error: " + e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    )
  }

  remove(id: number) : Promise<DeleteResult>{
    return this.schoolRepository.delete(id).
    catch (e =>
      {
        this.logger.error(e.message);
        throw new HttpException("error: " + e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    )
  }

  findByDomain(domain: string): Promise<School>
  {
    console.log(domain);
    return this.schoolRepository.findOne({domain}).catch(err => {
      this.logger.error(err);
      throw new HttpException("error: " + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }
}
