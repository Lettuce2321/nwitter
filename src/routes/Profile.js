import { collection } from 'firebase/firestore';
import react, {useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService, dbService, dbQuery, dbCollection, dbOrderBy, dbGetDocs, dbWhere } from '../fbase';
import { updateProfile } from 'firebase/auth';
import { async } from '@firebase/util';

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
        <form onSubmit={onSubmit}>
            <input
            type="text"
            placeholder='DisplayName'
            value={newDisplayName}
            onChange={onChange} />
            <input
            type="submit"
            value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}

export default Profile;