import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    // tiene ventajas y desventajas (ya que tiene que hacer el transform y demoraria)
    // comvierte la data del request a la data que espera el dto
    transform:true,
    transformOptions:{
      enableImplicitConversion:true
    }
  }))
  
  // await app.listen(3000);
  await app.listen(process.env.PORT);
  console.log("App running on port "+process.env.PORT)
}
bootstrap();
