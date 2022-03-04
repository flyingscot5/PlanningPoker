import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-queue-panel',
  templateUrl: './task-queue-panel.component.html',
  styleUrls: ['./task-queue-panel.component.scss']
})
export class TaskQueuePanelComponent implements OnInit {
  navbarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
