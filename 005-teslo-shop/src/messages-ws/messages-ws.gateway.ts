import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io'
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

// investigar sobre namespaces
// namespace : por defecto es /
// son como salas

@WebSocketGateway({ cors : true })
export class MessagesWsGateway implements OnGatewayConnection,OnGatewayDisconnect {

  // para las emiciones
  @WebSocketServer() wss:Server
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}

  async handleConnection(client: Socket, ...args: any[]) {
    
    const token = client.handshake.headers.authentication as string
    
    let payload: JwtPayload;
    
    try {
      payload = this.jwtService.verify( token );
      await this.messagesWsService.registerClient( client, payload.id );
      console.log('cliente conectado : ',{ socket_client:client.id,uid:payload.id })
    } catch (error) {
      console.log('cliente desconectado : ',{ socket_client:client.id,uid:payload.id })
      client.disconnect();
      return;
    }

    // this.messagesWsService.registerClient(client)
    console.log({ connected: this.messagesWsService.getConnectedClients() })

    // client.join('ventas')
    // client.join(client.id)
    // this.wss.to('ventas').emit('')

    // se recomienda que el nombre del evento sea una enumeracion
    this.wss.emit('clients-updated',this.messagesWsService.getArrConnectedClients())
    // throw new Error('Method not implemented.');
  }
  handleDisconnect(client: Socket) {
    console.log('cliente desconectado : ',client.id)
    this.messagesWsService.removeClient(client.id)
    this.wss.emit('clients-updated',this.messagesWsService.getArrConnectedClients())
    // throw new Error('Method not implemented.');
  }

  // en lugar de poner todo this.wss.on

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client:Socket,payload:NewMessageDto){

    //! Emite únicamente al cliente que emitio el evento
    // client.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   message: payload.message || 'no-message!!'
    // });

    //! Emitir a todos MENOS, al cliente que emitio el evento
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy Yo!',
    //   message: payload.message || 'no-message!!'
    // });

    this.wss.emit('message-from-server',{
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no-message!!'
    })
  }
}
