import './style.scss'
import React, { useState } from "react";
import logo from '../../assets/logo.png'
import ClayNav from '@clayui/nav';

import ClayNavigationBar from "@clayui/navigation-bar";

import { Link } from 'react-router-dom'
import UserCard from '../UserCard';


const Sidebar = () => {
    const [active, setActive] = useState("1")

    const handleLinkClick = (value) => {
        setActive(value);
    };
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt='logo' />
            </div>

            <ClayNav className="links">
                <ClayNavigationBar.Item className={`sidemenu ${active === "1" ? 'active' : 'inactive'}`}>
                    <Link to="/" onClick={() => handleLinkClick("1")}>PROJECT BOARD</Link>
                </ClayNavigationBar.Item>
                <ClayNavigationBar.Item className={`sidemenu ${active === "2" ? 'active' : 'inactive'}`}>

                    <Link to="/create-issue" onClick={() => handleLinkClick("2")}>CREATE ISSUES</Link>
                </ClayNavigationBar.Item>
                <ClayNavigationBar.Item className={`sidemenu ${active === "3" ? 'active' : 'inactive'}`}>

                    <Link to="/create-project" onClick={() => handleLinkClick("3")}>CREATE PROJECT</Link>
                </ClayNavigationBar.Item>
            </ClayNav>

            <div className="user">
              <UserCard />
            </div>
        </div>

    )
}

export default Sidebar


