import React from "react";
import "./TopBar.scss"

const TopBar: React.FC = () => (
    <div className="top-bar">
        <div className="logo-section">
            <img height="50%" src="https://www.moonactive.com/wp-content/uploads/2019/09/Gray_logo2.svg"/>
            <div className="routes">
                Home | Page-1 | Page-2 | <u>Promotions</u>
            </div>
        </div>
        <div className="page-section">
            <h3>Promotions</h3>
        </div>
    </div>
);

export default TopBar;
