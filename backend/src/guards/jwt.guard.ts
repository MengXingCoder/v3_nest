import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super()// 执行力AuthGuard的所有方法
    }
}
