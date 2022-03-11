import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Output() removeTaskEvent: EventEmitter<any> = new EventEmitter();
  @Input() public Task: any;
  @Input() public Index: any;

  ngOnInit(): void {
  }

  public removeTask() {
    this.removeTaskEvent.emit(this.Index);
  }

}
