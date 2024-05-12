import React from 'react';
import MainMenu from "../components/dash/MainMenu/MainMenu";
import Calendar from "../components/Calendar/Calendar";
import '../components/Calendar/Calendar.scss';

const Schedule = () => {
    return (
        <div>
            <MainMenu/>
            <div className={'app-container'}>
                <h1>Time Off Request</h1>
            </div>

            <div className={'calendar-container'}>
                <Calendar/>
            </div>
        </div>
    );
};

export default Schedule;