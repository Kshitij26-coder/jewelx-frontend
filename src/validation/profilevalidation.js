import * as Yup from 'yup';

export const profilevalidation = Yup.object().shape({
     userName: Yup.string().required('Name is required'),
     brand: Yup.string().required('Brand Name is required'),
     mobileNumber: Yup.number()
          .typeError('Should be a number')
          .required('Mobile number is Required')
          .test('len', 'Mobile number must be exactly 10 digits', val => val && val.toString().length === 10),
});
