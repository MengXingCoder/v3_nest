import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { ConfigEnum } from 'src/enum/config.enum';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports: [UserModule, PassportModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (ConfigService: ConfigService) => {
            console.log('jwt setting', ConfigService.get<string>(ConfigEnum.SECRET))
            return {
                secret: ConfigService.get<string>(ConfigEnum.SECRET),
                signOptions: {
                    expiresIn: '1d'
                }
            }
        },
        inject: [ConfigService]
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
