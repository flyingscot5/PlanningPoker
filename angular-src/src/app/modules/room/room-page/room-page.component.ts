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

  public user = {nickname: "nickname", selected: "XXL"}

  public hidden: boolean = true;

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

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('RoomId');
    });

    this.socketServices.sendJoinRoom(this.roomId);

    this.socketSubscriptions.add(this.socketServices.getNewClient().subscribe((data: any) => {
      this.users.set(data.socketId, {nickname: "nickname"});
    }));

    this.eventActions();
  }

  public submitOption(cardOption: string) {
    this.socketServices.sendAction({type: ActionType.SelectOption, data: cardOption});
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
          break;
          // this.users.set(action.from, {selected: action.action});
        }
        default:
          break;
      }
    }));
  }
}
