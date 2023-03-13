import {useEffect, useState} from 'react'
import Routes from "./Routes";
import AppRouter from '../components/Routes'
import {authService} from '../fbase'

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedin, setLoggedIn] = useState(false);
  const [userObj, setUserobj] = useState(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserobj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        console.log(user.displayName);
        if(user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
        console.log(user.displayName)
        setLoggedIn(true);
        setUserobj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(user, {displayName: user.displayName}),
        });
        
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedin={isLoggedin} userObj={userObj} refreshUser={refreshUser}/> : "Initializing"}

      <footer>&copy;{new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
