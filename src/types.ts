import {MouseEventHandler} from "react";
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";

interface AbstractEntity {
  id: string;
  createDate: string;
  updateDate: string;
  name: string;
}

export interface Box extends AbstractEntity {
  assets: Asset[];
  holders: Holder[]
  records: TransferRecord[]
}

export interface Holder  extends AbstractEntity {
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
  observations: string
}

export interface SelectOption {
  key: string
  text: string
  value: string | boolean
}

export type Entity = TransferRecord | Holder;

type EntityStore<T> = Record<string, T>;

export interface Store {
  assets: EntityStore<Asset>,
  holders: EntityStore<Holder>,
  records: TransferRecord[]
}

export type SemanticColors = | SemanticCOLORS
  | 'facebook'
  | 'google plus'
  | 'vk'
  | 'twitter'
  | 'linkedin'
  | 'instagram'
  | 'youtube'

export interface User {
  id: string,
  name: string,
  photoUrl: string,
  email: string
}
