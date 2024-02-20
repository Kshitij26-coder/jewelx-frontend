import React from 'react';
import '../../styles/style.css';
const Profile = () => {
     return (
          <div className="container " style={{ marginTop: '200px' }}>
               <div className="row">
                    <div className="col-md-4">
                         <div className="card">
                              <div className="text-center">
                                   <div className="half-inside-outside">
                                        <img
                                             alt="..."
                                             className="img-circle img-fluid img-thumbnail"
                                             src="https://demos.creative-tim.com/argon-dashboard-react/static/media/team-4-800x800.99c612eb.jpg"
                                        />
                                   </div>
                              </div>
                              <div className="card-body">
                                   <div className="text-center">
                                        <h3>Jessica Jones</h3>
                                        <div className="h5 font-weight-300">
                                             <i className="glyphicon glyphicon-map-marker" /> Bucharest, Romania
                                        </div>
                                        <div className="h5">
                                             <i className="glyphicon glyphicon-briefcase" /> Solution Manager - Creative Tim Officer
                                        </div>
                                        <div>
                                             <i className="glyphicon glyphicon-education" /> University of Computer Science
                                        </div>
                                        <hr className="my-4" />
                                        <p>
                                             Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all
                                             of his own music.
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="col-md-8">
                         <div className="card">
                              <div className="card-header">
                                   <div className="row">
                                        <div className="col-xs-8">
                                             <h3 className="mb-0 ml-5">My account</h3>
                                        </div>
                                   </div>
                              </div>
                              <div className="card-body">
                                   <form>
                                        <h6 className="heading-small text-muted mb-4">User information</h6>
                                        <div className="pl-lg-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-username">
                                                                 Username
                                                            </label>
                                                            <input
                                                                 className="form-control"
                                                                 defaultValue="lucky.jesse"
                                                                 id="input-username"
                                                                 placeholder="Username"
                                                                 type="text"
                                                            />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-email">
                                                                 Email address
                                                            </label>
                                                            <input
                                                                 className="form-control"
                                                                 id="input-email"
                                                                 placeholder="jesse@example.com"
                                                                 type="email"
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-first-name">
                                                                 First name
                                                            </label>
                                                            <input
                                                                 className="form-control"
                                                                 defaultValue="Lucky"
                                                                 id="input-first-name"
                                                                 placeholder="First name"
                                                                 type="text"
                                                            />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-last-name">
                                                                 Last name
                                                            </label>
                                                            <input
                                                                 className="form-control"
                                                                 defaultValue="Jesse"
                                                                 id="input-last-name"
                                                                 placeholder="Last name"
                                                                 type="text"
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <hr className="my-4" />
                                        <h6 className="heading-small text-muted mb-4">Contact information</h6>
                                        <div className="pl-lg-4">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-address">
                                                       Address
                                                  </label>
                                                  <input
                                                       className="form-control"
                                                       defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                       id="input-address"
                                                       placeholder="Home Address"
                                                       type="text"
                                                  />
                                             </div>
                                             <div className="row">
                                                  <div className="col-lg-4">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-city">
                                                                 City
                                                            </label>
                                                            <input
                                                                 className="form-control"
                                                                 defaultValue="New York"
                                                                 id="input-city"
                                                                 placeholder="City"
                                                                 type="text"
                                                            />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-4">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-country">
                                                                 Country
                                                            </label>
                                                            <input
                                                                 className="form-control"
                                                                 defaultValue="United States"
                                                                 id="input-country"
                                                                 placeholder="Country"
                                                                 type="text"
                                                            />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-4">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-postal-code">
                                                                 Postal code
                                                            </label>
                                                            <input
                                                                 className="form-control"
                                                                 id="input-postal-code"
                                                                 placeholder="Postal code"
                                                                 type="number"
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <hr className="my-4" />
                                        <h6 className="heading-small text-muted mb-4">About me</h6>
                                        <div className="pl-lg-4">
                                             <div className="form-group">
                                                  <label>About Me</label>
                                                  <textarea className="form-control" placeholder="A few words about you ..." rows="4">
                                                       A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.
                                                  </textarea>
                                             </div>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Profile;
