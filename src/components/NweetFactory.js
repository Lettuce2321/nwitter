import react, {useState, useRef} from 'react';
import { dbAddDoc, dbCollection, dbService, stGetDownloadURL, storageService, stRef, stUploadString } from '../fbase';
import {v4 as uuidv4} from 'uuid'

const NweetFactory = (props) => {

    const fileInput = useRef();

    const [nweet, setNweet] = useState("");
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
    return (
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
    )
}

export default NweetFactory;