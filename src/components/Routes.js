import react from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from '../routes/Profile'
import Navigation from './Navigation';

function AppRouter(props) {
    
    return(
        <>
            {props.isLoggedin ? <Navigation/> : null}
            <Routes>
                {
                    props.isLoggedin ? 
                    <>
                        <Route path='/' element={<Home userObj={props.userObj}/>}/>
                        <Route path='profile' element={<Profile/>}/>
                    </> : 
                    <>
                        <Route path='/'element={<Auth/>}/>
                    </>
                }
            </Routes>
        </>

    )
}

export default AppRouter;