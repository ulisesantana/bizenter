import firebase from "./Firebase";

export const AuthService = Object.freeze({
  async logOut(){
    try {
      await firebase.auth().signOut();
      console.debug('Logged out.')
    } catch{
      console.error('Error logging out');
    }

  }
});
