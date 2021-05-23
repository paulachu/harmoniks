import { Controller, Get, Req } from '@nestjs/common';
import { BotGateway } from './bot.gateway';

@Controller('bot')
export class BotController {
  constructor(private readonly botGateway: BotGateway) {}

  @Get()
  async createChan() {
    let user = 'GodEvening#9909';
    return this.botGateway.afterPostingRequest(user);
  }

  @Get('/helper')
  async givePermissionsUser() {
    let needer = 'GodEvening#9909';
    let helper = 'Samy#3779';
    return this.botGateway.helperWantToJoin(needer, helper);
  }
}
