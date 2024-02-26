import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { feedbackValidation } from '../../validation/feedbackValidation';
import './feedback.css';
import logo from '../../assets/logo.png';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import {feedbackEndPoints} from '../../utils/endpoints/feedbackEndPoints'
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { postRequest } from '../../utils/apis/apiRequestHelper';
import { showSuccessSnackbar } from '../../utils/snackBar';

export default function Feedback() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setLoader(true);
            const data = await postRequest(values,feedbackEndPoints.SEND_FEEDBACK, navigate, enqueueSnackbar);
            showSuccessSnackbar('Feedback sent successfully', enqueueSnackbar);
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.log(e);
        }
    };
    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100" style={{ marginTop: '100px' }}>
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0" >
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img src={logo}
                                                style={{ width: '100px', height: '100px' }} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1">We are The Jewelx Team</h4>
                                        </div>
                                        <Formik
                                            initialValues={{
                                                name: '',
                                                email: '',
                                                mobileNumber: '',
                                                description: ''
                                            }}
                                            validationSchema={feedbackValidation}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form>
                                                    <p>Please give your valuable feedback</p>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="name">Name</label>
                                                        <Field type="text" name="name" className="form-control" />
                                                        <ErrorMessage name="name" component="div" className="error-message" />
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="email">Email</label>
                                                        <Field type="email" name="email" className="form-control" />
                                                        <ErrorMessage name="email" component="div" className="error-message" />
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="mobile">Mobile</label>
                                                        <Field type="tel" name="mobileNumber" className="form-control" />
                                                        <ErrorMessage name="mobileNumber" component="div" className="error-message" />
                                                    </div>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="description">Description</label>
                                                        <Field as="textarea" name="description" className="form-control" />
                                                        <ErrorMessage name="description" component="div" className="error-message" />
                                                    </div><br />
                                                    <div className="text-center pt-1 mb-5 pb-1">
                                                        <button className="submit-button" type="submit" disabled={isSubmitting}>
                                                        {loader ? <ButtonLoader /> : 'submit'}
                                                        </button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                                <div className="col-lg-6 align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
