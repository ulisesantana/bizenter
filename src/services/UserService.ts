import {DB} from "./Firebase";
import {User} from "../types";
import {Collection} from "../constants";

export const UserService = (() => {
  const db = DB.collection(Collection.USERS);
  return Object.freeze({
    async add(user: Partial<User>) {
      try {
        const newUser = await db.add({
          ...user,
          created: Date.now(),
          updated: Date.now(),
        });
        console.debug('User created.');
        return newUser;
      } catch{
        console.error('Error creating user');
      }

    }
  });
})();

