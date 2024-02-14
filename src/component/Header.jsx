import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import imageLogo from '../assets/logo.png';

export default function Header() {
     return (
          <div className="header-container">
               <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                         <img src={imageLogo} alt="JX" className="logo" />
                         <button
                              className="navbar-toggler"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#navbarNavAltMarkup"
                              aria-controls="navbarNavAltMarkup"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                         >
                              <span className="navbar-toggler-icon"></span>
                         </button>
                         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                              <div className="navbar-nav">
                                   <Link className="nav-link" to="/user">
                                        User
                                   </Link>
                                   <Link className="nav-link" to="/content">
                                        Content
                                   </Link>
                                   <Link className="nav-link" to="/register">
                                        Register
                                   </Link>
                                   <Link className="nav-link" to="/registrationpage">
                                        Registration Page
                                   </Link>
                                   <Link className="nav-link" to="/login">
                                        Login
                                   </Link>
                                   <Link className="nav-link" to="/customer">
                                        Customer
                                   </Link>
                              </div>
                         </div>
                    </div>
               </nav>
          </div>
     );
}
