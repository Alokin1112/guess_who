import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MSG } from '../type';
@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket!: Socket;
  constructor() {}
  connect(gameId: string) {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('joinGame', { gameId: gameId });
  }
  receiveJoinedPlayers() {
    return new Observable((observer) => {
      this.socket.on('joinGame', (message: string) => {
        observer.next(message);
      });
    });
  }

  sendMessage(gameId: string, message: MSG) {
    this.socket.emit('sendMessage', { gameId: gameId, message: message });
  }
  receiveMessage() {
    return new Observable((observer) => {
      this.socket.on('sendMessage', (message: MSG) => {
        observer.next(message);
      });
    });
  }
  sendAnswer(gameId: string, message: MSG) {
    this.socket.emit('sendAnswer', { gameId: gameId, message: message });
  }
  receiveAnswer() {
    return new Observable((observer) => {
      this.socket.on('sendAnswer', (message: MSG) => {
        observer.next(message);
      });
    });
  }
}
