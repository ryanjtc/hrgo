import React, { useState } from 'react';
import './Calendar.scss';

const Calendar = () => {
    const [selectedDate1, setSelectedDate1] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [startSelection, setStartSelection] = useState(false);

    const handleDateClick = (day) => {
        const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
        if (!selectedDate1 || (selectedDate1 && selectedDate2)) {
            setSelectedDate1(date);
            setSelectedDate2(null);
            setStartSelection(true);
        } else if (startSelection) {
            if (date > selectedDate1) {
                setSelectedDate2(date);
                setStartSelection(false);
            } else {
                setSelectedDate2(selectedDate1);
                setSelectedDate1(date);
            }
        }
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const startOfMonth = () => {
        return new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1).getDay();
    };

    const days = () => {
        const daysArr = [];
        const totalDays = daysInMonth(selectedMonth.getMonth(), selectedMonth.getFullYear());
        //const startDay = startOfMonth();
        for (let i = 1; i <= totalDays; i++) {
            daysArr.push(i);
        }
        return daysArr.map((day, index) => {
            const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
            let classNames = "day";
            if (selectedDate1 && selectedDate1.getTime() === date.getTime()) {
                classNames += " selected";
            }
            if (selectedDate2 && selectedDate2.getTime() === date.getTime()) {
                classNames += " selected";
            }
            return <div key={index} className={classNames} onClick={() => handleDateClick(day)}>{day}</div>;
        });
    };

    const changeMonth = (increment) => {
        setSelectedMonth(prevMonth => {
            const newMonth = new Date(prevMonth);
            newMonth.setMonth(prevMonth.getMonth() + increment);
            return newMonth;
        });
    };

    return (
        <div>
            <div className={'calendar-container'}>
                <div>
                    <h1>{selectedMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h1>
                    <h2 style={{color: 'gray'}}>{selectedDate1 && selectedDate2 ? `${selectedDate1.toLocaleDateString()} - ${selectedDate2.toLocaleDateString()}` : "Select two dates"}</h2>
                    <button style={{marginRight: 10}} onClick={() => changeMonth(-1)}>Prev</button>
                    <button onClick={() => changeMonth(1)}>Next</button>
                </div>
                <br/>
                <br/>
                <div className="calendar">
                    <div className="weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className="days">
                        {[...Array(startOfMonth()).keys()].map((day) => (
                            <div key={day} className="empty"></div>
                        ))}
                        {days()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
