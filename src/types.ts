import {MouseEventHandler} from "react";

export interface Holder {
  id: string;
  createDate: string;
  updateDate: string;
  name: string;
  notes: string;
  blocked: boolean;
}

export interface Asset extends Holder {
  serial: string;
  assignedTo: string | boolean;
}

export interface Button {
  onClick: MouseEventHandler
}

export interface TransferRecord {
  id: string;
  date: string;
  from: string | boolean;
  to: string | boolean;
  asset: string;
}

export interface SelectOption {
  key: string
  text: string
  value: string | boolean
}

export type OnChangeFormFieldHandler<E,D> =
  (event: E, data: D) => void

export type Entity = TransferRecord | Holder;

type EntityStore<T> = Record<string, T>;

export interface Store {
  assets: EntityStore<Asset>,
  holders: EntityStore<Holder>,
  records: TransferRecord[]
}
