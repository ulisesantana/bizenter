import {BizenterDB, db} from "../db";
import {IRecord} from "../types";
import { generateUUIDv4 } from "@bitjourney/uuid-v4";
import {Record} from "../entities";
import {Service} from "./Service";

class RecordServiceImpl extends Service<IRecord> {
  constructor(db: BizenterDB) {
    super(db, db.records)
  }

  create(record: Pick<IRecord, 'from' | 'to' | 'asset'>) {
    const id = generateUUIDv4();
    return this.entity.add(
      new Record({
        ...record,
        id,
        date: (new Date()).toISOString(),
      }),
      id
    )
  }

}

export const RecordService = new RecordServiceImpl(db);