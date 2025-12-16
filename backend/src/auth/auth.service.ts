import { ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { getUserDto } from 'src/user/dto/getUser.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, verificationPassword } from 'src/utils/hashAndVerification';
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }
    async login(username: string, password: string) {

        console.log('auth-----', password)
        const user = await this.userService.findUser({ username, password })
        if (!user) {
            throw new ForbiddenException('用户名不存在，请注册')
        }

        const verifyResult = verificationPassword(password, user[0].password)
        console.log('登录信息', user, { username, password }, verifyResult)
        if (!verifyResult) {
            throw new ForbiddenException('用户名或者密码错误')

        }

        return await this.jwtService.signAsync({
            sub: user[0].id,
            username: user[0].username
        },
            { expiresIn: '1d' } //局部设置(一般在refresh_token时设置)，在authmodule里面已经全局设置了
        )
    }
    async register(username: string, password: string) {
        if (!username || !password) {
            throw new HttpException('用户名或密码不能为空', 400)
        }
        const res = this.userService.create({ username, password })
        return res
    }
}
