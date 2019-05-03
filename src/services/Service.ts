import {BizenterDB,} from "../db";
import Dexie from 'dexie';
import {IAsset, IHolder, IRecord} from "../types";

export class Service<T extends IAsset | IHolder | IRecord> {
  constructor(readonly db: BizenterDB, readonly entity: Dexie.Table<T, string>) {
    this.db = db;
    this.entity = entity;
  }

  async create(resource: any) {
    return await this.entity.add(
      resource,
      resource.id
    )
  }

  async delete(id: string) {
    return await this.entity.delete(id);
  }

  async getAll() {
    return await this.entity.toArray();
  }

  async getMany(ids: string[]) {
    return await this.entity
      .where('id')
      .anyOf(ids)
      .toArray();
  }

  async getOne(id: string) {
    return await this.entity.get(id);
  }

  async update(id: string, asset: Partial<T>) {
    const hasBeenUpdated = await this.entity.update(id, asset);
    return Boolean(hasBeenUpdated);
  }

}
