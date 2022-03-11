import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  @Output() addTaskEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public addTask() {
     this.addTaskEvent.emit({title: 'job 3 title', description: 'job 3 description'});
  }
}
