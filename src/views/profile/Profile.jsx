import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profilevalidation } from '../../validation/profilevalidation';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
     const [isEditing, setIsEditing] = useState(false);
     const [formData, setFormData] = useState(null);
     const initialValues = {
          name: '',
          email: '',
          mobileno: '',
          userrole: '',
          brand: '',
          subsidary: '',
          address: '',
          city: '',
          country: '',
          postalCode: '',
          aboutMe: '',
     };

     const handleSubmit = (values, { setSubmitting }) => {
          // Handle form submission
          console.log(values);
          setSubmitting(false);
          setFormData(values);
          setIsEditing(false);
     };

     const handleLogout = () => {
          // Handle logout functionality
          console.log('Logged out');
     };

     const handleEdit = () => {
          // Handle edit functionality
          setIsEditing(true);
     };

     return (
          <div className="container" style={{ marginTop: '100px' }}>
               <div className="row">
                    <div className="col-md-3" style={{ width: '40%', paddingRight: '1px' }}>
                         <div className="col-md-12">
                              <div className="card">
                                   <div className="text-center">
                                        <div className="half-inside-outside">
                                             <img
                                                  alt="..."
                                                  className="img-circle img-fluid img-thumbnail"
                                                  src="https://t4.ftcdn.net/jpg/05/47/92/27/240_F_547922755_AazNubxrYOHUF3qHpJGl7FrE564utmH5.jpg"
                                             />
                                        </div>
                                   </div>
                                   <div className="card-body">
                                        <div className="text-center">
                                             <h3>Shri Krishna</h3>
                                             <div className="h5 font-weight-300">
                                                  <i className="glyphicon glyphicon-map-marker" />
                                                  Shri Krishna
                                             </div>
                                             <div className="h5">
                                                  <i className="glyphicon glyphicon-briefcase" /> Solution Manager - Creative Tim Officer
                                             </div>
                                             <div>
                                                  <i className="glyphicon glyphicon-education" /> University of Computer Science
                                             </div>
                                             <hr className="my-4" />
                                             <p>
                                                  Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records
                                                  all of his own music.
                                             </p>
                                             <div>
                                                  <button className="btn btn-danger" onClick={handleLogout}>
                                                       Logout
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="col-md-9" style={{ width: '60%' }}>
                         <div>
                              <div className="w-100 p-5 card " style={{ padding: '20px' }}>
                                   <IconButton onClick={handleEdit} aria-label="edit" style={{ marginLeft: '90%' }}>
                                        <EditIcon />
                                   </IconButton>
                                   <Formik initialValues={initialValues} validationSchema={profilevalidation} onSubmit={handleSubmit}>
                                        {({ isSubmitting }) => (
                                             <Form>
                                                  <div className="pl-md-4">
                                                       <div className="row">
                                                            <h5 className="heading-small text-muted mb-4 ">User information</h5>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-name">
                                                                           Name
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-name"
                                                                           name="name"
                                                                           placeholder="Name"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="name" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-email">
                                                                           Email
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-email"
                                                                           name="email"
                                                                           placeholder="Email"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="email" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-mobileno">
                                                                           Mobile No
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-mobileno"
                                                                           name="mobileno"
                                                                           placeholder="Mobile No"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="mobileno" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-userrole">
                                                                           User Role
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-userrole"
                                                                           name="userrole"
                                                                           placeholder="User Role"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="userrole" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-brand">
                                                                           Brand
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-brand"
                                                                           name="brand"
                                                                           placeholder="Brand"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="brand" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-subsidary">
                                                                           Subsidiary
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-subsidary"
                                                                           name="subsidary"
                                                                           placeholder="Subsidiary"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="subsidary" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <hr className="my-4" />
                                                            <h5 className="heading-small text-muted mb-4">Contact information</h5>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-address">
                                                                           Address
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-address"
                                                                           name="address"
                                                                           placeholder="Address"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="address" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-city">
                                                                           City
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-city"
                                                                           name="city"
                                                                           placeholder="City"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="city" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-country">
                                                                           Country
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-country"
                                                                           name="country"
                                                                           placeholder="Country"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="country" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-postal-code">
                                                                           Postal Code
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-postal-code"
                                                                           name="postalCode"
                                                                           placeholder="Postal Code"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="postalCode" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <hr className="my-4" />
                                                            <h5 className="heading-small text-muted mb-4">About Me</h5>
                                                            <div className="col-lg-12">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="aboutMe">
                                                                           About Me
                                                                      </label>
                                                                      <Field
                                                                           as="textarea"
                                                                           className="form-control"
                                                                           id="aboutMe"
                                                                           name="aboutMe"
                                                                           placeholder="A few words about you ..."
                                                                           rows="4"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="aboutMe" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  {/* Submit button */}
                                                  {isEditing && (
                                                       <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                            Submit
                                                       </button>
                                                  )}
                                             </Form>
                                        )}
                                   </Formik>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Profile;
