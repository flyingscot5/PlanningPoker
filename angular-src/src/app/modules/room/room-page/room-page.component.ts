import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketServices} from "../../../shared/services/socket.services";
import {ActivatedRoute} from "@angular/router";
import {Subscriber} from "rxjs";
import {TaskQueuePanelComponent} from '../components/task-queue-panel/task-queue-panel.component';
import {ActionType} from "../../../shared/services/types/action-type";
import {ActionEvent} from "../../../shared/services/types/action-event";

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {

  @ViewChild(TaskQueuePanelComponent) TaskQueuePanelComponent: any;

  public roomId: string | null = "";

  public cardOptions: Array<string> = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "?"];
  public users = new Map();

  public user = {username: "nickname", selected: "XXL"}

  public hidden: boolean = true;

  public socketSubscriptions = new Subscriber();

  private socketServices: SocketServices;

  constructor(private route: ActivatedRoute, socketServices: SocketServices) {
    this.socketServices = socketServices;
  }

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this.socketSubscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('RoomId');
    });

    this.socketServices.sendJoinRoom(this.roomId, {username: "nickname"});

    this.socketSubscriptions.add(this.socketServices.getJoinRoom().subscribe((data: any) => {
      this.users.set(data.socketId, {username: data.username});
    }));

    this.socketSubscriptions.add(this.socketServices.getLeaveRoom().subscribe((data: any) => {
      if (this.users.has(data.socketId)) {
        this.users.delete(data.socketId);
      }
    }));

    this.socketSubscriptions.add(this.socketServices.getRoomData().subscribe((data: any) => {
      data.clients.forEach((socketId: any) => {
        this.users.set(socketId, {username: "nickname", selected: "XXL"});
      });
    }));

    this.eventActions();
  }

  public getUsers() {
    return [...this.users.values()];
  }

  public submitOption(cardOption: string) {
    this.socketServices.sendAction({type: ActionType.SelectOption, data: {selected :cardOption}});
  }

  public toggleTaskPanel() {
    this.TaskQueuePanelComponent.toggleNavbar();
  }

  public revealCards() {
    this.hidden = !this.hidden;
    this.socketServices.sendAction({type: ActionType.RevealCards, data: this.hidden});
  }

  private eventActions() {
    this.socketSubscriptions.add(this.socketServices.getAction().subscribe((actionEvent: ActionEvent) => {
      switch (actionEvent.action.type) {
        case ActionType.RevealCards: {
          this.hidden = actionEvent.action.data;
          break;
        }
        case ActionType.SelectOption: {
          let userData = this.users.get(actionEvent.from);
          userData.selected = actionEvent.action.data.selected;
          this.users.set(actionEvent.from, userData);
          break;
        }
        default:
          break;
      }
    }));
  }
}
