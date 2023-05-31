import logo from '../../assets/logo/logo.png'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    // const home = () => {
    //     navigate("/home");
    // }

    const login = () => {
        if (localStorage.getItem("token") === "null") {
            navigate("/login");
        } else {
            let ans = window.confirm("  Are You Sure...! \n  Do You Want To Logout...?");
            if (ans) {
                localStorage.clear();
                localStorage.setItem("token", "null")
                navigate("/home");
                window.location.reload();
            }

        }
    }

    return (
        <header className="header">
            <div className="logo-content">
                <img src={logo} width="50cm" alt="" />
                <div className="header-text">
                    <span >
                        To-Do List
                    </span>
                </div>
            </div>
            {/* <button
            className='button'
                size="small"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={home}
            >
                Home
            </button> */}

            <h3>
                Welcome, {" "}{localStorage.getItem("First Name")}
                {localStorage.getItem("token") === "null" ? 'Guest' : ''}
            </h3>
            
            {localStorage.getItem("token") === "null" ? 
            null :
            <button variant="contained" onClick={login} className='button'>
            {localStorage.getItem("token") === "null" ? 'Login' : 'Logout '}
        </button>  }

        </header>
    )
}