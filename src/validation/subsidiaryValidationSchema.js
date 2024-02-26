import * as Yup from 'yup';

export const subsidiaryValidationSchema = Yup.object().shape({
     shopActNumber: Yup.number().required('Shop ACT licence is required'),
     subsidiaryName: Yup.string().required('Subsidiary Name is Required'),
     gstin: Yup.string().required('GST Number is Required'),
     // cashBalance: Yup.number().typeError('Should be a number').required('Cash Balance is Required'),
     address: Yup.string().required('Address is Required'),
     city: Yup.string().required('City is required'),
     logoUrl: Yup.string().required('logo url is required'),
     pinCode: Yup.number()
          .typeError('Pincode should be a number')
          .test('len', 'Pincode must be exactly 6 digits', val => val && val.toString().length === 6)
          .required('Pincode is required'),
});
