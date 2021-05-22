import { HttpModule, Module } from '@nestjs/common';
import { DiscordModule, TransformPipe, ValidationPipe } from 'discord-nestjs';
import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';

@Module({
  controllers: [BotController],
  imports: [HttpModule,
    DiscordModule.forRoot({
      token: 'ODQ1NTUyNzcyNjY0NjU1ODgy.YKioYg.ppLY8JSQHfMLXKaPgN7HFZ2tLeY',
      commandPrefix: '$',
      allowGuilds: ['845236496554131456'],
      denyGuilds: [''],
      webhook: {
        webhookId: '845667625510109225',
        webhookToken: 'Rpzvq1v5mVLjZFbqPQKlGOEy-aJ7vRSxopRMLPUyEzh0AYS36HjKPq4mCuQn5sCyeBnv',
      },
      usePipes: [TransformPipe, ValidationPipe],
      // and other discord options
    }),
  ],
  providers: [BotGateway, BotService],
})
export class BotModule {}
