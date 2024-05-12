import React, { useState } from 'react';
import styles from './Payments.scss';
import MainMenu from "../dash/MainMenu/MainMenu";

const Payments = () => {
    const [hourlyRate, setHourlyRate] = useState('');
    const [biWeeklyPayment, setBiWeeklyPayment] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Calculate bi-weekly payment based on hourly rate
        const weeklyPayment = hourlyRate * 40;
        setBiWeeklyPayment(weeklyPayment * 2);
    };

    return (
        <>
        <MainMenu/>
        <div className={'payment-container'}>
            <h1 className={styles.title}>Payment Information</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="hourlyRate" className={styles.label}>
                    Hourly Rate:
                </label>
                <input
                    type="number"
                    id="hourlyRate"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>
            {biWeeklyPayment !== '' && (
                <div className={styles.result}>
                    <h2 className={styles.resultTitle}>Estimated Bi-Weekly Payment</h2>
                    <p className={styles.paymentAmount}>${biWeeklyPayment} (Before Tax)</p>
                </div>
            )}
        </div>

        </>
    );
};

export default Payments;
