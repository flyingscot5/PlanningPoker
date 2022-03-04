import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() public User: any;

  constructor() { }

  ngOnInit(): void {
  }

}
