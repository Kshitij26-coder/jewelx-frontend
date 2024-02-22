import * as Yup from 'yup';

export const profilevalidation = Yup.object().shape({
     userName: Yup.string().required('Name is required'),
     email: Yup.string().email('Invalid email').required('Email is Required'),
     mobileno: Yup.number()
          .typeError('Should be a number')
          .required('Mobile number is Required')
          .test('len', 'Mobile number must be exactly 10 digits', val => val && val.toString().length === 10),
     userRole: Yup.string().required('User Role is required'),
     subsidiary: Yup.string().required('Subsidiary is required'),
});