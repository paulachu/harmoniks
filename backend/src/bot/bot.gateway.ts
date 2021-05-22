import {Injectable, Logger } from '@nestjs/common';
import { Once, ClientProvider, Client, OnCommand, On } from 'discord-nestjs';
import { Message, User } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);
  private readonly guildIdFromWebhook = '845236496554131456';


  @Client()
  private readonly discordProvider: ClientProvider;

  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.log(`Logged in as ${this.discordProvider.getClient().user.tag}!`);
    this.discordProvider.getWebhookClient().send('hello bot is up!').catch(err => {
      this.logger.error(err);
    }) ;
  }

  @OnCommand({name: 'start'})
  async onCommand(message: Message): Promise<void> {
    this.logger.log(message.author);
    await message.reply(`Execute command: ${message.content}`);
  }

  @OnCommand({name: 'help'})
  async onHelp(message: Message): Promise<void> {
    const msg = await message.reply('Attends deux secondes');
    await msg.delete({timeout: 1, reason: ''});
  }

  @OnCommand({ name: 'newchan' })
  async onMessage(message: Message): Promise<void> {
    message.guild.channels.create('Ok').then(textChannel => {
      message.reply('Nouveau channel crée');
    });
  }

  private getUserDiscordInfo(discordId: string): {name: string, discriminator: string} {
    let separator = discordId.indexOf('#');
    return {
      name: discordId.slice(0, separator),
      discriminator: discordId.slice(separator + 1)
    }
  }

  private async findUser(userDiscordInfo: string): Promise<User> {
    const currentUserInfo = this.getUserDiscordInfo(userDiscordInfo);
    return this.discordProvider.getClient().users.cache.find(user => {
      return user.discriminator === currentUserInfo.discriminator && user.username === currentUserInfo.name
    });
  }

  private async createFullChannelForUser(userInfo: User): Promise<string> {
    const guild = await this.discordProvider.getClient().guilds.fetch(this.guildIdFromWebhook);
    const categoryChannel = await guild.channels.create('Channel-category', {type: 'category'});
    const voiceChannel = await categoryChannel.guild.channels.create('vocal' + Math.random(), {type: 'voice', parent: categoryChannel});
    const textChannel = await categoryChannel.guild.channels.create('textuel' + Math.random(), {type: 'text', parent: categoryChannel});
    const invitation = await textChannel.createInvite({maxAge: 60, temporary: true});
    return invitation.url;
  }

  async afterPostingRequest(userDiscordId: string) {
      const userInfo = await this.findUser(userDiscordId);
      const inviteUrl = await this.createFullChannelForUser(userInfo);
      return inviteUrl;
  }

}
