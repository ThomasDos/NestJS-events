import * as Joi from '@hapi/joi';
export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNC: Joi.string().required(),
  DB_DROP_SCHEMA: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
