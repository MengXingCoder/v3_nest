import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/login')
    async login(@Body() dto: loginUserDto) {
        const { username, password } = dto
        const token = await this.authService.login(username, password)
        console.log('token', token)
        return {
            access_token: token
        }
    }

    @Post('/register')
    register(@Body() dto: any) {
        const { username, password } = dto

        return this.authService.register(username, password)
    }
}
