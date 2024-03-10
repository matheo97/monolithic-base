import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/public.decorator';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Public()
  @Get('/public')
  async public() {
    return 'Public';
  }

  @Get('/not-public')
  async notPublic() {
    return 'Not Public';
  }
}
