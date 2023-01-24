import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  // en el AuthModule tengo que expoertar TyePorm para poder utilizar el repositorio del usuario
  imports:[AuthModule]
})
export class MessagesWsModule {}
