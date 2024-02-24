import * as Yup from 'yup';

export const feedbackValidation = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    mobile: Yup.string()
        .matches(/^[0-9]+$/, 'Invalid phone number')
        .min(10, 'Mobile number must be at least 10 digits')
        .required('Mobile is required'),
    description: Yup.string()
        .required('Description is required')
});
