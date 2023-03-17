import react, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom';
import { authService, dbService, dbQuery, dbCollection, dbGetDocs, dbWhere } from '../fbase';
import { updateProfile } from 'firebase/auth';
import "../css/mainStyle.css"
import "../css/ProfileStyle.css"

function Profile(props) {
    const navigate = useNavigate();
    
    const [newDisplayName, setNewDisplayName] = useState(props.userObj.displayName)
    
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/', {replace: true})
    }
    const getMyNweets = async () => {
        const q = dbQuery(dbCollection(dbService, "nweets"),
        dbWhere("creatorId","==",`${props.userObj.uid}`));
        const querySnapshot = await dbGetDocs(q);
        querySnapshot.forEach(element => {
            console.log(element.data());
        });
    }
    const onChange = (e) => {
        const {target: {value}} = e;
        setNewDisplayName(value);
    }
    const onSubmit = async(e) => {
        e.preventDefault();

        if(props.userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {displayName: newDisplayName});
        }
        props.refreshUser();
    }

    useEffect(() => {
        getMyNweets();
    },[props.userObj]);

    return (
        <>
            <form onSubmit={onSubmit} className="formContainer">
                <input
                type="text"
                placeholder='DisplayName'
                value={newDisplayName}
                className="profileUpdate__input"
                onChange={onChange} required/>
                <input
                type="submit"
                className="profileUpdate__update"
                value="Update Profile" />
            </form>
            <button onClick={onLogOutClick} className="profile__logout">Log out</button>

        </>
    )
}

export default Profile;