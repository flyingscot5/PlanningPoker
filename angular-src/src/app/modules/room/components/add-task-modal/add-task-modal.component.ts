import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  @Output() addTaskEvent: EventEmitter<any> = new EventEmitter();

  public taskForm: FormGroup;

  constructor() {
    this.taskForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  public addTask() {
    this.addTaskEvent.emit(this.taskForm.getRawValue());
  }
}
