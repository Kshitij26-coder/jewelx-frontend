import * as Yup from 'yup';

export const articleValidation = Yup.object().shape({
     articleName: Yup.string().required('Article Name is required'),
     grossWeight: Yup.number().required('Gross Weight is required'),
     netWeight: Yup.number().required('Net Weight is required'),
     stoneWeight: Yup.number().required('Stone Weight is required'),
     category: Yup.string().required('Category is required'),
});
