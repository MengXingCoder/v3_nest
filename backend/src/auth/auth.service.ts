import { HttpException, Injectable } from '@nestjs/common';
import { getUserDto } from 'src/user/dto/getUser.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }
    async login(username: string, password: string) {
        if (!username || !password) {
            throw new HttpException('用户名或密码不能为空', 400)
        }
        const res = await this.userService.findUser({ username, password } as getUserDto)
        // return '登录接口' + username + "--" + password
        return res
    }
    async register(username: string, password: string) {
        if (!username || !password) {
            throw new HttpException('用户名或密码不能为空', 400)
        }
        const res = this.userService.create({ username, password })
        return res
    }
}
