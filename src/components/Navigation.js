import React from "react";
import { Link } from "react-router-dom";

const Navigation = (props) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
            <ul>
                <li><Link to="/profile">{props.userObj.displayName}'s Profile</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;