import { async } from '@firebase/util';
import react, { useState } from 'react';
import { dbService, dbdeleteDoc, dbUpdataDoc, dbDoc, storageService, stRef, stDeleteObject } from '../fbase';

const Nweet = (props) => {
    const [editing, setEditing] = useState(false);  //edit 모드인지 확인
    const [newNweet, setNewNweet] = useState(props.NweetObj.text);  //edit 한 Nweet을 저장

    const nweetRef = dbDoc(dbService, "nweets", `${props.NweetObj.id}`);

    const onDeleteClick = async() => {
        const ok = window.confirm('Are you sure you want to delete this nweet?');
        if(ok) {
            //delete
            await dbdeleteDoc(nweetRef);
            if(props.NweetObj.attachmentURL !== "") {
                await stDeleteObject(stRef(storageService, props.NweetObj.attachmentURL));
            }
        }
    }
    const toggleEditing = () => setEditing((prev => !prev))
    const onChange = (e) => {
        const {target : {value}} = e;
        setNewNweet(value)
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        console.log(props.NweetObj.text, newNweet)
        await dbUpdataDoc(nweetRef, { text: newNweet});
        setEditing(false);
    }


    return (
        <div>
            {
                editing ? (
                    <div>
                        <form onSubmit={onSubmit}>
                            <input 
                            type="text" 
                            placeholder='Edit your Nweet!' 
                            value={newNweet}
                            onChange={onChange} required/>
                            <input 
                            type="submit"
                            value="Update Nweet!"/>
                        </form> 
                        <button onClick={toggleEditing}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <h4>{props.NweetObj.text}</h4>
                        {props.NweetObj.attachmentURL && <img src={props.NweetObj.attachmentURL} width="50px" height="50px"/>}
                        {
                            props.isOwner ? 
                            <>
                                <button onClick={onDeleteClick}>Delete</button>
                                <button onClick={toggleEditing}>Edit</button>
                            </> : null
                        }
                    </> 
                )
                
            }

        </div>
    )
}

export default Nweet;