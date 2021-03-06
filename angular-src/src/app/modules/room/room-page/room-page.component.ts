import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SocketService} from "../../../shared/services/socket-service/socket.service";
import {ActivatedRoute} from "@angular/router";
import {Subscriber} from "rxjs";
import {TaskQueuePanelComponent} from '../components/task-queue-panel/task-queue-panel.component';
import {ActionType} from "../../../shared/services/types/action-type";
import {ActionEvent} from "../../../shared/services/types/action-event";
import {IUser, TableSide, User} from "../../../shared/types/user";

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

  public newUsers = new Map<string, IUser>();

  public cardOptions: Array<string> = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "?"];
  public users = new Map();

  public user = {username: "nickname", selected: "XXL"};

  public hidden: boolean = true;

  public socketSubscriptions = new Subscriber();

  private _socketServices: SocketService;

  public TableSide = TableSide;

  constructor(private route: ActivatedRoute, socketServices: SocketService) {
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
    this.newUsers.set('self', new User('self', 'self', this.getLowestCountSide()));

    this.socketSubscriptions.add(this._socketServices.getJoinRoom().subscribe((data: any) => {
      this.users.set(data.socketId, {username: data.username});
      this.newUsers.set(data.socketId, new User(data.socketId, data.username, this.getLowestCountSide()));
    }));

    this.socketSubscriptions.add(this._socketServices.getLeaveRoom().subscribe((data: any) => {
      if (this.users.has(data.socketId)) {
        this.users.delete(data.socketId);
      }
      if (this.newUsers.has(data.socketId)) {
        this.newUsers.delete(data.socketId);
      }
    }));

    this.socketSubscriptions.add(this._socketServices.getRoomData().subscribe((data: any) => {
      data.clients.forEach((client: any) => {
        this.users.set(client.socketId, {username: client.username, selected: client.selected});
        const newUser: User = new User(client.socketId, client.username, this.getLowestCountSide());
        newUser.selected = client.selected;
        this.newUsers.set(client.socketId, new User(client.socketId, client.username, this.getLowestCountSide()));
      });
    }));

    this.eventActions();
  }

  public getUsersBySide(side: TableSide): IUser[]{
    let users:IUser[] = [] as IUser[];
    this.newUsers.forEach(user => {
      if (user.side === side){
        users.push(user);
      }
    });
    return users;
  }

  public getLowestCountSide(): TableSide{
    const upCount = {side: TableSide.Up, amount: 0};
    const downCount = {side: TableSide.Down, amount: 0};
    const leftCount = {side: TableSide.Left, amount: 0};
    const rightCount = {side: TableSide.Right, amount: 0};
    this.newUsers.forEach((user) => {
      switch (user.side){
        case TableSide.Up:
          upCount.amount++;
          break;
        case TableSide.Down:
          downCount.amount++;
          break;
        case TableSide.Left:
          leftCount.amount++;
          break;
        case TableSide.Right:
          rightCount.amount++;
          break;
      }
    });

    let firstLowestSide = upCount;
    const sides = [upCount, downCount, leftCount, rightCount];
    sides.forEach((side) => {
      if (firstLowestSide.amount > side.amount){
        firstLowestSide = side;
      }
    });
    return firstLowestSide.side;
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
