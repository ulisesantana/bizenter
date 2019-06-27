import {Store, TransferRecord, Holder, Asset} from "../types";
import {Action, Actions} from "./actions";
import {exec} from "../utils";
import {StoreService} from "../services";
import {NAMESPACE} from "../constants";
import uuid from "uuid/v4";
import {generateAsset, generateHolder, generateRecord} from "../entities";
import {sortStore} from "./sortStore";

function reducer(state: Store, {type, payload}: Action): Store {
  switch (type) {
    case Actions.UPSERT_HOLDER:{
      const id = (payload as Holder).id || uuid();
      return {
        ...state,
        holders: {
          ...state.holders,
          [id]: generateHolder({id, ...payload})
        }
      };
    }
    case Actions.UPSERT_ASSET:{
      const id = (payload as Asset).id || uuid();
      if ((payload as TransferRecord).hasOwnProperty('from')) {
        const {from, to: assignedTo} = payload as TransferRecord;
        return {
          ...state,
          records: state.records
            .concat(generateRecord(from as string, assignedTo as string, id)),
          assets: {
            ...state.assets,
            [id]: generateAsset({id, assignedTo, ...payload})
          }
        };
      } else {
        return {
          ...state,
          assets: {
            ...state.assets,
            [id]: generateAsset({id, ...payload})
          }
        };
      }

    }
    case Actions.REPLACE_ALL: {
      return payload as Store;
    }
    case Actions.UPDATE_ALL: {
      return {
        ...state,
        ...payload as Store
      };
    }
    case Actions.DELETE_ALL: {
      StoreService.remove(NAMESPACE);
      return {
        assets: {},
        holders: {},
        records: []
      } as Store;
    }
    default:
      return state
  }
}

const cache = (x: Store) => {
  StoreService.set(NAMESPACE, x);
  return x;
};

export function rootReducer(state: Store, action: Action): Store {
  return exec(
    reducer(state, action),
    sortStore,
    cache
  );
}
