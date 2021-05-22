import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { SkillsModule } from 'src/skills/skills.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  imports: [TypeOrmModule.forFeature([Request]), SkillsModule, UsersModule]
})
export class RequestsModule {}
