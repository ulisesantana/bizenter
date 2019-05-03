import Dexie from 'dexie';
import {IAsset, IRecord, IHolder} from "./types";

export class BizenterDB extends Dexie {
  assets: Dexie.Table<IAsset, string>;
  holders: Dexie.Table<IHolder, string>;
  records: Dexie.Table<IRecord, string>;

  constructor () {
    super("BizenterDB");
    this.version(1).stores({
      assets: '&id, createDate, updateDate, name, notes, blocked, assignedTo',
      holders: '&id, createDate, updateDate, name, notes',
      records: '&id, date, from, to, asset'
    });

    this.assets = this.table('assets');
    this.holders = this.table('holders');
    this.records = this.table('records');
  }
}

export const db = new BizenterDB();
export default db;