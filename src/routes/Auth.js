import react from 'react'
import {authService} from '../fbase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import AuthForm from '../components/AuthForm';
import "../css/mainStyle.css";
import '../css/AuthStyle.css';

function Auth(){

    //form의 형태를 확인하기 위한 hook(onChange)
    
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
        <div className='authContainer'>
            <AuthForm/>
            <div>
                <button name='Github' onClick={onSocialClick}>Continue with Github</button>
                <button name='Google' onClick={onSocialClick}>Continue with Google</button>
            </div>
        </div>
    )
}

export default Auth;