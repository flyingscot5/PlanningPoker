import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomPageComponent} from './room-page/room-page.component';
import { CardComponent } from './components/card/card.component';
import {TaskQueuePanelComponent} from './components/task-queue-panel/task-queue-panel.component';
import {UserCardComponent} from './components/user-card/user-card.component';
import { TaskCardComponent } from './components/task-card/task-card.component';


@NgModule({
  declarations: [
    RoomPageComponent,
    CardComponent,
    TaskQueuePanelComponent,
    UserCardComponent,
    TaskCardComponent
  ],
  exports: [
    RoomPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RoomModule { }
