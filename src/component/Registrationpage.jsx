import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { userValidationSchema } from '../validation/userValidationSchema';
import './style.css';
import { postUser } from '../utils/apiRequests';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { showSuccessSnackbar, showErrorSnackbar } from '../utils/snackBar';
import { Link } from 'react-router-dom';

export default function Registrationpage() {
     const { enqueueSnackbar } = useSnackbar();
     const navigate = useNavigate();
     const [showBrandDescription, setShowBrandDescription] = useState(false);

     return (
          <div>
               <div className="registration-form">
               <div className="section-title text-center">
               <Link to="/home">  <h2>Jewelx</h2>  </Link>     
                                   </div>
                    <Formik
                         initialValues={{
                              name: '',
                              email: '',
                              uname: '',
                              password: '',
                              mobno: '',
                              userType: '',
                              brand: '',
                              brandDescription: '',
                              cpassword: '',
                         }}
                         validationSchema={userValidationSchema}
                         onSubmit={values => {
                              // values object will contain the form data
                              postUser(values)
                                   .then(() => {
                                        showSuccessSnackbar('Registered Sucessfully', enqueueSnackbar);
                                        navigate('/user');
                                   })
                                   .catch(e => {
                                        showErrorSnackbar('Error', enqueueSnackbar);
                                   });
                         }}
                    >
                         {({ errors, touched, isValid, setFieldValue }) => (
                              <Form>
                                   <h3 className='text-center mb-5'style={{ marginBottom: '25px' }}>Signup with Jewelx</h3>
                    
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="fullname" placeholder="Name" name="name" />
                                        {errors.name && touched.name ? <div className="error">{errors.name}</div> : null}
                                   </div>
                                   <div className="form-group" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="email" placeholder="Email" name="email" />
                                        {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                                   </div>

                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="username" placeholder="Full Name " name="uname" />
                                        {errors.uname && touched.uname ? <div className="error">{errors.uname}</div> : null}
                                   </div>

                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="tel" className="form-control item" id="mob" placeholder="Mobile No" name="mobno" />
                                        {errors.mobno && touched.mobno ? <div className="error">{errors.mobno}</div> : null}
                                   </div>

                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field
                                             as="select"
                                             className="form-control item"
                                             id="userType"
                                             placeholder="UserType"
                                             name="userType"
                                             onChange={e => {
                                                  if (e.target.value === 'admin') {
                                                       setShowBrandDescription(true);
                                                  } else {
                                                       setShowBrandDescription(false);
                                                  }
                                                  setFieldValue('brand', e.target.value);
                                             }}
                                        >
                                             <option value="select">Select UserType</option>
                                             <option value="customer">Customer</option>
                                             <option value="seller">Seller</option>
                                             <option value="admin">Admin</option>
                                        </Field>
                                        {errors.userType && touched.userType ? <div className="error">{errors.userType}</div> : null}
                                   </div>
                                   {showBrandDescription && (
                                        <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                             <Field
                                                  type="text"
                                                  className="form-control item"
                                                  id="brandDescription"
                                                  placeholder="Brand Description"
                                                  name="brandDescription"
                                             />
                                             {errors.brandDescription && touched.brandDescription ? (
                                                  <div className="error">{errors.brandDescription}</div>
                                             ) : null}
                                        </div>
                                   )}
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field as="select" className="form-control item" id="brand" placeholder="Brand" name="brand">
                                             <option value="select brand">Brand</option>
                                             <option value="f1">Franchise 1</option>
                                             <option value="f2">Franchise 2</option>
                                             <option value="f3">Franchise 3</option>
                                        </Field>
                                        {errors.brand && touched.brand ? <div className="error">{errors.brand}</div> : null}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="pass" placeholder="Password" name="password" />
                                        {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="cpass" placeholder="Confirm Password" name="cpassword" />
                                        {errors.cpassword && touched.cpassword ? <div className="error">{errors.cpassword}</div> : null}
                                   </div>
                                   <div className="form-group">
                                        <button type="submit" className="btn btn-block create-account btn btn-lg" disabled={!isValid}>
                                             Create Account
                                        </button>
                                   </div>
                                   <div className="links">
                                        <p>
                                             Already have an account? <Link to="/login">Login</Link>
                                        </p>
                                   </div>
                              </Form>
                         )}
                    </Formik>
               </div>
          </div>
     );
}
