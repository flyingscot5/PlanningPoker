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
    console.log(this.taskCards);
  }

  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public addTask() {
    this.taskCards.push({title: 'job 3 title', description: 'job 3 description'},);
  }
}
