import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomPageComponent} from './room-page/room-page.component';


@NgModule({
  declarations: [
    RoomPageComponent
  ],
  exports: [
    RoomPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RoomModule { }
