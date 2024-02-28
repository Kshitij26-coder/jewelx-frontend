import React from 'react';

export const Team = props => {
     return (
          <div id="team" className="text-center">
               <div className="container">
                    <div className="col-md-8 col-md-offset-2 section-title">
                         <h2>Meet the Team</h2>
                         <p>Learn about the dedicated individuals who make our jewelry management system possible.</p>
                    </div>
                    <div id="row">
                         {props.data
                              ? props.data.map((d, i) => (
                                     <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                                          <div className="thumbnail">
                                               {' '}
                                               <img src={d.img} alt="..." className="team-img" />
                                               <div className="caption">
                                                    <h4>{d.name}</h4>
                                                    <p>{d.job}</p>
                                               </div>
                                               <div className="col-md-12">
                                                    <div className="row">
                                                         <div className="social">
                                                              <ul>
                                                                   <li className="col-md-6">
                                                                        <a href={props.data ? props.data.facebook : '/'}>
                                                                             <i className="fa fa-facebook"></i>
                                                                        </a>
                                                                   </li>
                                                                   <li className="col-md-6">
                                                                        <a href={props.data ? props.data.twitter : '/'}>
                                                                             <i className="fa fa-twitter"></i>
                                                                        </a>
                                                                   </li>
                                                              </ul>
                                                         </div>
                                                    </div>
                                               </div>
                                          </div>
                                     </div>
                                ))
                              : 'loading'}
                    </div>
               </div>
          </div>
     );
};
