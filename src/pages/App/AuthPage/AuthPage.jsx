import '../App.css';
import SignUpForm from '../../../components/SignUpForm/SignUpForm';
import LoginForm from '../../../components/LoginForm/LoginForm';
import { useState } from 'react';

export default function AuthPage({setUser}) {
    const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(true);
    return (
        <main>
            <div className='form'> 
            {isSignUpFormVisible ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser}/>}
            <button onClick={() => setIsSignUpFormVisible(!isSignUpFormVisible)}>
                {isSignUpFormVisible ? ' Login ' : ' Sign Up '}
            </button>
            </div>
        </main>
    )
}