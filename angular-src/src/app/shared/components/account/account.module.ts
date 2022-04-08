import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountProfileComponent} from './account-profile/account-profile.component';
import {AccountComponent} from "./account/account.component";


const declarations = [AccountComponent, AccountProfileComponent];

@NgModule({
  declarations: [...declarations],
  exports: [...declarations],
  imports: [
    CommonModule
  ]
})

export class AccountModule {
}
