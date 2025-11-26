import { Global, Module } from '@nestjs/common';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => {
        const isProduction = process.env.NODE_ENV === 'production';
        return {
          level: isProduction ? 'info' : 'debug',
          format: isProduction
            ? winston.format.json()
            : winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike('Winston Logger', {
                  colors: true,
                  prettyPrint: true,
                }),
              ),
          transports: [
            new winston.transports.Console(),
            ...(isProduction
              ? [
                  new winston.transports.File({
                    filename: path.join(process.cwd(), 'logs', 'app.log'),
                    maxsize: 10 * 1024 * 1024,
                    maxFiles: 5,
                  }),
                ]
              : []),
          ],
        };
      },
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
