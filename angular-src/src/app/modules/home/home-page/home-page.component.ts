import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  ngOnInit(): void {
  }

  createRoom() {
    const num = Math.random().toString(36).substr(2, 9);
    this._router.navigateByUrl('/room/' + num);
  }

}
