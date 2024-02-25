import * as Yup from 'yup';

export const customerValidationSchema = Yup.object().shape({
     name: Yup.string().required('Name is required'),
     pincode: Yup.string()
          .required('Pincode is required')
          .matches(/^[0-9]+$/, 'Pincode must only contain numbers')
          .length(6, 'Pincode must be exactly 6 characters long'),
     address: Yup.string().required('Address is required'),
     aadharId: Yup.string()
          .required('Aadhar ID is required')
          .matches(/^[0-9]+$/, 'Aadhar ID must only contain numbers')
          .length(12, 'Aadhar ID must be exactly 12 characters long'),
     panId: Yup.string()
          .required('PAN ID is required')
          .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN ID'),
     mobileNumber: Yup.string()
          .required('Mobile Number is required')
          .matches(/^[0-9]{10}$/, 'Mobile Number must be exactly 10 digits long'),
     dateOfBirth: Yup.date().required('Date of Birth is required'),
     openingBalance: Yup.number().required('Opening Balance is required'),
});
