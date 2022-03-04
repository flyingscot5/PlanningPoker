import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePageComponent} from "./modules/home/home-page/home-page.component";
import {RoomPageComponent} from "./modules/room/room-page/room-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'room/:RoomId', component: RoomPageComponent},
  {path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
