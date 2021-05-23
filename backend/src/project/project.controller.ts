import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get("my")
  getMyProjects(@Req() req)
  {
    return this.projectService.findByUserId(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("addUser/:id")
  addUser(@Param('id') id: string, @Req() req)
  {
    return this.projectService.addUser(+id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("resolved/:id")
  markAsSolved(@Param('id') id: string, @Body('user_id') user_id: number)
  {
    return this.projectService.markAsSolved(+id, user_id);
  }
}
