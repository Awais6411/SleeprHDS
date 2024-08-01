import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGurd extends AuthGuard('local') {}
