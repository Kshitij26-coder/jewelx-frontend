import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profilevalidation } from '../../validation/profilevalidation';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { roles } from '../../utils/roles';
import { getRolesfromAbbrev } from '../../utils/getRolesfromAbbrev';

const Profile = () => {
     const [isEditing, setIsEditing] = useState(false);
     const [formData, setFormData] = useState(null);
     const [data, setdata] = useState({});
     const [initialValues, setInitialValues] = useState({});
     // const initialValues = {
     //      userName: data?.username,
     //      email: data?.email,
     //      mobileNumber: data?.mobileNumber,
     //      userRole: data?.role,
     //      brand: data?.brandDetails?.name,
     //      subsidiary: data?.subsidiaryDetails?.subsidiaryId,
     //      aboutMe: `Hello, I'm ${data?.username}. With a focus on ${data?.role}, I bring expertise in ${data?.brandDetails?.name} and ${data?.subsidiaryDetails?.subsidiaryId}. Reach out to me via email at ${data?.email} or call me on ${data?.mobileNumber}. Let's collaborate and drive success together.`,
     // };

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
     useEffect(() => {
          setdata(getCookiesObject());
          let data = getCookiesObject();
          setInitialValues({
               userName: data?.username,
               email: data?.email,
               mobileNumber: data?.mobileNumber,
               userRole: data?.role,
               brand: data?.brandDetails?.name,
               subsidiary: data?.subsidiaryDetails?.subsidiaryId,
               aboutMe: `Hello, I'm ${data?.username}. With a focus on ${data?.role}, I bring expertise in ${data?.brandDetails?.name} and ${data?.subsidiaryDetails?.subsidiaryId}. Reach out to me via email at ${data?.email} or call me on ${data?.mobileNumber}. Let's collaborate and drive success together.`,
          });
     }, []);

     return (
          <div className="container" style={{ marginTop: '100px' }}>
               <div className="row">
                    <div className="col-md-3" style={{ width: '40%', paddingRight: '1px' }}>
                         <div className="col-md-12">
                              <div className="card">
                                   <div className="text-center">
                                        <div className="half-inside-outside ">
                                             <img
                                                  alt="..."
                                                  className="img-circle img-fluid img-thumbnail"
                                                  src="https://t4.ftcdn.net/jpg/05/47/92/27/240_F_547922755_AazNubxrYOHUF3qHpJGl7FrE564utmH5.jpg"
                                             />
                                        </div>
                                   </div>
                                   <div className="card-body " style={{ height: 'auto' }}>
                                        <div className="text-center">
                                             <h3>{data.username}</h3>
                                             <div style={{ marginBottom: '20px' }}>
                                                  <h5>Brand Name : {data?.brandDetails?.name}</h5>
                                             </div>
                                             <div className="h5 font-weight-300">
                                                  <i className="glyphicon glyphicon-map-marker" />
                                                  {getRolesfromAbbrev(data?.role)}
                                             </div>
                                             <div className="h5">
                                                  <i className="glyphicon glyphicon-briefcase" /> {data?.email}
                                             </div>

                                             <div style={{ marginTop: '20px' }}>
                                                  <button className="btn btn-danger btn-lg" onClick={handleLogout}>
                                                       <ExitToAppIcon />
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
                                   <Formik
                                        initialValues={initialValues}
                                        enableReinitialize
                                        validationSchema={profilevalidation}
                                        onSubmit={handleSubmit}
                                   >
                                        {({ isSubmitting }) => (
                                             <Form>
                                                  <h5 className="heading-small text-muted mb-4 ">User information</h5>
                                                  <div className="pl-md-4">
                                                       <div className="row">
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-name">
                                                                           Name
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-name"
                                                                           name="userName"
                                                                           placeholder="Name"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="userName" component="div" className="text-danger" />
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
                                                                           name="mobileNumber"
                                                                           placeholder="Mobile No"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
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
                                                                           name="userRole"
                                                                           placeholder="User Role"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="userRole" component="div" className="text-danger" />
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
                                                                           disabled={!(isEditing && getCookiesObject().role == roles.owner)}
                                                                      />
                                                                      <ErrorMessage name="brand" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-subsidiary">
                                                                           Subsidiary
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-subsidiary"
                                                                           name="subsidiary"
                                                                           placeholder="Subsidiary"
                                                                           disabled={!isEditing}
                                                                           as="select"
                                                                      >
                                                                           <option value="select">Select Subsidiary</option>
                                                                           <option value={roles.employee}>Employee</option>
                                                                           <option value={roles.owner}>Owner</option>
                                                                           <option value={roles.admin}>Admin</option>
                                                                      </Field>
                                                                      <ErrorMessage name="subsidiary" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>

                                                            <hr className="my-4" />
                                                            <h5 className="heading-small text-muted mb-4 " style={{ marginLeft: '15px' }}>
                                                                 About Me
                                                            </h5>
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
                                                                           disabled={true}
                                                                      />
                                                                      <ErrorMessage name="aboutMe" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  {/* Submit button */}
                                                  {isEditing && (
                                                       <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
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
