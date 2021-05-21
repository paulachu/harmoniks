import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './secrets/constants'

@Module({
  imports: [/*UsersModule, PassportModule.register({session: true}), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })*/],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
