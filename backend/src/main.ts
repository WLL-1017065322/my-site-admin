import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { Log4jsLogger } from '@nestx-log4js/core';
const logger = new Logger("main.ts");

const serverPort: number = 3000;
/**
 * 主方法
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * swagger配置
   */
  const options = new DocumentBuilder()
    .setTitle('项目管理平台')
    .setDescription('项目管理平台的api管理文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http', scheme: 'bearer', bearerFormat: 'JWT'
    }, 'jwt')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-ui', app, document);

  /**
   * 使用log4js日志框架
   */
  app.useLogger(app.get(Log4jsLogger))
  await app.listen(serverPort);
}
bootstrap().then(() => {
  logger.log(`nest start at ${serverPort}`)
});
