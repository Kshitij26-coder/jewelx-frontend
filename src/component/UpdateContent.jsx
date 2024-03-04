import React, { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { userValidationSchema } from '../validation/userValidationSchema';
import './style.css';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
const UpdateContent = () => {
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);

     // Access individual query parameters
     const name = queryParams.get('name');
     const age = queryParams.get('age');
     const email = queryParams.get('email');
     const id = queryParams.get('id');
     const { enqueueSnackbar } = useSnackbar();
     const navigate = useNavigate();
     const snackbarStyle = {
          backgroundColor: 'green', // Set the background color to green
          color: 'white', // Set the text color to white or another contrasting color
     };
     const showSuccessSnackbar = message => {
          enqueueSnackbar(message, {
               variant: 'success',
               anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
               },
               autoHideDuration: 1500,
               style: snackbarStyle,
          });
     };

     useEffect(() => {}, []);
     return (
          <div>
               <div className="registration-form" style={{ height: '100vh' }}>
                    <Formik initialValues={{ name, age, email }} validationSchema={userValidationSchema} onSubmit={values => {}}>
                         {({ errors, touched }) => (
                              <Form>
                                   <div className="social-media">
                                        <h3>Update User</h3>
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="username" placeholder="Name" name="name" />
                                        {errors.name && touched.name ? <div className="error">{errors.name}</div> : null}
                                   </div>
                                   <div className="form-group" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="email" placeholder="Email" name="email" />
                                        {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                                   </div>
                                   <div className="form-group" style={{ marginBottom: '25px' }}>
                                        <Field type="number" className="form-control item" id="phone-number" placeholder="Age" name="age" />
                                        {errors.age && touched.age ? <div className="error">{errors.age}</div> : null}
                                   </div>
                                   <div className="form-group">
                                        <button type="submit" className="btn btn-block create-account">
                                             Create Account
                                        </button>
                                   </div>
                              </Form>
                         )}
                    </Formik>
               </div>
          </div>
     );
};

export default UpdateContent;
