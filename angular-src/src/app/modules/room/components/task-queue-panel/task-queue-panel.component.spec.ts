import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskQueuePanelComponent} from './task-queue-panel.component';

describe('TaskQueuePanelComponent', () => {
  let component: TaskQueuePanelComponent;
  let fixture: ComponentFixture<TaskQueuePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskQueuePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskQueuePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
