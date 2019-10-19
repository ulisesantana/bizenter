import React, {createContext, useEffect, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {AuthService} from "../services";
import {UserService} from "../services/UserService";

export const {Consumer: UserConsumer, Provider} = createContext({
  isSignedIn: false,
  user: {}
});

export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState({
    isSignedIn: false,
    user: {}
  });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(
      (user) => setUser({
        isSignedIn: !!user,
        user: !!user ? user : {}
      })
    );
  }, []);

  return (
    <Provider value={user}>
      {children}
    </Provider>
  )
};

// Configure Firebase.

// REFACTOR A FUNCTIONS

export class Login extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
    user: {}
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
  private unregisterAuthObserver: firebase.Unsubscribe | undefined;

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (!!user){
          UserService.add({
            email: user.email || '',
            name: user.displayName || '',
            photoUrl: user.photoURL || '',
          }).then( newUser => {
            this.setState({isSignedIn: !!user, user: newUser})
          });
        } else {
          this.setState({isSignedIn: false});
        }
      }
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    !!this.unregisterAuthObserver && this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser!.displayName}! You are now signed-in!</p>
        <a onClick={AuthService.logOut}>Sign-out</a>
      </div>
    );
  }
}
