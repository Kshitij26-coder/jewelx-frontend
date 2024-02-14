import * as Yup from 'yup';

export const userValidationRegister = Yup.object().shape({
     name: Yup.string().required('Name is Required'),
     email: Yup.string().email('Invalid email').required('Email is Required'),
});
