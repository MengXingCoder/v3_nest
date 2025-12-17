import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module'; //导入配置模块
import { DatabaseModule } from 'src/databases/database.module'; //导入数据库模块
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { CrudModule } from './crud/crud.module';

import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';
@Module({
    imports: [AppConfigModule, DatabaseModule, LoggerModule, UserModule, CrudModule, AuthModule, RolesModule, MenusModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
