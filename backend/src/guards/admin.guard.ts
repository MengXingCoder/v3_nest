import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private userService: UserService) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        //1、获取请求信息
        const cxt = context.switchToHttp().getRequest()
        // console.log('guards 获取请求信息 cxt.user', cxt.user)

        // console.log('guards 获取请求信息 cxt.url', cxt.url)
        // console.log('guards 获取请求信息 cxt.method', cxt.method)
        // console.log('guards 获取请求信息 cxt.rawHeaders,', cxt.rawHeaders)
        //2、获取请求中的用户信息，进行逻辑判断
        const userInfo = await this.userService.findUser({ username: cxt.user.username })
        console.log('获取请求中的用户信息 user', JSON.parse(JSON.stringify(userInfo))[0])
        // if (JSON.parse(JSON.stringify(userInfo))[0].roles[0].name === 'admin') {
        //     return true
        // }
        if (['user1', 'user2', 'user3', 'user123', 'admin', 'admin1'].includes(JSON.parse(JSON.stringify(userInfo))[0].username)) {
            return true
        }
        return false;
    }
}
