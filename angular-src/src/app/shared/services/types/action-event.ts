import {ActionType} from "./action-type";

export interface ActionEvent {
  action: ActionType;
  data: any;
}
