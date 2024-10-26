import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

// TypeDef
import { ApiResponse } from './utils/type-definitions/response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse<{ message: string }> {
    return this.appService.getHello();
  }

  // Endpoint to publish a message to an MQTT topic
  @Post('publish')
  publishToMQTT(@Body() payload: { topic: string; message: object }) {
    const topic = 'xoxosos';
    const message = {
      ecg: 96,
      sp02: 92,
      rr: 13,
      bt: 48,
      nibt: 95,
      hr: 89,
      idMesinIcu: 'eee4e813-e74d-40a8-95da-47dad2e1cb65',
    };
    this.appService.publishMessage(topic, message);
    return { success: true, topic, message };
  }
}
