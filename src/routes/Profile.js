import react from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';


function Profile() {
    const navigate = useNavigate()
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/', {replace: true})
    }

    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}

export default Profile;