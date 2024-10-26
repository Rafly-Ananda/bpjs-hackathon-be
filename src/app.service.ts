import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// TypeDef
import { ApiResponse } from './utils/type-definitions/response.interface';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
  ) {}

  publishMessage(topic: string, message: object) {
    this.mqttClient.emit(topic, message);
  }

  getHello(): ApiResponse<{ message: string }> {
    try {
      return {
        status: 'success',
        data: {
          message: 'Hello World!',
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
