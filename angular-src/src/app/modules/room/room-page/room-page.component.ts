import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {SocketServices} from "../../../shared/services/socket.services";
import {ActivatedRoute} from "@angular/router";
import {Subscriber} from "rxjs";

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {

  public roomId: string | null= "";

  public options: Array<string> = [];

  public socketSubscriptions = new Subscriber();

  private socketServices: SocketServices;

  constructor(private route: ActivatedRoute, socketServices: SocketServices) {
    this.socketServices = socketServices;
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this.socketServices.sendLeaveRoom(this.roomId);

    this.socketSubscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('RoomId');
    });

    this.socketServices.sendJoinRoom(this.roomId);
  }



}
