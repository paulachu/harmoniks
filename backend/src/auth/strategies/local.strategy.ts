import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // Logger
  private readonly logger = new Logger(AuthService.name);

  constructor(private authService: AuthService) {
    super({
      usernameField: 'mail'
    });
  }

  /**
   * Overriding the validate function to validate the user to give him access through the passport strategy
   * @param mail : string: User email
   * @param password: string: User password
   */
  async validate(mail: string, password: string): Promise<any> {
    /*const user = await this.authService.validateLogin(mail, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;*/
    throw new NotImplementedException('NaN', 'Nan');
  }
}
