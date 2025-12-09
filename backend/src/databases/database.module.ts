import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEnum } from 'src/enum/config.enum';
import { AppConfigModule } from 'src/config/config.module';  //导入配置模块


// 导入所有实体
import { User, Profile, Logs, Roles,Test } from 'src/entities/'; // 导入实体

@Module({
  imports: [
    AppConfigModule,
    // 2. 配置 TypeORM
    TypeOrmModule.forRootAsync({
      // 不需要再 imports: [ConfigModule]，//因为 AppConfigModule 已全局注册 ConfigService
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(ConfigEnum.DB_HOST),
        port: configService.get<number>(ConfigEnum.DB_PORT),
        username: configService.get<string>(ConfigEnum.DB_USERNAME),
        password: configService.get<string>(ConfigEnum.DB_PASSWORD),
        database: configService.get<string>(ConfigEnum.DB_DATABASE),
        synchronize: configService.get<boolean>(ConfigEnum.DB_SYNC),
        entities: [User, Profile, Logs, Roles,Test], 
        logging: ['error'],
      }),
    }),
  ],
  exports: [TypeOrmModule], // 导出该模块，供其他模块能使用 TypeORM 功能 (增删改查)
})
export class DatabaseModule {}
