import {IHolder} from "../types";

export class Holder implements IHolder {
  id: string;
  createDate: string;
  updateDate: string;
  name: string;
  notes: string;

  constructor({id, name, createDate, notes, updateDate}: IHolder) {
    this.id = id;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.name = name;
    this.notes = notes;
  }
}
