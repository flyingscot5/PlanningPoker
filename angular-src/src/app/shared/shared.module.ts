import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SocketServices} from './services/socket.services';
import {HeaderComponent} from "./components/header/header.component";

const imports = [RouterModule];

const declarations = [HeaderComponent];

@NgModule({
  imports: [...imports],
  declarations: [...declarations],
  providers: [SocketServices],
  exports: [
    ...imports,
    ...declarations
  ]
})
export class SharedModule {
}
