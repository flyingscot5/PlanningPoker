import {Injectable} from '@angular/core';
import {ActionEvent} from "./types/action-event";
import {ActionType} from "./types/action-type";
import {SocketServices} from "./socket.services";

@Injectable({
  providedIn: 'root'
})
export class ActionEventService {
  private _socketServices: SocketServices;

  constructor(socketServices: SocketServices) {
    this._socketServices = socketServices;
  }

  private eventActions() {
    return this._socketServices.getAction().subscribe((actionEvent: ActionEvent) => {
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
