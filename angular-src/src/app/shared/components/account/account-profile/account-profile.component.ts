import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  @Input() public User: any;

  constructor() { }

  ngOnInit(): void {
  }

}
