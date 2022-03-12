import {Injectable} from '@angular/core';
import {ActionEvent} from "./types/action-event";
import {ActionType} from "./types/action-type";
import {SocketServices} from "./socket.services";
import {TaskQueuePanelComponent} from "../../modules/room/components/task-queue-panel/task-queue-panel.component";

@Injectable({
  providedIn: 'root'
})
export class ActionEventServiceService {
  private _socketServices: SocketServices;

  constructor(socketServices: SocketServices) {
    this._socketServices = socketServices;
    this.eventActions();
  }

  private eventActions() {
    this._socketServices.getAction().subscribe((actionEvent: ActionEvent) => {
      switch (actionEvent.action.type) {
        case ActionType.RevealCards: {
          break;
        }
        case ActionType.SelectOption: {
          break;
        }
        case ActionType.AddTask: {
          // TaskQueuePanelComponent.addTask(actionEvent.action.data.task);
          break;
        }
        case ActionType.RemoveTask: {
          // TaskQueuePanelComponent.removeTask(actionEvent.action.data.Index);
          break;
        }
        default:
          break;
      }
    });
  }
}
