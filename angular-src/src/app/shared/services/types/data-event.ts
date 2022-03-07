import {DataAction} from "./data-action";

export interface DataEvent {
  action: DataAction;
  data: any;
}
