import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { Link } from 'react-router-dom'; // Import Link
import './style.css';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { showSuccessSnackbar, showErrorSnackbar } from '../utils/snackBar';
import { postRequest, putRequest } from '../utils/apis/apiRequestHelper';
import { userEndpoints } from '../utils/endpoints/userEndpoints';
import { getUsersByIdEndpoint } from '../utils/apis/userApiRequests';
import SuccessAlert from '../utils/alerts/SuccessAlert';
import ButtonLoader from './loaders/ButtonLoader';

export default function Register() {
     const { enqueueSnackbar } = useSnackbar();
     const navigate = useNavigate();
     const [otpSent, setOtpSent] = useState(false);
     const [otpVerified, setOtpVerified] = useState(false);
     const [isValidOtp, setIsValidOtp] = useState(false);
     const [loader, setLoader] = useState(false);
     const handleSendOTP = async values => {
          try {
               setLoader(true);
               console.log(getUsersByIdEndpoint(userEndpoints.SEND_OTP, values.email));
               const data = await postRequest({}, getUsersByIdEndpoint(userEndpoints.SEND_OTP, values.email), navigate, enqueueSnackbar);
               setOtpSent(true);
               setLoader(false);
          } catch (error) {
               setLoader(false);
               console.log(error);
          }
     };

     const handleVerifyOtp = async values => {
          try {
               setLoader(true);
               const data = await postRequest(values, userEndpoints.VERIFY_OTP, navigate, enqueueSnackbar);
               setOtpVerified(true);
               showSuccessSnackbar('OTP verified', enqueueSnackbar);
               setLoader(false);
          } catch (e) {
               setLoader(false);
               console.log(e);
          }
     };

     const handleChangePassword = async values => {
          try {
               setLoader(true);
               const data = await putRequest('', values, userEndpoints.RESET_PASSWORD, navigate, enqueueSnackbar);
               setLoader(false);
               navigate('/login'); // Redirect to login page after password change
          } catch (error) {
               setLoader(false);
               console.log(error);
               //showErrorSnackbar(enqueueSnackbar, 'Failed to change password. Please try again.');
          }
     };

     return (
          <div>
               <div className="registration-form" style={{ height: '100vh' }}>
               <div className="section-title text-center">
                                        <h2>Jewelx</h2>       
                                   </div>
                    <Formik
                         initialValues={{
                              email: '',
                              otp: '',
                              password: '',
                              confirmPassword: '',
                         }}
                         onSubmit={values =>
                              otpSent && otpVerified ? handleChangePassword(values) : otpSent ? handleVerifyOtp(values) : handleSendOTP(values)
                         }
                         validate={values => {
                              const errors = {};
                              if (!values.email) {
                                   errors.email = 'Email is required';
                              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                   errors.email = 'Invalid email address';
                              }
                              if (otpSent) {
                                   if (!values.otp) {
                                        errors.otp = 'OTP is required';
                                   }
                                   if (otpVerified) {
                                        if (!values.password) {
                                             errors.password = 'New password is required';
                                        } else if (values.password.length < 8) {
                                             errors.password = 'Password must be at least 8 characters long';
                                        }
                                        if (values.password !== values.confirmPassword) {
                                             errors.confirmPassword = 'Passwords do not match';
                                        }
                                   }
                              }
                              return errors;
                         }}
                    >
                         {({ errors, touched }) => (
                              <Form>
                                   <div className="social-media">
                                        <h3>{otpSent && otpVerified ? 'Change Password' : otpSent ? 'Verify Password' : 'Send OTP'}</h3>
                                   </div>
                                   {otpSent && <SuccessAlert />}
                                   <div className="form-group" style={{ marginBottom: '25px' }}>
                                        <Field
                                             type="text"
                                             className="form-control item"
                                             id="email"
                                             placeholder="Email"
                                             name="email"
                                             disabled={otpSent}
                                        />
                                        {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                                   </div>

                                   {otpSent && (
                                        <>
                                             <div
                                                  className="form-group"
                                                  style={{
                                                       marginBottom: '25px',
                                                  }}
                                             >
                                                  <Field
                                                       type="text"
                                                       className="form-control item"
                                                       id="otp"
                                                       placeholder="OTP"
                                                       name="otp"
                                                       disabled={otpVerified}
                                                  />
                                                  {errors.otp && touched.otp ? <div className="error">{errors.otp}</div> : null}
                                             </div>

                                             {otpVerified && (
                                                  <>
                                                       <div
                                                            className="form-group"
                                                            style={{
                                                                 marginBottom: '25px',
                                                            }}
                                                       >
                                                            <Field
                                                                 type="password"
                                                                 className="form-control item"
                                                                 id="password"
                                                                 placeholder="New Password"
                                                                 name="password"
                                                            />
                                                            {errors.password && touched.password ? (
                                                                 <div className="error">{errors.password}</div>
                                                            ) : null}
                                                       </div>

                                                       <div
                                                            className="form-group"
                                                            style={{
                                                                 marginBottom: '25px',
                                                            }}
                                                       >
                                                            <Field
                                                                 type="password"
                                                                 className="form-control item"
                                                                 id="confirmPassword"
                                                                 placeholder="Confirm Password"
                                                                 name="confirmPassword"
                                                            />
                                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                                 <div className="error">{errors.confirmPassword}</div>
                                                            ) : null}
                                                       </div>
                                                  </>
                                             )}
                                        </>
                                   )}

                                   <div className="form-group">
                                        <button type="submit" className="btn btn-block create-account" disabled={loader}>
                                             {loader ? (
                                                  <ButtonLoader />
                                             ) : otpSent && otpVerified ? (
                                                  'Change Password'
                                             ) : otpSent ? (
                                                  'verify OTP'
                                             ) : (
                                                  'Send OTP'
                                             )}
                                        </button>
                                   </div>
                                   <div className="links">
                                        {otpSent ? (
                                             <p>
                                                  Didn't get OTP ?
                                                  <button className="btn btn-link" onClick={() => setOtpSent(false)}>
                                                       <strong>Resend OTP</strong>
                                                  </button>
                                             </p>
                                        ) : (
                                             <>
                                                  <p>
                                                       Already have an account? <Link to="/login">Login</Link>
                                                  </p>
                                                  <p>
                                                       Need New an account ? <Link to="/registrationpage">Register</Link>
                                                  </p>
                                             </>
                                        )}
                                   </div>
                              </Form>
                         )}
                    </Formik>
               </div>
          </div>
     );
}
