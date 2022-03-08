import {ActionType} from "./action-type";

export interface Action {
  type: ActionType;
  data: any;
}

export interface ActionEvent {
  roomId: string;
  from: string;
  action: Action;
}
