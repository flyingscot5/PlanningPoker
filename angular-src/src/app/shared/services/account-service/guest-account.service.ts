import { Injectable } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GuestAccountService {

  public guestAccount: any;
  private roomId: any;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('RoomId');
    });

    // @ts-ignore
    this.guestAccount = JSON.parse(localStorage.getItem('guestAccount'));
  }

  setGuestAccount(key: string, value: any) {
    this.guestAccount[this.roomId][key] = value;
    localStorage.setItem('guestAccount', JSON.stringify(this.guestAccount));
  }

  getGuestAccount(key: string) {
    if (this.guestAccount.hasOwnProperty(this.roomId))
      return this.guestAccount[this.roomId][key];
    return null;
  }
}
