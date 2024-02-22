import * as Yup from 'yup';

export const uomValidationSchema = Yup.object().shape({
     uomName: Yup.string().max(30).required('Unit Name is Required'),
     uomCode: Yup.string().max(3).required('Unit Code is Required'),
     description: Yup.string().required('Description is Required'),
});
