import { Injectable } from '@nestjs/common';
import { BotGateway } from './bot.gateway';

@Injectable()
export class BotService {

  constructor(private botGateway: BotGateway) {}


}
