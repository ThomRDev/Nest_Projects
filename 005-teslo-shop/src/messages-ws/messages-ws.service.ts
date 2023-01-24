import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
    [id:string]: {
        socket: Socket,
        user: User
    }
}

@Injectable()
export class MessagesWsService {
    private connectedClients:ConnectedClients = {}

    constructor(
        @InjectRepository(User)
        private readonly userRespotitory:Repository<User>
    ){}

    async registerClient(client:Socket,userId:string){
        const user = await this.userRespotitory.findOneBy({ id : userId })
        if(!user) throw new Error('User not found')
        if( !user.isActive ) throw new Error('User not active')

        this.checkUserConnection( user );
        // this.connectedClients[client.id] = client
        this.connectedClients[client.id] = {
            socket: client,
            user: user,
        };
    }

    removeClient(clientID:string){
        delete this.connectedClients[clientID]
    }

    getConnectedClients():number{
        return Object.keys(this.connectedClients).length
    }
    getArrConnectedClients():string[]{
        return Object.keys(this.connectedClients)
    }

    getUserFullName(socketId:string){
        return this.connectedClients[socketId].user.fullName;
    }

    private checkUserConnection(user:User){
        for (const client_id of Object.keys(this.getConnectedClients)) {
            const connectedClient = this.connectedClients[client_id]
            // verificarndo si se esta conectado dos veces al mismo tiempo
            if(connectedClient.user.id === user.id){
                connectedClient.socket.disconnect()
                break;
            }
        }
    }
}
