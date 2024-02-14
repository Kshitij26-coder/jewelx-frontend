import React from 'react';
import { Form, Formik, Field } from 'formik';
import { userValidationLogin } from '../validation/userValidationLogin';
import './style.css';
import { postUser } from '../utils/apiRequests';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import { showSuccessSnackbar, showErrorSnackbar } from '../utils/snackBar';

export default function Register() {
     const { enqueueSnackbar } = useSnackbar();
     const navigate = useNavigate();

     return (
          <div>
               <div className="registration-form" style={{ height: '100vh' }}>
                    <Formik
                         initialValues={{
                              password: '',
                              email: '',
                         }}
                         validationSchema={userValidationLogin}
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
                         {({ errors, touched }) => (
                              <Form>
                                   <div className="social-media">
                                        <h3>Login </h3>
                                   </div>
                                   <div className="form-group" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="email" placeholder="Email" name="email" />
                                        {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="pass" placeholder="Password" name="password" />
                                        {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                                   </div>

                                   <div className="form-group">
                                        <button type="submit" className="btn btn-block create-account">
                                             {' '}
                                             Login{' '}
                                        </button>
                                   </div>
                                   <div className="forgot-password">
                                        <p>
                                             Have Forgot The Password ?<Link to="/forgot-password"> Forgot password</Link>
                                        </p>
                                        <div className="links">
                                             <p>
                                                  New to Jewelx ? <Link to="/registrationpage"> Create An Account</Link>
                                             </p>
                                        </div>
                                   </div>
                              </Form>
                         )}
                    </Formik>
               </div>
          </div>
     );
}
