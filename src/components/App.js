import {useEffect, useState} from 'react'
import Routes from "./Routes";
import AppRouter from '../components/Routes'
import {authService} from '../fbase'

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedin, setLoggedIn] = useState(false);
  const [userObj, setUserobj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setLoggedIn(true);
        setUserobj(user)
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedin={isLoggedin} userObj={userObj}/> : "Initializing"}

      <footer>&copy;{new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
