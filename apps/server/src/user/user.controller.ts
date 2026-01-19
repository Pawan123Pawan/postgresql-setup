import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
