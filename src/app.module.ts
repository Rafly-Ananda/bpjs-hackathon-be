import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { IcuMachineModule } from './icu-machine/icu-machine.module';

@Module({
  imports: [
    // ENV
    ConfigModule.forRoot({ isGlobal: true }),
    // Bootstrap MQTT as Producer (Publisher)
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          host: process.env.MQTT_HOST,
          port: 8883,
          protocol: 'mqtts',
          username: process.env.MQTT_USER,
          password: process.env.MQTT_PASS,
        },
      },
    ]),
    AuthModule,
    UsersModule,
    PrismaModule,
    IcuMachineModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
