import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { getUserDto } from 'src/user/dto/getUser.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }
    async login(username: string, password: string) {
        if (!username || !password) {
            throw new HttpException('用户名或密码不能为空', 400)
        }

        const user = await this.userService.findUser({ username, password })
        // return '登录接口' + username + "--" + password

        if (user.length > 0 && user[0].password === password) {
            return await this.jwtService.signAsync({
                sub: user[0].id,
                username: user[0].username
            },
                { expiresIn: '1d' } //局部设置(一般在refresh_token时设置)，在authmodule里面已经全局设置了
            )
        }
        console.log('登录login res', user[0].id)
        throw new UnauthorizedException()
    }
    async register(username: string, password: string) {
        if (!username || !password) {
            throw new HttpException('用户名或密码不能为空', 400)
        }
        const res = this.userService.create({ username, password })
        return res
    }
}
