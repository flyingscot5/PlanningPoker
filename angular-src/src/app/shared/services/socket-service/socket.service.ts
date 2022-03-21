import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';
import {Action} from "../types/action-event";
import {ActionEventMapper} from "../../mappers/action-event-mapper";

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private roomId: any;

  public constructor(private socket: Socket) {
  }

  public getRoomData(): any {
    return this.socket.fromEvent('getRoomData').pipe(
      map(data => {
        console.log('received room data', data);
        return data;
      })
    );
  }

  public sendJoinRoom(roomId: any, data: any): void {
    console.log(`Joining room: ${roomId}`);
    this.roomId = roomId;
    this.socket.emit('joinRoom', {roomId: this.roomId, data});
  }

  public getJoinRoom(): any {
    return this.socket.fromEvent('joinRoom').pipe(
      map(data => {
        console.log('received joinRoom', data);
        return data;
      })
    );
  }

  public getLeaveRoom(): any {
    return this.socket.fromEvent('leaveRoom').pipe(
      map(data => {
        console.log('received leaveRoom', data);
        return data;
      })
    );
  }

  public sendAction(action: Action): void {
    console.log('sending Action', {action: action});
    this.socket.emit('action', {roomId: this.roomId, action: action});
  }

  public getAction(): any {
    return this.socket.fromEvent('action').pipe(
      map(actionEvent => {
        console.log('received Action', actionEvent);
        return ActionEventMapper.mapEvent(actionEvent);
      })
    );
  }
}
