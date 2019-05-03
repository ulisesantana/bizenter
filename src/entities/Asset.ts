import {IAsset} from "../types";

export class Asset implements IAsset {
  id: string;
  createDate: string;
  updateDate: string;
  name: string;
  notes: string;
  blocked: boolean;
  serial: string;
  assignedTo: string | null;

  constructor({id, name, createDate, notes, updateDate, assignedTo, blocked, serial}: IAsset) {
    this.id = id;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.name = name;
    this.notes = notes;
    this.blocked = blocked;
    this.serial = serial;
    this.assignedTo = assignedTo;
  }
}
