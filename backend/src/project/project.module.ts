import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from 'src/skills/skills.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [TypeOrmModule.forFeature([Project]), SkillsModule, UsersModule]
})
export class ProjectModule {}
