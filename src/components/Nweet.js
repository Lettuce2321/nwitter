import react, { useState } from 'react';
import { dbService, dbdeleteDoc, dbUpdataDoc, dbDoc, storageService, stRef, stDeleteObject } from '../fbase';
import "../css/mainStyle.css"
import "../css/NweetStyle.css"

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
    const onSubmitUpdate = async(e) => {
        e.preventDefault();
        console.log(props.NweetObj.text, newNweet)
        await dbUpdataDoc(nweetRef, { text: newNweet});
        setEditing(false);
    }


    return (
        <div className='container'>
            {
                editing ? (
                    <div >
                        <form onSubmit={onSubmitUpdate} className="nweetContainer">
                            <input 
                            type="text" 
                            placeholder='Edit your Nweet!' 
                            value={newNweet}
                            className="nweet__edit"
                            onChange={onChange} required
                            />
                            <div className='nweet__editButton__container'>
                                <button className='nweet_editButton'>
                                <input 
                                type="submit"
                                value="Update Nweet!"
                                />
                                </button>
                                <button onClick={toggleEditing} className='nweet_editButton'>Cancel</button>
                            </div>
                        </form>                        
                    </div>
                ) : (
                    <div className='nweetContainer'>
                        {props.NweetObj.attachmentURL && <img src={props.NweetObj.attachmentURL} width="50px" height="50px"/>}
                        <h4>{props.NweetObj.text}</h4>
                        {
                            props.isOwner ? 
                            <div className='nweet__action'>
                                <button onClick={onDeleteClick}>Delete</button>
                                <button onClick={toggleEditing}>Edit</button>
                            </div> : null
                        }
                    </div> 
                )
                
            }

        </div>
    )
}

export default Nweet;