import React, {useState} from 'react';
import CompanyInfo from "../components/companyInfo/CompanyInfo";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
//import {NavLink} from "react-router-dom";

const Home = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);

    const showForm = () => {
        setShowLoginForm(!showLoginForm);
    }

    return (
        <div>
            {showLoginForm ?
                (
                    <div className={'hero-section'}>
                        <Login/>
                        <button className={'login-button'} onClick={showForm}>Don't have an account? Create Account</button>
                    </div>
                ) : (
                    <div className={'hero-section'}>
                        <CreateAccount/>
                        <button className={'login-button'} onClick={showForm}>Already have an account? Login</button>
                    </div>
                )}
            <CompanyInfo/>
        </div>
    );
};

export default Home;