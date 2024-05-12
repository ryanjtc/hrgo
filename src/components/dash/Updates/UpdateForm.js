import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import MainMenu from "../MainMenu/MainMenu";

const UpdateForm = () => {
    const [firstname, setFirstname] = useState('');
    const [message, setMessage] = useState('');
    const [sendEmail, setSendEmail] = useState(false); // State to track checkbox
    const [email, setEmail] = useState(''); // State to store email address

    // Function to generate mailto link
    const generateMailtoLink = () => {
        const subject = encodeURIComponent(`Update from ${firstname}`);
        const body = encodeURIComponent(message);
        return `mailto:${email}?subject=${subject}&body=${body}`;
    };

    //imports data into the Firestore Database into the 'updates' collection.
    const formSubmission = async (event) => {
        event.preventDefault();
        try {
            const updatesDocRef = await addDoc(collection(db, "updates"), {
                firstname: firstname,
                message: message,
            });
            console.log("Document written with ID: ", updatesDocRef.id);

            // Check if sendEmail is true and email is provided
            if (sendEmail && email.trim() !== '') {
                // Generate mailto link
                const mailtoLink = generateMailtoLink();
                // Open default email client with mailto link
                window.location.href = mailtoLink;
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div>
            <MainMenu />
            <h2 className={'addTitle'}>Post a Company Update</h2>
            <form onSubmit={formSubmission}>
                <br />
                <input
                    type="firstname"
                    name="firstname"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <input
                    type="message"
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ height: "100px" }}
                />
                <label style={{display: "flex", alignContent: "center", textAlign: "center"}}>
                    Send as Email
                    <input
                        type="checkbox"
                        checked={sendEmail}
                        onChange={(e) => setSendEmail(e.target.checked)}
                    />
                </label>
                {sendEmail && (
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                )}
                <button type="submit" className="submit-button">Post</button>
                <button style={{ marginTop: '20px' }}>
                    <Link to={'/dash'} style={{ color: "white", textDecoration: "none" }}>Go Back</Link>
                </button>
            </form>
            <hr />
            <br />
        </div>
    );
};

export default UpdateForm;
