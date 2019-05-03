interface IEntity {
  id: string,
  createDate: string,
  updateDate: string,
  name: string,
  notes: string
}

export interface IHolder extends IEntity{}

export interface IAsset extends IEntity{
  blocked: boolean,
  serial: string,
  assignedTo: string | null
}

export interface IRecord {
  id: string,
  date: string,
  from: string | null,
  to: string | null,
  asset: string
}