import * as Joi from 'joi';

export const LoggerValidationSchema = {
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug')
    .default('info'),
  LOG_FILE_PATH: Joi.string().optional().default('./logs/app.log'),
  LOG_CONSOLE: Joi.boolean().default(true),
};