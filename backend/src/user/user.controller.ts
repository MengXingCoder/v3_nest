import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete, Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { type getUserDto } from './dto/getUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async getUsers(@Query() getUserDto: getUserDto) {
        const res = await this.userService.findUser(getUserDto);
        console.log('res', res);
        return res
    }
    @Post('create')
    create(@Body() CreateUserDto: CreateUserDto) {
        return this.userService.create(CreateUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
