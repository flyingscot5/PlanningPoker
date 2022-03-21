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

  public taskCards: any[] = [{title: 'job 1 title', description: 'job 1 description'}, {
    title: 'job 2 title',
    description: 'job 2 description'
  }];

  public cardOptions: Array<string> = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "?"];
  public users = new Map();

  public upSide: any[] = [];
  public downSide: any[] = [];
  public leftSide: any[] = [];
  public rightSide: any[] = [];
  public sides: any[] = [this.upSide, this.downSide, this.leftSide, this.rightSide];


  public user = {username: "nickname", selected: "XXL"}

  public hidden: boolean = true;

  public socketSubscriptions = new Subscriber();

  private _socketServices: SocketServices;

  constructor(private route: ActivatedRoute, socketServices: SocketServices) {
    this._socketServices = socketServices;
  }

  public ngOnDestroy(): void {
    this.socketSubscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('RoomId');
    });

    this._socketServices.sendJoinRoom(this.roomId, {username: "nickname"});
    this.users.set("self", {username: "self"});

    this.socketSubscriptions.add(this._socketServices.getJoinRoom().subscribe((data: any) => {
      this.users.set(data.socketId, {username: data.username});
      this.addUserToTable({id: data.socketId, user: {username: data.username}});
    }));

    this.socketSubscriptions.add(this._socketServices.getLeaveRoom().subscribe((data: any) => {
      if (this.users.has(data.socketId)) {
        this.users.delete(data.socketId);
        this.removeUserFromTable(data.socketId);
      }
    }));

    this.socketSubscriptions.add(this._socketServices.getRoomData().subscribe((data: any) => {
      data.clients.forEach((client: any) => {
        this.users.set(client.socketId, {username: client.username, selected: client.selected});
      });
      this.sortUsersToSides();
    }));

    this.sortUsersToSides();
    console.log(this.upSide);
    console.log(this.downSide);

    this.eventActions();
  }
  // todo: Convert each side to have a map of users instead of an array and it'll be so much easier
  public sortUsersToSides(){
    this.upSide = [];
    this.downSide = [];
    this.leftSide = [];
    this.rightSide = [];

    let sides: any[] = [this.upSide, this.downSide, this.leftSide, this.rightSide];

    this.users.forEach((user, id) => {
      this.getLowestCountSide(sides).push({id, user});
    });
  }
  public addUserToTable(user: any){
    let sides: any[] = [this.upSide, this.downSide, this.leftSide, this.rightSide];
    this.getLowestCountSide(sides).push(user);
  }
  public removeUserFromTable(socketId: string){
    let sides: any[] = [this.upSide, this.downSide, this.leftSide, this.rightSide];
    sides.forEach((side) => {
      side.forEach((user: any) => {
        if (user.id === socketId){
          side.pop(user);
        }
      });
    });
  }

  public getLowestCountSide(sides: any[]): any{
    let firstLowestSide: any = this.upSide;
    sides.forEach((side) => {
      if (firstLowestSide.length > side.length){
        firstLowestSide = side;
      }
    });
    return firstLowestSide;
  }



  public getUsers() {
    return [...this.users.values()];
  }

  public submitOption(cardOption: string){
    this._socketServices.sendAction({type: ActionType.SelectOption, data: {selected :cardOption}});
    let userData = this.users.get("self");
    userData.selected = cardOption;
    this.users.set("self", userData);
  }

  public toggleTaskPanel() {
    this.TaskQueuePanelComponent.toggleNavbar();
  }

  public revealCards() {
    this.hidden = !this.hidden;
    this._socketServices.sendAction({type: ActionType.RevealCards, data: this.hidden});
  }

  private eventActions() {
    this.socketSubscriptions.add(this._socketServices.getAction().subscribe((actionEvent: ActionEvent) => {
      switch (actionEvent.action.type) {
        case ActionType.RevealCards: {
          this.hidden = actionEvent.action.data;
          break;
        }
        case ActionType.SelectOption: {
          let userData = this.users.get(actionEvent.from);
          userData.selected = actionEvent.action.data.selected;
          break;
        }
        case ActionType.AddTask: {
          this.taskCards.push(actionEvent.action.data.task);
          break;
        }
        case ActionType.RemoveTask: {
          this.taskCards.splice(actionEvent.action.data.taskIndex, 1);
          break;
        }
      }
    }));
  }

  public addTask(task: any) {
    this.taskCards.push(task);
    this._socketServices.sendAction({type: ActionType.AddTask, data: {task: task}});
  }

  public removeTask(taskIndex: any) {
    this.taskCards.splice(taskIndex, 1);
    this._socketServices.sendAction({type: ActionType.RemoveTask, data: {taskIndex: taskIndex}});
  }
}
