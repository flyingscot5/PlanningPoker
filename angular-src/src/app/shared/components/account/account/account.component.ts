import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'account', templateUrl: './account.component.html', styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user: any = {username: "username"};

  constructor() {
  }

  ngOnInit(): void {
  }

}
