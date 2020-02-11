import {Store, TransferRecord} from "../types";
import {pipe, mapToID, sortByDateDesc, sortByName} from "../utils";

const sortByNameAndMapToID = pipe(sortByName, mapToID);

export function sortStore({assets, holders, records}: Store): Store {
  return {
    assets: sortByNameAndMapToID(Object.values(assets)),
    holders: sortByNameAndMapToID(Object.values(holders)),
    records: sortByDateDesc(records) as TransferRecord[]
  }
}
