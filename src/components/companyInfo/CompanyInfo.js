import React from "react";
import photo from '../images/CompanyPhoto.png';
import { FcAbout } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";

function CompanyInfo () {

    return(
        <div>
            <section className={'project-section'}>
                <div>
                    <h2 className={'title'}>Manage Employee Info<FcAbout size={40}/></h2>
                    <hr/>
                    <div className={'infoList'}>
                            <p className={'infoList-item'}> <FcInspection size={30} />Contact Information</p>
                            <p className={'infoList-item'}> <FcInspection size={30} />Important Documents</p>
                            <p className={'infoList-item'}> <FcInspection size={30} />Onboarding New Employees</p>
                    </div>
                </div>
                <img src={photo} alt={'CompanyImg'} />
            </section>
        </div>
    );
}


export default CompanyInfo;