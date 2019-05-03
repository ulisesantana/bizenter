import {BizenterDB, db} from "../db";
import {IHolder} from "../types";
import { generateUUIDv4 } from "@bitjourney/uuid-v4";
import {Holder} from "../entities";
import {Service} from "./Service";

class HolderServiceImpl extends Service<IHolder> {
  constructor(db: BizenterDB) {
    super(db, db.holders)
  }

  create(holder: Pick<IHolder, 'name' | 'notes'>) {
    const id = generateUUIDv4();
    return this.entity.add(
      new Holder({
        ...holder,
        id,
        createDate: (new Date()).toISOString(),
        updateDate: (new Date()).toISOString()
      }),
      id
    )
  }

  async update(id: string, asset: Partial<IHolder>) {
    asset.updateDate = (new Date()).toISOString();
    const hasBeenUpdated = await this.entity.update(id, asset);
    return Boolean(hasBeenUpdated);
  }

}

export const HolderService = new HolderServiceImpl(db);