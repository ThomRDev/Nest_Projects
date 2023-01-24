import { Manager, Socket } from "socket.io-client"

// hacemos esto para que se mantega el headers
let socket: Socket;

const addListeners = () => {
    const clientsUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    const serverStatusLabel = document.querySelector('#server-status')!;

    socket.on('connect', () => {
        serverStatusLabel!.innerHTML = 'connected';
    });

    socket.on('disconnect', () => {
        serverStatusLabel!.innerHTML = 'disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        // console.log(clients)
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${ clientId }</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if( messageInput.value.trim().length <= 0 ) return;
        
        socket.emit('message-from-client',{
            message : messageInput.value.trim()
        })
        
        messageInput.value = '';
    });

    socket.on('message-from-server', ( payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${ payload.fullName }</strong>
                <span>${ payload.message }</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );
    })
}


// verificar que la version socket.io del cliente sea igual al de servidor 
export const connectToServer = (token: string) => {

    // como esta variable es externa, borramos los sockets que aun estan conectados
    socket?.removeAllListeners();

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
        extraHeaders :{
            hola:'mundo',
            authentication:token
        },
        // query:{}
    })

    socket = manager.socket('/');
    // const socket = manager.socket('/')
    addListeners()
}

