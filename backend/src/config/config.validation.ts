import * as Joi from 'joi';
import { DatabaseValidationSchema } from './validation/database.validation';
import { LoggerValidationSchema } from './validation/logger.validation';


export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  ...DatabaseValidationSchema,
  ...LoggerValidationSchema,
  
});