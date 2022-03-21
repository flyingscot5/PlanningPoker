import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
