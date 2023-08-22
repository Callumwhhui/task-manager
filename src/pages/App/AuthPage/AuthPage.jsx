import '../App.css';
import SignUpForm from '../../../components/SignUpForm/SignUpForm';
import LoginForm from '../../../components/LoginForm/LoginForm';
import {Link} from 'react-router-dom'

export default function AuthPage({setUser}) {
    return (
        <main>
            <h1>AuthPage</h1>
            <SignUpForm setUser={setUser} />
            <br />
            <LoginForm setUser={setUser}/>
        </main>
    )
}