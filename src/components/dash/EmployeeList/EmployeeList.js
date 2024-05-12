import React, {useEffect, useState} from 'react';
import MainMenu from "../MainMenu/MainMenu";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../firebase";

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);
    const [employeeConfirm, setEmployeeConfirm] = useState(false);
    //const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "employees"));
            const employeeData = [];
            querySnapshot.forEach((doc) => {
                // Push each employee document data into employeeData array
                employeeData.push({ id: doc.id, ...doc.data() });
            });
            // Set the state with the retrieved employee data
            setEmployees(employeeData);
            // Check if profileData is empty and set profileConfirm accordingly
            if (employeeData.length === 0) {
                setEmployeeConfirm(true);
            } else {
                setEmployeeConfirm(false);
            }
        })();
    }, []);


    return (
        <>
            <MainMenu />
            <div className={'dash-container'}>
                {employeeConfirm ? (
                    <>
                        <p>No data to show! Click 'Add Employee' to show contact list.</p>
                    </>
                ) : (
                    <>
                        {employees.map(employee => (
                            <div key={employee.id}>
                                <div className={'profile-card'}>
                                    <h2>{employee.firstname + " " + employee.lastname}</h2>
                                    <hr/>
                                    <p className={'infoItem'}><b>Company: </b>{employee.companyName}</p>
                                    <p className={'infoItem'}><b>Job Title: </b>{employee.position}</p>
                                    <p className={'infoItem'}><b>Start Date: </b>{employee.startDate}</p>
                                    <hr/>

                                    <h3>Contact Information: </h3>
                                    <p className={'infoItem'}><b>Email: </b>{employee.email}</p>
                                    <p className={'infoItem'}><b>Phone: </b>{employee.phone}</p>
                                    <hr/>

                                    <h3 style={{color: "red"}}>Emergency Contact:</h3>
                                    <p className={'infoItem'}><b>Full Name: </b>{employee.emergName}</p>
                                    <p className={'infoItem'}><b>Phone: </b>{employee.emergPhone}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default EmployeeList;