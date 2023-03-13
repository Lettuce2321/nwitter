import react, { useEffect, useState, useRef } from 'react'
import {v4 as uuidv4} from 'uuid'
import { dbService, dbAddDoc, dbCollection, dbQuery, dbOnSnapShot, storageService, stRef, stUploadString, stGetDownloadURL } from '../fbase';
import Nweet from '../components/Nweet';

function Home(props) {

    const fileInput = useRef();

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    const onChange = (e) => {
        const {target:{value}} = e;
        setNweet(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        var attachmentURL = "";
        
        if(attachment !== "") {
            const attachmentRef = stRef(storageService, `${props.userObj.uid}/${uuidv4()}`);
            const response = await stUploadString(attachmentRef, attachment, "data_url");
            attachmentURL = await stGetDownloadURL(response.ref);
        }
        const nweetTemp = {
            text: nweet, 
            createAt: Date.now(),
            creatorId: props.userObj.uid,
            attachmentURL
        }
        
        await dbAddDoc(dbCollection(dbService, "nweets"), nweetTemp);
        setNweet("");
        setAttachment("");
        fileInput.current.value = null;
    }
    const onFileChange = (e) => {
        const {target : {files}} = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishiedEvent) => {
            const {currentTarget: {result}} = finishiedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = null;
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
                max={120}/>
                <input 
                type="file"
                accept='image/*'
                onChange={onFileChange}
                ref={fileInput}/>
                <input
                type="submit"
                value="Nweet"/>
                {attachment && 
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onClearAttachment}>cancel upload</button>
                </div>}
            </form>
            {
                nweets.map((nweet) => {
                    return (
                        <Nweet key={nweet.id} NweetObj={nweet} isOwner={nweet.creatorId == props.userObj.uid}/>
                    )
                })
            }
        </>
    )
}

export default Home;