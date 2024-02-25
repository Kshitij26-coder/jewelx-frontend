import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { userValidationLogin } from '../../validation/userValidationLogin';
import '../../styles/style.css';
import { useSnackbar } from 'notistack';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { postRequest } from '../../utils/apis/apiRequestHelper';
import { userEndpoints } from '../../utils/endpoints/userEndpoints';
import Cookies from 'js-cookie';
import Footer from '../../component/Footer';

export default function Register() {
     const { enqueueSnackbar } = useSnackbar();
     const navigate = useNavigate();
     const [loader, setLoader] = useState(false);

     const onSubmitHandler = async values => {
          try {
               setLoader(true);
               const data = await postRequest(values, userEndpoints.LOGIN, navigate, enqueueSnackbar);
               Cookies.set('user', JSON.stringify(data), { expires: 3 });
               showSuccessSnackbar('Logged in successfully', enqueueSnackbar);
               setLoader(false);
               navigate('/');
          } catch (e) {
               setLoader(false);
               console.log(e);
          }
     };

     return (
          <div>
               <div className="registration-form" style={{ height: '100vh' }}>
                    <div className="section-title text-center">
                         <Link to="/home">
                              <h2>Jewelx</h2>{' '}
                         </Link>
                    </div>
                    <Formik
                         initialValues={{
                              password: '',
                              email: '',
                         }}
                         validationSchema={userValidationLogin}
                         onSubmit={values => {
                              // values object will contain the form data
                              onSubmitHandler(values);
                         }}
                    >
                         {({ errors, touched }) => (
                              <Form>
                                   <h3 className="text-center mb-5" style={{ marginBottom: '25px' }}>
                                        Login to Jewelx
                                   </h3>
                                   <div className="form-group" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="email" placeholder="Email" name="email" />
                                        {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="password" className="form-control item" id="pass" placeholder="Password" name="password" />
                                        {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                                   </div>

                                   <div className="form-group">
                                        <button type="submit" className="btn btn-block create-account">
                                             {loader ? <ButtonLoader /> : 'Login'}
                                        </button>
                                   </div>
                                   <div className="forgot-password">
                                        <p>
                                             Have Forgot The Password ?<Link to="/forgot-password"> Forgot password</Link>
                                        </p>
                                        <div className="links">
                                             <p>
                                                  New to Jewelx ? <Link to="/register"> Create An Account</Link>
                                             </p>
                                        </div>
                                   </div>
                              </Form>
                         )}
                    </Formik>
               </div>

<Footer/>
          </div>
     );
}
