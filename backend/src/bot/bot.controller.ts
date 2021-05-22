import { Controller, Get, Req } from '@nestjs/common';
import { BotGateway } from './bot.gateway';

@Controller('bot')
export class BotController {
  constructor(private readonly botGateway: BotGateway) {}

}
