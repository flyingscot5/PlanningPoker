import {Action, ActionEvent} from "../services/types/action-event";

export class ActionEventMapper {
  public static mapEvent(actionEvent: any): ActionEvent {
    return {
     roomId: actionEvent.roomId,
      from: actionEvent.from,
      action: this.mapAction(actionEvent.action)
    };
  }

  public static mapAction(action: any): Action {
    return {
      type: action.type,
      data: action.data
    };
  }
}
