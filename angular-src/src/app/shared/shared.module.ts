import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from "./components/header/header.component";
import {AccountService} from "./services/account-service/account.service";
import {SocketService} from "./services/socket-service/socket.service";

const imports = [RouterModule];

const declarations = [HeaderComponent];

@NgModule({
  imports: [...imports],
  declarations: [...declarations],
  providers: [
    SocketService,
    AccountService
  ],
  exports: [
    ...imports,
    ...declarations
  ]
})
export class SharedModule {
}
