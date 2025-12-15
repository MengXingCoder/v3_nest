import * as crypto from 'crypto';
(global as any).crypto = crypto;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    //全局拦截器
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,// 去掉类上不存在的字段 即验证器会去掉没有验证装饰器的属性
    }))
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
