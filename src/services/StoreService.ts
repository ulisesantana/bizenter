export const StoreService = Object.freeze({
  get(itemName: string) {
    const item = localStorage.getItem(itemName);
    const numPatt = new RegExp(/^\d+$/);
    const jsonPatt = new RegExp(/[[{].*[}\]]/);

    if(item){
      if(jsonPatt.test(item)){
        return JSON.parse(item);
      }
      else if(numPatt.test(item)) {
        return parseFloat(item);
      }
      else {
        return item;
      }
    }
    else {
      return undefined;
    }

  },

  set(itemName: string, item: object | string | number | any[]) {
    if(typeof item === "object"){
      localStorage.setItem(itemName, JSON.stringify(item));
    } else {
      localStorage.setItem(itemName, item.toString());
    }
  },

  remove(itemName: string) {
    localStorage.removeItem(itemName);
  }
});