import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    uname: Yup.string().required('Full Name is Required'),
    mobno: Yup.number("Should be number").max(10).required('Mobno is Required'),
    userType: Yup.string().required('UserType  is Required'),
    password: Yup.string().min(8).required('Password is Required'),
    brand: Yup.string().required('Brand is Required'),
    cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});