import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils/constants/main';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  supp(): Object {
    return { message: 'hello from the other side xoxo :)' };
  }
}
