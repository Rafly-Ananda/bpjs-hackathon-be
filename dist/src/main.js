"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.MQTT,
        options: {
            host: process.env.MQTT_HOST,
            port: 8883,
            protocol: 'mqtts',
            username: process.env.MQTT_USER,
            password: process.env.MQTT_PASS,
        },
    });
    await app.startAllMicroservices();
    await app.listen(process.env.HOST_PORT || 3000);
    console.log(`NestJS app running on port ${process.env.HOST_PORT || 3000} 🚀`);
}
bootstrap();
//# sourceMappingURL=main.js.map