import React, {useEffect, useState} from 'react';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../firebase";
import {Link} from "react-router-dom";

const Updates = () => {
    const [updatesConfirm, setUpdatesConfirm] = useState(false);
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "updates"));
            const profileData = [];
            querySnapshot.forEach((doc) => {
                // Push each employee document data into employeeData array
                profileData.push({ id: doc.id, ...doc.data() });
            });
            // Set the state with the retrieved employee data
            setUpdates(profileData);
            // Check if profileData is empty and set profileConfirm accordingly
            if (profileData.length === 0) {
                setUpdatesConfirm(true);
            } else {
                setUpdatesConfirm(false);
            }
        })();
    }, []);

    return (
        <div>
            <h2 className={'addTitle'}>Company Updates</h2>
            <hr/>
            <br/>
            <div className={'updatesItem'}>
                {updatesConfirm ? (
                    <>
                        <p>No updates to display!</p>
                        <Link to={'/updateForm'}>
                            <button>Post Update</button>
                        </Link>
                        <br/>
                    </>
                ) : (
                    <>
                        {updates.map(updates => (
                            <div key={updates.id}>
                                <div className={'profile-card'}>
                                    <p><b>Name: </b>{updates.firstname}</p>
                                    <p>{updates.message}</p>
                                </div>
                            </div>
                        ))}
                        <Link to={'/updateForm'}>
                            <button>Post Update</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Updates;