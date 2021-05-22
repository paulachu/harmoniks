import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';
import { SkillsModule } from './skills/skills.module';
import { RequestsModule } from './requests/requests.module';
import { BotModule } from './bot/bot.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
  }), UsersModule, SchoolModule, TypeOrmModule.forRoot(), AuthModule, SkillsModule, RequestsModule, BotModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
