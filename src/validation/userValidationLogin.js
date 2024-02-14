import * as Yup from 'yup';

export const userValidationLogin = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().min(8).required('Password is Required'),

});