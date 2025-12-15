import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete, Query,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { type getUserDto } from './dto/getUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    //方法的装饰器如果有多个，那么执行的顺序就是从下向上执行，也就是先执行AuthGuard('jwt')，在执行AdminGuard
    @UseGuards(AdminGuard) //想要在AdminGuard 获取用户信息 就需要在AuthGuard('jwt') 上面，等AuthGuard('jwt') 执行完 才进入AdminGuard
    // @UseGuards(AuthGuard('jwt'))
    //如果有很多的守卫 且名字都很长 有可能会写错 就可以使用一个别名guard 然后继承AuthGuard 执行其所有的方法
    @UseGuards(JwtGuard) //等同于   @UseGuards(AuthGuard('jwt'))
    //如果使用UseGuards 传递多个守卫，那么执行顺序就是从前往后执行，如果前一个守卫没有执行通过，那么后面的所有守卫都不会执行
    //等价于上面 下面这个把守卫合起来了  @UseGuards(AuthGuard('jwt'),AdminGuard)   
    async getUsers(@Query() getUserDto: getUserDto) {
        const res = await this.userService.findUser(getUserDto);
        // console.log('res', res);
        return res
    }
    @Post('create')
    create(@Body() CreateUserDto: CreateUserDto) {
        return this.userService.create(CreateUserDto);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.userService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.userService.remove(+id);
    // }
}
