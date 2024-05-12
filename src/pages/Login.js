import React, {useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import '../App.scss';
import { NavLink} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                //signed in
                const user = userCredentials.user;
                console.log(user.uid + 'Successful Login');
                //when user is signed in
                setIsAuthenticated(!isAuthenticated);
                console.log('isAuthenticated: ', isAuthenticated);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
    }

    return (
        <div>
            <h1 className="hero-title">Welcome Back!</h1>
            {isAuthenticated ? (
                <div>
                    <div className={'authVerification-container'}>
                        <p className={'authVerification'}>Thank you! Authentication Successful.</p>
                    </div>
                    <button style={{backgroundColor: '#12394f'}}>
                        <NavLink to={'/dash'} className={'custom-link'}>View Dash</NavLink>
                    </button>
                </div>
            ) : (
                <div>
                        <p>Please login to view your account.</p>
                </div>
            )}
            <form onSubmit={signIn}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Login</button>
            </form>

        </div>
    );
};

export default Login;