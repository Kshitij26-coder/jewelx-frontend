import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import imageLogo from '../assets/logo.png';

export default function Header() {
     return (
          <nav id="menu" className="navbar navbar-default navbar-fixed-top">
               <div className="container">
<<<<<<< HEAD
                    <div className='navbar-header' >
=======
                    <div className="navbar-header">
>>>>>>> cacb2c918b9aea94e16a22ac67a346835d7bf110
                         <img src={imageLogo} alt="Jewelx Logo" style={{ height: 45, marginRight: 4 }} />
                    </div>
                    <div className="navbar-header">
                         <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                              {' '}
                              <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span>{' '}
                              <span className="icon-bar"></span>{' '}
                         </button>
<<<<<<< HEAD

                         <Link className="navbar-brand page-scroll" to="/home">
                              Jewelx
                         </Link>

                         {''}.
                    </div>

=======
                         <Link className="navbar-brand page-scroll" to="/home">
                              Jewelx
                         </Link>
                         {''}.
                    </div>
>>>>>>> cacb2c918b9aea94e16a22ac67a346835d7bf110

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                         <ul className="nav navbar-nav navbar-right">
                              <li>
<<<<<<< HEAD
                                   <Link className="nav-link" to="/user">
                                        User
                                   </Link>
                              </li>
                              <li>
                                   <Link className="nav-link" to="/home">
                                        Home
                                   </Link>
                              </li>
                              <li></li>
                              <li>
                                   <Link className="nav-link" to="/content">
                                        Content
                                   </Link>
                              </li>
                              <li>
                                   <Link className="nav-link" to="/customer">
                                        Customer
=======
                                   <Link className="nav-link" to="/home">
                                        Home
                                   </Link>
                              </li>
                              <li>
                                   <Link className="nav-link" to="/dashboard">
                                        Dashboard
>>>>>>> cacb2c918b9aea94e16a22ac67a346835d7bf110
                                   </Link>
                              </li>
                              <li>
                                   <Link className="nav-link" to="/profile">
                                        Profile
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
          </nav>
     );
}
