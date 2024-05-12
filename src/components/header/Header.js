import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return(
        <div className={"header"}>
            <div className={"title"}>HRGO</div>
            <div className={"menu-items"}>
                <div className={"menu-item"}>
                    <Link to={'/'} className={'custom-link'}>Home</Link>
                </div>
                <div className={"menu-item"}>About</div>
                <div className={"menu-item"}>Contact</div>
            </div>
        </div>
    );
}

export default Header;