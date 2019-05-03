import {BizenterDB, db} from "../db";
import {IAsset} from "../types";
import { generateUUIDv4 } from "@bitjourney/uuid-v4";
import {Asset} from "../entities";
import {Service, RecordService} from "./";

class AssetServiceImpl extends Service<IAsset> {
  constructor(db: BizenterDB) {
    super(db, db.assets)
  }

  async create(asset: Pick<IAsset, 'name' | 'serial' | 'notes'>) {
    const id = generateUUIDv4();
    const newAsset = await this.entity.add(
      new Asset({
        ...asset,
        id,
        assignedTo: null,
        createDate: (new Date()).toISOString(),
        updateDate: (new Date()).toISOString(),
        blocked: false
      }),
      id
    );

    await RecordService.create({
      from: null,
      to: null,
      asset: newAsset
    });

    return newAsset;
  }

  async update(id: string, asset: Partial<IAsset>) {
    asset.updateDate = (new Date()).toISOString();
    const oldAsset = await this.getOne(id);
    const hasBeenUpdated = await this.entity.update(id, asset);

    if(
      hasBeenUpdated
      && asset.assignedTo !== undefined
      && !!oldAsset
      && oldAsset.assignedTo !== asset.assignedTo
    ) {
        await RecordService.create({
          from: oldAsset.assignedTo,
          to: asset.assignedTo,
          asset: id
        });
    }

    return Boolean(hasBeenUpdated);
  }

}

export const AssetService = new AssetServiceImpl(db);