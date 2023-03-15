import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import react, { useState } from 'react';
import { authService } from '../fbase';
import "../css/mainStyle.css";
import "../css/AuthStyle.css";

const AuthForm = () => {

    const[email, setEmail] = useState("");  //사용자 email 임시 데이터 공간
    const[password, setPassword] = useState("");    //사용자 password 임시 데이터 공간
    const[newAcount, setNewAcount] = useState(true);    //신규or기존 회원 확인
    const[error, setError] = useState("");

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

    return (
        <div>
            <form onSubmit={onSubmit} className="formContainer">
                <input 
                name="email"
                type="email " 
                placeholder='Email' 
                required 
                value={email}
                onChange={onChange}
                className="authInput"
                />
                <input 
                name="password"
                type="password" 
                placeholder='Password' 
                required 
                value={password}
                onChange={onChange}
                className="authInput"
                />
                <input 
                type="submit" 
                value={newAcount ? "Create Acount" : "Sign In"}
                className="authSubmitButton"
                />
                {error && <span className='authError'>{error}</span>}
            </form>
            <span className='authToggle' onClick={toggleAcount}> {newAcount ? "Sign In" : "Create Acount"}</span>
        </div>
    )
}
export default AuthForm;