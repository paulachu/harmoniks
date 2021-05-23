import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProvider, Once, OnCommand } from 'discord-nestjs';
import { CategoryChannel, Message, User } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);
  private readonly guildIdFromWebhook = '845236496554131456';
  private readonly createdChannels = [];

  constructor() {
    setInterval(() => {
      this.cleanChannels();
    }, /*60000*/30000);
  }

  private cleanChannels() {
    for (const channel of this.createdChannels) {
      if (channel.deletable) {
        this.createdChannels.splice(this.createdChannels.indexOf(channel), 1);
        channel.delete().then(res => {
          return res
        });
      }
    }
  }

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

  /**
   * We first retrieve discord server then we create 3 channels : Category, vocal & text
   * We push it to our list of channel that are going to be clean every 30minutes
   * @param userInfo
   * @private
   */
  private async createFullChannelForUser(userInfo: string): Promise<CategoryChannel> {
    const guild = await this.discordProvider.getClient().guilds.fetch(this.guildIdFromWebhook);
    const categoryChannel = await guild.channels.create(userInfo, {type: 'category'});
    const voiceChannel = await categoryChannel.guild.channels.create('vocal', {type: 'voice', parent: categoryChannel});
    const textChannel = await categoryChannel.guild.channels.create('textuel', {type: 'text', parent: categoryChannel});
    this.createdChannels.push(voiceChannel, categoryChannel, textChannel);
    return categoryChannel;
  }

  private async getInviteForChannel(categoryChannel: CategoryChannel) {
    const invitation = await categoryChannel.children.find(childChannel => {
      return childChannel.name === 'vocal';
    }).createInvite({maxAge: 60, temporary: true, maxUses: 3});
    return invitation.url;
  }

  private async setPermissionsToChanelForUser(categoryChannel: CategoryChannel, userInfo: User): Promise<CategoryChannel> {
    await categoryChannel.updateOverwrite(categoryChannel.guild.roles.everyone, {VIEW_CHANNEL: false});
    await categoryChannel.updateOverwrite(userInfo.id, {VIEW_CHANNEL: true});
    return categoryChannel;
  }

  async helperWantToJoin(neederDiscordId: string, helperDiscordId: string) {
    const guild = await this.discordProvider.getClient().guilds.fetch(this.guildIdFromWebhook);
    const existingChannel = guild.channels.cache.find(channel => {
      return channel.name === neederDiscordId;
    });
    const helperInfo = await this.findUser(helperDiscordId);
    await existingChannel.updateOverwrite(helperInfo.id, {VIEW_CHANNEL: true});
    return 'OK';
  }

  async afterPostingRequest(userDiscordId: string) {
      const userInfo = await this.findUser(userDiscordId);
      const categoryChannel = await this.createFullChannelForUser(userDiscordId);
      const categoryChannelWithPermission = await this.setPermissionsToChanelForUser(categoryChannel, userInfo);
      const inviteUrl = await this.getInviteForChannel(categoryChannelWithPermission);
      return inviteUrl;
  }

}
