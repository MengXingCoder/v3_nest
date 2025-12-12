import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/login')
    login(@Body() dto: loginUserDto) {
        const { username, password } = dto
        return this.authService.login(username, password)
    }

    @Post('/register')
    register(@Body() dto: any) {
        const { username, password } = dto

        return this.authService.register(username, password)
    }
}
