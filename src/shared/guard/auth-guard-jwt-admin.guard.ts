import { AuthGuard } from '@nestjs/passport';

export class AuthGuardJwtAdmin extends AuthGuard('jwt-admin') {}
