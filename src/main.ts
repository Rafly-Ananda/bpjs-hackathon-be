import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bootstrap MQTT as Client (Consumer)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      host: process.env.MQTT_HOST,
      port: 8883,
      protocol: 'mqtts',
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASS,
    },
  });

  // Start microservices
  await app.startAllMicroservices();
  await app.listen(process.env.HOST_PORT || 3000);

  console.log(`NestJS app running on port ${process.env.HOST_PORT || 3000} 🚀`);
}

bootstrap();
