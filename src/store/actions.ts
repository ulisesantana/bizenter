import {Asset, Store} from "../types";

export enum Actions {
  UPSERT_ASSET = 'UPSERT_ASSET',
  UPSERT_HOLDER = 'UPSERT_HOLDER',
  UPDATE_ALL = 'UPDATE_ALL',
  REPLACE_ALL = 'REPLACE_ALL',
  DELETE_ALL = 'DELETE_ALL'
}

export interface TransferPayload extends Asset{
  from: string
  to: string
}

export type Payload =
  Partial<TransferPayload> |
  Store

export interface Action {
  type: Actions,
  payload?: Payload
}
