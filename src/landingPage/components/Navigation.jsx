import React from 'react';
import { Link } from 'react-router-dom';
 import logojx from '../data/logo.png'
export const Navigation = props => {
     return (
          <nav id="menu" className="navbar navbar-default navbar-fixed-top">
               <div className="container">
               <div className='navbar-header' >
                         <img src={logojx} alt="Jewelx Logo" style={{height:45,marginRight:4}}/>
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
                              <li>
                                   <Link to="/login" className="page-scroll">
                                        Login
                                   </Link>
                              </li>
                              <li>
                                   <Link to="/registrationpage" className="page-scroll">
                                        SignUp
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </div>
          </nav>
     );
};
