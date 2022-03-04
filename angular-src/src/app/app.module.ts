import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {SharedModule} from "./shared/shared.module";
import {HomeModule} from "./modules/home/home.module";

const config: SocketIoConfig = {url: 'https://light-bot.net:8080/'};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
