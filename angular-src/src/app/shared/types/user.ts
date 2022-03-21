export interface IUser{
  id: string;
  username: string;
  side: TableSide;
  selected: any;
}

export class User implements IUser{
  public id: string;
  public username: string;
  public side: TableSide = TableSide.Unknown;
  public selected: any;
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}

export enum TableSide{
  Unknown = 0,
  Up = 1,
  Down = 2,
  Left= 3,
  Right = 4
}
