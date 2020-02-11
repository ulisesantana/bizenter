import {Store} from "../types";
import {StoreService} from "../services";
import {NAMESPACE} from "../constants";
import {store} from "./data";
import {sortStore} from "./sortStore";

export function getInitialState(): Store {
  const cache = StoreService.get(NAMESPACE);
  if (!!cache) {
    return cache as Store;
  } else {
    return sortStore(store)
  }
}
