import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';

// Jwt+strategry策略配合使用流程
// [ConfigModule] 
//     ↓ 提供配置
// [AuthService] → 使用 JwtService.sign() → 生成 Token（登录时）
//     ↑
// [JwtModule] ← 注册 secret/expiresIn → 提供 JwtService

//                           ↗ LocalStrategy（用户名+密码登录）
// [PassportModule] → 支持多种策略 → JwtStrategy（Token 验证）
//                           ↘ 其他 Strategy（OAuth, Google, etc.）

// [JwtStrategy] → 使用 passport-jwt → 解析并验证 JWT → 返回 user 对象 → 注入 req.user

// [AuthGuard('jwt')] → 在路由上启用 JwtStrategy → 自动拦截请求 → 验证 Token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(protected ConfigService: ConfigService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ConfigService.get(ConfigEnum.SECRET),
        });
    }

    async validate(payload: any) {
        console.log('jwt.strategy payload', payload)
        return { userId: payload.sub, username: payload.username };
    }
}
