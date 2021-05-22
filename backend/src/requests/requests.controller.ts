import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
