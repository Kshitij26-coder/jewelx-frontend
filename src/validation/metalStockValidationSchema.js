import * as Yup from 'yup';

export const metalStockValidationSchema = Yup.object().shape({
     metalId: Yup.string().required('Metal is required'),
     weight: Yup.number().required('Weight is required'),
     uom: Yup.string().required('Unit of measeurement is required'),
});
