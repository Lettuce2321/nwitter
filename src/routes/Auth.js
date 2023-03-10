import react, { useState } from 'react'
import {authService} from '../fbase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { async } from '@firebase/util';

function Auth(){
    const[email, setEmail] = useState("");  //사용자 email 임시 데이터 공간
    const[password, setPassword] = useState("");    //사용자 password 임시 데이터 공간
    const[newAcount, setNewAcount] = useState(true);    //신규or기존 회원 확인
    const[error, setError] = useState("");

    //form의 형태를 확인하기 위한 hook(onChange)
    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value)
        }
    }
    //form의 제출을 위한 hook(onSubmit)
    const onSubmit = async (e) => {
        e.preventDefault();
        let data;
        try {
            if(newAcount) {
                //create acount
                data = await createUserWithEmailAndPassword( authService, email, password )
            } else {
                //log in
                data = await signInWithEmailAndPassword( authService, email, password )
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    }

    const toggleAcount = () => {
        setNewAcount(!newAcount);
    }
    const onSocialClick = async (e) => {
        console.log('click');
        const {target: {name}} = e;
        let provider;
        if(name === 'Google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'Github') {
            provider = new GithubAuthProvider();
        }

        await signInWithPopup(authService, provider);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                name="email"
                type="email " 
                placeholder='Email' 
                required 
                value={email}
                onChange={onChange}
                />
                <input 
                name="password"
                type="password" 
                placeholder='Password' 
                required 
                value={password}
                onChange={onChange}/>
                <input 
                type="submit" 
                value={newAcount ? "Create Acount" : "Sign In"}/>
                {error}
            </form>
            <span onClick={toggleAcount}> {newAcount ? "Sign In" : "Create Acount"} </span>
            <div>
                <button name='Github' onClick={onSocialClick}>Continue with Github</button>
                <button name='Google' onClick={onSocialClick}>Continue with Google</button>
            </div>
        </>
    )
}

export default Auth;