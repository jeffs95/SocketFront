import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  onEvent(eventName: string): Observable<any> {
    const subject = new Subject<any>();
    this.socket.on(eventName, (data: any) => {
      console.log(`Evento recibido: ${eventName}`, data);
      subject.next(data);
    });
    return subject.asObservable();
  }
}