import React, {useState} from 'react';
import MainMenu from "../MainMenu/MainMenu";
import './AddProfile.scss';
//firebase imports
import {collection, addDoc} from 'firebase/firestore';
import {db} from "../../../firebase";

const AddProfile = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [startDate, setStartDate] = useState('');
    //Emergency contact info below
    const [emergName, setEmergName] = useState('');
    const [emergPhone, setEmergPhone] = useState('');


    //imports data into the Firestore Database
    const formSubmission = async (event) => {
        event.preventDefault();
        try {
            const profileDocRef = await addDoc(collection(db, "profile"), {
                firstname: firstname,
                lastname: lastname,
                address: address,
                email: email,
                phone: phone,
                companyName: companyName,
                position: position,
                startDate: startDate,
                emergName: emergName,
                emergPhone: emergPhone
            });
            console.log("Document written with ID: ", profileDocRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <div>
            <MainMenu />
            <h2 className={'addTitle'}>Add Profile Info:</h2>
            <form onSubmit={formSubmission}>
                <input
                    type="firstname"
                    name="firstname"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <input
                    type="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
                <input
                    type="address"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="companyName"
                    name="companyName"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <input
                    type="position"
                    name="position"
                    placeholder="Job Title"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
                <p>Start Date:</p>
                <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />

                <p>Emergency Contact:</p>
                <input
                    type="emergName"
                    name="emergName"
                    placeholder={'Full Name'}
                    value={emergName}
                    onChange={(e) => setEmergName(e.target.value)}
                    required
                />
                <input
                    type="emergPhone"
                    name="emergPhone"
                    placeholder={'Phone'}
                    value={emergPhone}
                    onChange={(e) => setEmergPhone(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default AddProfile;