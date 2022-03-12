import {Component, OnInit} from '@angular/core';
import {TaskCardComponent} from '../task-card/task-card.component';
import {ActionType} from "../../../../shared/services/types/action-type";
import {SocketServices} from "../../../../shared/services/socket.services";

@Component({
  selector: 'app-task-queue-panel',
  templateUrl: './task-queue-panel.component.html',
  styleUrls: ['./task-queue-panel.component.scss']
})
export class TaskQueuePanelComponent implements OnInit {

  public navbarOpen = false;
  public taskCards: any[] = [{title: 'job 1 title', description: 'job 1 description'}, {
    title: 'job 2 title',
    description: 'job 2 description'
  }];

  private _socketServices: SocketServices;

  constructor(socketServices: SocketServices) {
    this._socketServices = socketServices;
  }

  ngOnInit(): void {
  }

  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
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
