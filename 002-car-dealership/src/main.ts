import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true, // borrara los campos que no se espera del dto
      forbidNonWhitelisted:true // me mandara un error si envia campos que no estan en el dto
    })
  )
  await app.listen(3000);
}
bootstrap();
