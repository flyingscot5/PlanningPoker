import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {SharedModule} from "./shared/shared.module";
import {HomeModule} from "./modules/home/home.module";
import {RoomModule} from "./modules/room/room.module";

const config: SocketIoConfig = {url: 'http://localhost:8080/'};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    RoomModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
