import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
     email: Yup.string().email('Invalid email').required('Email is Required'),
     userName: Yup.string().required('Full Name is Required'),
     mobileNumber: Yup.number()
          .typeError('Should be a number')
          .required('Mobile number is Required')
          .test('len', 'Mobile number must be exactly 10 digits', val => val && val.toString().length === 10),
     userRole: Yup.string().required('UserType  is Required'),
     password: Yup.string().min(8).required('Password is Required'),
     brandName: Yup.string().required('Brand is Required'),
     brandDescription: Yup.string().required('Brand Description is Required'),
     confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
});
