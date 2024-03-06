import * as Yup from 'yup';

export const articleCategoryValidationSchema = Yup.object().shape({
     metalId: Yup.string().required('MetalName Name is required'),
     categoryName: Yup.string().required('Category is required'),
});
