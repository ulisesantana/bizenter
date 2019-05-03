import {IRecord} from "../types";

export class Record implements IRecord {
  id: string;
  date: string;
  from: string | null;
  to: string | null;
  asset: string;

  constructor({id, date, from, to, asset}: IRecord) {
    this.id = id;
    this.date = date;
    this.from = from;
    this.to = to;
    this.asset = asset;
  }
}
