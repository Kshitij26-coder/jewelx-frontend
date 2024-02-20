import * as Yup from 'yup';

export const profilevalidation = Yup.object().shape({
     name: Yup.string().required('Name is required'),
     email: Yup.string().email('Invalid email').required('Email is Required'),
     mobileno: Yup.number()
          .typeError('Should be a number')
          .required('Mobile number is Required')
          .test('len', 'Mobile number must be exactly 10 digits', val => val && val.toString().length === 10),
     userrole: Yup.string().required('User Role is required'),
     brand: Yup.string(),
     subsidary: Yup.string().required('Subsidiary is required'),
     address: Yup.string().required('Address is required'),
     city: Yup.string().required('City is required'),
     country: Yup.string().required('Country is required'),
     postalCode: Yup.string().required('Postal code is required'),
     aboutMe: Yup.string(),
});
