import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module'; //导入配置模块
import { DatabaseModule } from 'src/databases/database.module'; //导入数据库模块
@Module({
  imports: [AppConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
