import * as Yup from 'yup';

export const articleValidation = Yup.object().shape({
     articleName: Yup.string().required('Article Name is required'),
     grossWeight: Yup.number().required('Gross Weight is required'),
     netWeight: Yup.number().required('Net Weight is required'),
     stoneWeight: Yup.number().required('Stone Weight is required'),
     category: Yup.string().required('Category is required'),
     huid: Yup.number()
          .typeError('HUID must be a number')
          .positive('HUID must be a positive number')
          .integer('HUID must be an integer')
          .max(999999, 'HUID must be at most 6 digits')
          .required('HUID is required'),
     purity: Yup.number().typeError('Purity must be a number').required('Purity is required'),
});
