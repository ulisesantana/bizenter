import {Asset, Holder, TransferRecord} from "./types";
import uuid4 from 'uuid/v4';

export function generateAsset(asset: Partial<Asset>): Asset{
  return {
    id: uuid4(),
    createDate: (new Date()).toISOString(),
    name: '',
    notes: '',
    blocked: false,
    serial: '',
    assignedTo: false,
    ...asset,
    updateDate: (new Date()).toISOString(),
  }
}

export function generateHolder(holder: Partial<Holder>): Holder{
  return {
    id: uuid4(),
    createDate: (new Date()).toISOString(),
    name: '',
    notes: '',
    blocked: false,
    ...holder,
    updateDate: (new Date()).toISOString(),
  }
}

export function generateRecord(
  fromHolderId: string,
  toHolderId: string,
  assetId: string,
  observations: string = ''
): TransferRecord {
  return {
    id: uuid4(),
    date: (new Date()).toISOString(),
    from: fromHolderId,
    to: toHolderId,
    asset: assetId,
    observations
  }
}
