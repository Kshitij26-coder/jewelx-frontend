import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { Link } from 'react-router-dom'; // Import Link
import "./style.css"
import { postUser } from '../utils/apiRequests';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import { showSuccessSnackbar, showErrorSnackbar } from '../utils/snackBar';

export default function Register() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOTP = async (values, actions) => {
        try {
            // Send email and get OTP logic here (not shown)
            setOtpSent(true);
            showSuccessSnackbar(enqueueSnackbar, "OTP sent successfully!");
        } catch (error) {
            showErrorSnackbar(enqueueSnackbar, "Failed to send OTP. Please try again.");
        }
    };

    const handleChangePassword = async (values, actions) => {
        try {
            // Change password logic here (not shown)
            showSuccessSnackbar(enqueueSnackbar, "Password changed successfully!");
            navigate('/login'); // Redirect to login page after password change
        } catch (error) {
            showErrorSnackbar(enqueueSnackbar, "Failed to change password. Please try again.");
        }
    };

    return (
        <div>
            <div className="registration-form" style={{ height: "100vh" }}>
                <Formik
                    initialValues={{
                        email: '',
                        otp: '',
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    onSubmit={otpSent ? handleChangePassword : handleSendOTP}
                    validate={(values) => {
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
                            if (!values.newPassword) {
                                errors.newPassword = 'New password is required';
                            } else if (values.newPassword.length < 6) {
                                errors.newPassword = 'Password must be at least 6 characters long';
                            }
                            if (values.newPassword !== values.confirmPassword) {
                                errors.confirmPassword = 'Passwords do not match';
                            }
                        }
                        return errors;
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="social-media">
                                <h3>{otpSent ? 'Change Password' : 'Forgot Password'}</h3>
                            </div>

                            <div className="form-group" style={{ marginBottom: "25px" }}>
                                <Field type="text" className="form-control item" id="email" placeholder="Email" name="email" />
                                {errors.email && touched.email ? (
                                    <div className='error'>{errors.email}</div>
                                ) : null}
                            </div>

                            {otpSent && (
                                <>
                                    <div className="form-group" style={{ marginBottom: "25px" }}>
                                        <Field type="text" className="form-control item" id="otp" placeholder="OTP" name="otp" />
                                        {errors.otp && touched.otp ? (
                                            <div className='error'>{errors.otp}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "25px" }}>
                                        <Field type="password" className="form-control item" id="newPassword" placeholder="New Password" name="newPassword" />
                                        {errors.newPassword && touched.newPassword ? (
                                            <div className='error'>{errors.newPassword}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "25px" }}>
                                        <Field type="password" className="form-control item" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" />
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <div className='error'>{errors.confirmPassword}</div>
                                        ) : null}
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <button type="submit" className="btn btn-block create-account">{otpSent ? 'Change Password' : 'Send OTP'}</button>
                            </div>
                            <div className="links">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                    <p>Need New an account ? <Link to="/registrationpage">Register</Link></p>
                </div>
                        </Form>
                    )}

                    
                </Formik>
                
                
                
            </div>
        </div>
    );
}
