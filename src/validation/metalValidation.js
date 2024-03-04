import * as Yup from 'yup';

export const metalValidation = Yup.object().shape({
     metalName: Yup.string().required('Metal Name is required'),
     metalRate: Yup.number().required('Metal Rate is required'),
     metalDescription: Yup.string().required('Metal Description is required'),
});
