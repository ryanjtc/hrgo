import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import '../App.scss';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createAccount =(e) => {
        e.preventDefault();
        //import fn to sign in from firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                const user = userCredentials.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                alert(errorMessage);
            });
    }
    return (
        <div>
            <h1 className="hero-title">Welcome!</h1>
            <p>Create an account to get started.</p>
            <form onSubmit={createAccount}>
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
                <button type="submit" className="submit-button">Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccount;