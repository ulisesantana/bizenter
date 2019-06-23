import {Store, TransferRecord} from "../types";
import {exec, mapToID, sortByDateDesc, sortByName} from "../utils";

export function sortStore({assets, holders, records}: Store): Store {
  return {
    assets: exec(Object.values(assets), sortByName, mapToID),
    holders: exec(Object.values(holders), sortByName, mapToID),
    records: sortByDateDesc(records) as TransferRecord[]
  }
}
