import react, { useEffect, useState } from 'react'
import { dbService, dbAddDoc, dbCollection, dbQuery, dbOnSnapShot } from '../fbase';

function Home(props) {

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const onChange = (e) => {
        const {target:{value}} = e;
        setNweet(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('click')
        await dbAddDoc(dbCollection(dbService, "nweets"),{
            text: nweet, 
            createAt: Date.now(),
            creatorId: props.userObj.uid
        });
        setNweet("");
    }
    

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
            <form onSubmit={onSubmit}>
                <input
                type="text"
                value={nweet}
                onChange={onChange}
                placeholder="What's on your mind?"
                max={120}
                />
                <input
                type="submit"
                value="Nweet"
                />
            </form>
            {
                nweets.map((nweet) => {
                    return (
                        <div key={nweet.id}>
                            <h4>{nweet.text}</h4>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Home;