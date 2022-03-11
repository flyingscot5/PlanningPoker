import { Component, OnInit } from '@angular/core';
import {TaskCardComponent} from '../task-card/task-card.component';

@Component({
  selector: 'app-task-queue-panel',
  templateUrl: './task-queue-panel.component.html',
  styleUrls: ['./task-queue-panel.component.scss']
})
export class TaskQueuePanelComponent implements OnInit {
  navbarOpen = false;
  taskCards: any[] = [{title: 'job 1 title', description: 'job 1 description'}, {title: 'job 2 title', description: 'job 2 description'}];
  constructor() { }

  ngOnInit(): void {
  }

  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public addTask(task: any) {
    this.taskCards.push(task);
  }

  public removeTask(taskIndex: any) {
    this.taskCards.splice(taskIndex, 1);
  }
}
