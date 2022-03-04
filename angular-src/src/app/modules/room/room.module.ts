import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomPageComponent} from './room-page/room-page.component';
import { CardComponent } from './components/card/card.component';
import { UserCardComponent } from './components/user-card/user-card.component';


@NgModule({
  declarations: [
    RoomPageComponent,
    CardComponent,
    UserCardComponent
  ],
  exports: [
    RoomPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RoomModule { }
