import React from "react";
import { Link } from 'react-router-dom';

import '../css/header.css';

function Header() {

    return (
        <>
            <div className="logo">
                <Link to="/"><img src="/img/LIKELION_image.png" /></Link>
            </div>

            <div className="headerMenu">
                <span><Link to="/">HOME</Link></span>
                <span><Link to="/about">ABOUT</Link></span>
                <span><Link to="/people">PEOPLE</Link></span>
            </div>
        </>
    );
}

export default Header;