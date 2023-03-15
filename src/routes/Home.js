import react, { useEffect, useState} from 'react'
import { dbService, dbCollection, dbQuery, dbOnSnapShot } from '../fbase';
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';

function Home(props) {
 
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = dbQuery(dbCollection(dbService, "nweets"));
        dbOnSnapShot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        });
    }, [])
    
    return (
        <>
            <NweetFactory userObj={props.userObj}/>
            {
                nweets.map((nweet) => {
                    return (
                        <Nweet key={nweet.id} NweetObj={nweet} isOwner={nweet.creatorId === props.userObj.uid}/>
                    )
                })
            }
        </>
    )
}

export default Home;