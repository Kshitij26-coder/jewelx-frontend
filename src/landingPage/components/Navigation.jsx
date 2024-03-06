import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logojx from '../data/logo.png';
import { isLoggedIn } from '../../utils/isLoggedIn';
import profile from '../../../public/img/profile.jpg';
import { getCookiesObject } from '../../utils/getCookiesObject';
export const Navigation = props => {
     const [loggedInStatus, setLoggedInStatus] = useState(false);

     useEffect(() => {
          setLoggedInStatus(isLoggedIn());
     }, []);
     return (
          <nav id="menu" className="navbar navbar-default navbar-fixed-top">
               <div className="container">
                    <div className="navbar-header">
                         <img src={logojx} alt="Jewelx Logo" style={{ height: 45, marginRight: 4 }} />
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
                                   <a href="#features" className="page-scroll">
                                        Features
                                   </a>
                              </li>
                              <li>
                                   <a href="#about" className="page-scroll">
                                        About
                                   </a>
                              </li>
                              <li>
                                   <a href="#services" className="page-scroll">
                                        Services
                                   </a>
                              </li>
                              <li>
                                   <a href="#team" className="page-scroll">
                                        Team
                                   </a>
                              </li>
                              <li>
                                   <a href="#contact" className="page-scroll">
                                        Contact
                                   </a>
                              </li>
                              {loggedInStatus ? (
                                   <>
                                        <li>
                                             <Link to="/" className="page-scroll">
                                                  Dashboard
                                             </Link>
                                        </li>
                                        <li>
                                             <Link to="/profile" className="page-scroll">
                                                  Profile
                                             </Link>
                                        </li>
                                        <>
                                             <Link to="/profile">
                                                  <img
                                                       src={getCookiesObject()?.brand.imageUrl == null ? profile : getCookiesObject()?.brand.imageUrl}
                                                       alt="Profile"
                                                       style={{ height: '5rem', width: '5rem', borderRadius: '50%', marginBottom: '0rem' }}
                                                  />
                                             </Link>
                                        </>
                                   </>
                              ) : (
                                   <>
                                        <li>
                                             <Link to="/login" className="page-scroll">
                                                  Login
                                             </Link>
                                        </li>
                                        <li>
                                             <Link to="/register" className="page-scroll">
                                                  SignUp
                                             </Link>
                                        </li>
                                   </>
                              )}
                         </ul>
                    </div>
               </div>
          </nav>
     );
};
