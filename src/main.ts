import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 app.useGlobalPipes(
   new ValidationPipe({
     transform: true, // Transforme les données en types spécifiés
     whitelist: true, // Retire les propriétés qui ne sont pas définies dans le DTO
     forbidNonWhitelisted: true, // Lance une erreur si des propriétés non validées sont envoyées
   }),
 );
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');


  

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Coding City Groupe API')
    .setDescription(
      'API pour Coding City Groupe',
    )
    .setVersion('1.0')
    .addTag('Coding City Groupe')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
