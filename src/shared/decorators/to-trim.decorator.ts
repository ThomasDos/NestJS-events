import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const ToTrim = applyDecorators(Transform(({ value }) => value.trim()));
