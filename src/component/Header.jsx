import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import imageLogo from '../assets/logo.png';

export default function Header() {
     return (
          <nav id="menu" className="navbar navbar-default navbar-fixed-top">
               <div className="container">
                    <div className="navbar-header">
                         <img src={imageLogo} alt="Jewelx Logo" style={{ height: 45, marginRight: 4 }} />
                    </div>
                    <div className="navbar-header">
                         <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                              {' '}
                              <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span>{' '}
                              <span className="icon-bar"></span>{' '}
                         </button>
                         <Link className="navbar-brand page-scroll" to="/home">
                              Jewelx
                         </Link>
                         {''}.
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                         <ul className="nav navbar-nav navbar-right">
                              <li>
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
                                   <Link className="nav-link" to="/customers">
                                        Customer
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
          </nav>
     );
}
