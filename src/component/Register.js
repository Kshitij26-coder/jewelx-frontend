import React from 'react';
import { Form, Formik, Field } from 'formik';
import { userValidationRegister } from '../validation/userValidationRegister';
import "./style.css"
import { postUser } from '../utils/apiRequests';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import { showSuccessSnackbar,showErrorSnackbar } from '../utils/snackBar';


export default function Register() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="registration-form" style={{ height: "100vh" }}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        age: '',
                    }}
                    validationSchema={userValidationRegister}
                    onSubmit={values => {
                        // values object will contain the form data
                        postUser(values)
                            .then(() => {
                                showSuccessSnackbar("Registered Sucessfully",enqueueSnackbar);
                                navigate("/user");
                            })
                            .catch((e) => {
                                showErrorSnackbar("Error",enqueueSnackbar);
                            });
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="social-media">
                                <h3>Register User</h3>
                            </div>
                            <div className="form-group mb-10" style={{ marginBottom: "25px" }}>
                                <Field type="text" className="form-control item" id="username" placeholder="Name" name="name" />
                                {errors.name && touched.name ? (
                                    <div className='error'>{errors.name}</div>
                                ) : null}
                            </div>
                            <div className="form-group" style={{ marginBottom: "25px" }}>
                                <Field type="text" className="form-control item" id="email" placeholder="Email" name="email" />
                                {errors.email && touched.email ? (
                                    <div className='error'>{errors.email}</div>
                                ) : null}
                            </div>
                            <div className="form-group" style={{ marginBottom: "25px" }}>
                                <Field type="number" className="form-control item" id="phone-number" placeholder="Age" name="age" />
                                {errors.age && touched.age ? (
                                    <div className='error'>{errors.age}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-block create-account">Create Account</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
