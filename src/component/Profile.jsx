import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Footer from './Footer';
import './style.css';
import brandLogo from '../assets/brand-logo.png';
import dummyPhoto from '../assets/select photo.png';

const mockUserProfile = {
    "photoUrl": "/img/team/02.jpg",
    "userId": "c49b2e6b-af28-4d64-8f8e-708c8135519d",
    "userName": "Krishna Jadhav",
    "email": "krishna2699@gmail.com",
    "mobileNumber": "9420422840",
    "userRole": "A",
    "brand": {
        "brandId": 1,
        "name": "Bharat Jwellwers",
        "imageUrl": brandLogo
    },
    "assignedBy": {
        "idxId": 1,
        "userId": "c49b2e6b-af28-4d64-8f8e-708c8135519d",
        "username": "krishna2699@gmail.com",
        "email": "krishna2699@gmail.com"
    },
    "subsidiary": "",
    "active": true,
    "loggedIn": false,
};

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobileNumber: Yup.string().required('Mobile number is required'),
        subsidiary: Yup.string()
    });

    const handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission logic here
        console.log(values);
        setSubmitting(false);
    };

    return (
        <>
            <div className="profile-container">
                <div className="profile-header">
                    <h2>User Profile</h2>
                </div>
                <Formik
                    initialValues={{
                        email: mockUserProfile.email,
                        mobileNumber: mockUserProfile.mobileNumber,
                        subsidiary: mockUserProfile.subsidiary
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="profile-details">
                            <div className="user-photo-container">
                                <img src={mockUserProfile.photoUrl ? mockUserProfile.photoUrl : dummyPhoto} alt="User Photo" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                {isEditing ? (
                                    <button onClick={() => setIsEditing(false)} >Save</button>
                                ) : (
                                    <button onClick={() => setIsEditing(true)}>Edit</button>
                                )}
                            </div>
                            <div>
                                <label>Name:</label>
                                <Field type="text" name="userName" value={mockUserProfile.userName} disabled={!isEditing} />
                            </div>
                            <div>
                                <label>Email:</label>
                                <Field type="text" name="email" disabled={!isEditing} />
                                {errors.email && touched.email && <div className="error">{errors.email}</div>}
                            </div>
                            <div>
                                <label>Mobile Number:</label>
                                <Field type="text" name="mobileNumber" disabled={!isEditing} />
                                {errors.mobileNumber && touched.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
                            </div>
                            <div>
                                <label>User Role:</label>
                                <Field type="text" name="userRole" value={mockUserProfile.userRole} disabled={!isEditing} />
                            </div>
                            <div>
                                <label>Brand:</label>
                                <span>
                                    <img src={mockUserProfile.brand.imageUrl} alt="Brand Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                                    <Field type="text" name="brand" value={mockUserProfile.brand.name} disabled={!isEditing} />
                                </span>
                            </div>
                            <div>
                                <label>Assigned By:</label>
                                <Field type="text" name="assignedBy" value={mockUserProfile.assignedBy.username} disabled={!isEditing} />
                            </div>
                            <div>
                                <label>Subsidiary:</label>
                                <Field type="text" name="subsidiary" disabled={!isEditing} />
                                {errors.subsidiary && touched.subsidiary && <div className="error">{errors.subsidiary}</div>}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Profile;
