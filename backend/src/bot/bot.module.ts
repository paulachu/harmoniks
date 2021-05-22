import { Module } from '@nestjs/common';
import { DiscordModule, TransformPipe, ValidationPipe } from 'discord-nestjs';
import { BotGateway } from './bot-gateway';
import { BotService } from './bot.service';

@Module({
  imports: [
    DiscordModule.forRoot({
      token: 'Njg2MzI2OTMwNTg4NTY1NTQx.XmVlww.EF_bMXRvYgMUCQhg_jYnieoBW-k',
      commandPrefix: '!',
      allowGuilds: ['745366351929016363'],
      denyGuilds: ['520622812742811698'],
      allowCommands: [
        {
          name: 'some',
          channels: ['745366352386326572'],
          users: ['261863053329563648'],
          channelType: ['dm']
        },
      ],
      webhook: {
        webhookId: 'your_webhook_id',
        webhookToken: 'your_webhook_token',
      },
      usePipes: [TransformPipe, ValidationPipe],
      // and other discord options
    }),
  ],
  providers: [BotGateway, BotService],
})
export class BotModule {}
