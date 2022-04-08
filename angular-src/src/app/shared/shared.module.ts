import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from "./components/header/header.component";
import {GuestAccountService} from "./services/account-service/guest-account.service";
import {SocketService} from "./services/socket-service/socket.service";
import {AccountModule} from "./components/account/account.module";

const imports = [RouterModule, AccountModule];

const declarations = [HeaderComponent];

@NgModule({
  imports: [...imports],
  declarations: [...declarations],
  providers: [
    SocketService,
    GuestAccountService
  ],
  exports: [
    ...imports,
    ...declarations
  ]
})
export class SharedModule {
}
