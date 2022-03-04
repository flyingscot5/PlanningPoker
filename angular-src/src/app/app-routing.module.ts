import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePageComponent} from "./shared/modules/home/home-page/home-page.component";

const routes: Routes = [{path: '', component: HomePageComponent}, {path: 'room/:RoomId'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
