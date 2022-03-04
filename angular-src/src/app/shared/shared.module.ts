import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SocketServices} from './services/socket.services';

const imports = [RouterModule];


@NgModule({
  imports: [...imports],
  declarations: [],
  providers: [SocketServices],
  exports: [...imports]
})
export class SharedModule {
}
