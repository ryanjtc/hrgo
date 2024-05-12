import React from 'react';
import {Link} from "react-router-dom";
import './MainMenu.scss';


const MainMenu = () => {

    return (
        <nav className={'mainMenu-nav'}>
                <>
                    <Link to="/dash" className={'mainMenu-item'}>Profile</Link>
                    <Link to="/tasks" className={'mainMenu-item'}>Tasks</Link>
                    <Link to="/employeeList" className={'mainMenu-item'}>Employee List</Link>
                </>
            <Link to="/addEmployee" className={'mainMenu-item'}>
                    <button className={'menuButton'}>Add Employee</button>
            </Link>

        </nav>
    );
};

export default MainMenu;