import React, { useEffect, useState } from 'react';
import MainMenu from "../components/dash/MainMenu/MainMenu";
import '../components/dash/Dash.scss';
//imports for the database
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from "react-router-dom";
import Updates from "../components/dash/Updates/Updates";

const Dash = () => {
    //const [employees, setEmployees] = useState([]);
    const [profileConfirm, setProfileConfirm] = useState(false);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "profile"));
            const profileData = [];
            querySnapshot.forEach((doc) => {
                // Push each employee document data into employeeData array
                profileData.push({ id: doc.id, ...doc.data() });
            });
            // Set the state with the retrieved employee data
            setProfiles(profileData);
            // Check if profileData is empty and set profileConfirm accordingly
            if (profileData.length === 0) {
                setProfileConfirm(true);
            } else {
                setProfileConfirm(false);
            }
        })();
    }, []);

    return (
        <>
            <MainMenu />
            <div className={'dash-container'}>
                {profileConfirm ? (
                    <>
                        <p>There is no data to show, please create a profile below.</p>
                        <button className={'createProfileBtn'}>
                            <Link to="/addProfile" className={'mainMenu-item'} style={{color: "white"}}>Create Profile</Link>
                        </button>
                    </>
                ) : (
                    <>
                        {profiles.map(profile => (
                            <div key={profile.id}>
                                <div className={'profile-card'}>
                                <h2>Welcome, {profile.firstname + " " + profile.lastname}!</h2>
                                    <hr/>
                                    <p className={'infoItem'}><b>Company: </b>{profile.companyName}</p>
                                    <p className={'infoItem'}><b>Job Title: </b>{profile.position}</p>
                                    <p className={'infoItem'}><b>Start Date: </b>{profile.startDate}</p>
                                    <hr/>
                                    <h3>Contact Information: </h3>
                                    <p className={'infoItem'}><b>Address: </b>{profile.address}</p>
                                    <p className={'infoItem'}><b>Email: </b>{profile.email}</p>
                                    <p className={'infoItem'}><b>Phone: </b>{profile.phone}</p>
                                    <hr/>
                                    <h3 style={{color: "red"}}>Emergency Contact:</h3>
                                    <p className={'infoItem'}><b>Full Name: </b>{profile.emergName}</p>
                                    <p className={'infoItem'}><b>Phone: </b>{profile.emergPhone}</p>
                                    <br/>
                                    <Link to={'/editProfile'}>
                                        <button>Edit</button>
                                    </Link>
                                </div>

                                <div>
                                    <Link to={'/tasks'}>
                                        <h4 style={{paddingLeft: 5}}>View Task List</h4>
                                    </Link>
                                    <Link to={'/schedule'}>
                                        <h4 style={{paddingLeft: 5}}>Time Off Request</h4>
                                    </Link>
                                    <Link to={'/payments'}>
                                        <h4 style={{paddingLeft: 5}}>View Payments</h4>
                                    </Link>


                                </div>
                            </div>
                        ))}
                        <div className={'companyUpdates'}>
                            <Updates/>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Dash;
