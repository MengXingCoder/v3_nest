import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.validation';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: configValidationSchema,
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}