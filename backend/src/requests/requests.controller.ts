import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRequestDto: CreateRequestDto, @Req() req) {
    return this.requestsService.create(createRequestDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("my")
  getMyRequests(@Req() req){
    return this.requestsService.getRequestsByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("my")
  deleteMyCurrentRequest(@Req() req){
    return this.requestsService.getRequestsByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }

  @Patch(':id')
  addUser(@Param('id') id: string,  @Body('user_id') user_id: number)
  {
    return this.requestsService.addUserToRequest(user_id, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  markAsSolved(@Param('id') id: string,  @Body('user_id') user_id: number, @Req() req)
  {
    return this.requestsService.markAsSolved(+id, user_id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('help/:requestId')
  async helpSomeone(@Param('requestId') requestId: string, @Req() req, @Res() res: Response) {
    let discordLink = await this.requestsService.helpSomeone(+requestId, req.user);
    res.redirect(discordLink);
  }
}
