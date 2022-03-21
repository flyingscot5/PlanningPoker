import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskCardComponent} from '../task-card/task-card.component';
import {ActionType} from "../../../../shared/services/types/action-type";
import {SocketServices} from "../../../../shared/services/socket.services";

@Component({
  selector: 'app-task-queue-panel',
  templateUrl: './task-queue-panel.component.html',
  styleUrls: ['./task-queue-panel.component.scss']
})
export class TaskQueuePanelComponent implements OnInit {

  @Output() addTaskCardEvent: EventEmitter<any> = new EventEmitter();
  @Output() removeTaskCardEvent: EventEmitter<any> = new EventEmitter();
  @Input() public TaskCards: any;

  public navbarOpen = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public addTask(task: any) {
    this.addTaskCardEvent.emit(task);
  }

  public removeTask(taskIndex: any) {
    this.removeTaskCardEvent.emit(taskIndex);
  }
}
