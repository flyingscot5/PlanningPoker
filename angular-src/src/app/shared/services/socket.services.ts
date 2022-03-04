import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SocketServices {
  private roomId: any;

  public constructor(private socket: Socket) {
  }

  public getNewClient(): any {
    return this.socket.fromEvent('newClient').pipe(
      map(data => {
        console.log('received newClient', data);
        return data;
      })
    );
  }

  public sendJoinRoom(roomId: any): void {
    console.log(`Joining room: ${roomId}`);
    this.roomId = roomId;
    this.socket.emit('joinRoom', {roomId});
  }

  public getJoinRoom(): any {
    return this.socket.fromEvent('joinRoom').pipe(
      map(data => {
        console.log('received joinRoom', data);
        return data;
      })
    );
  }

  public sendLeaveRoom(roomId: any): void {
    console.log(`Leaving room: ${roomId}`);
    this.socket.emit('leaveRoom', {roomId});
  }

  public getLeaveRoom(): any {
    return this.socket.fromEvent('leaveRoom').pipe(
      map(data => {
        console.log('received leaveRoom', data);
        return data;
      })
    );
  }

  public sendData(data: any): void {
    console.log('sending Data', {data});
    this.socket.emit('data', {roomId: this.roomId, data});
  }

  public getData(): any {
    return this.socket.fromEvent('data').pipe(
      map(data => {
        console.log('received Data', data);
        return data;
      })
    );
  }
}
