import {ActionEvent} from "../services/types/action-event";

export class ActionEventMapper {
  public static mapAction(response: any): ActionEvent {
    return {
      action: response.action,
      data: response.data
    };
  }
}
