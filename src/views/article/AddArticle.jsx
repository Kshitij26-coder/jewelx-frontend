import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { articleValidation } from '../../validation/articleValidation';
import '../../styles/style.css';
import EditButton from '../../component/edit/EditButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { getRequest, postRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { getAllCategoriesById } from '../../utils/apis/itemCategoryApiRequest';
import { articleEndpoints } from '../../utils/endpoints/articleStockEndpoints';
import { getArticleByIdEndpoint } from '../../utils/apis/articleStockApiRequests';

const AddArticle = ({ update }) => {
     const [isEditing, setIsEditing] = useState(update ? false : true);
     const navigate = useNavigate();
     const [cookies, setCookies] = useState(getCookiesObject());
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);
     const [articleData, setArticleData] = useState();
     const [categories, setCategories] = useState([]);

     const location = useLocation();
     const currentPath = location.pathname;

     const initialValues = {
          articleName: '',
          grossWeight: '',
          netWeight: '',
          purity: '',
          stoneWeight: '',
          huid: '',
          category: '',
     };

     /**
      *
      * @param {*} values
      * used to submit the data of form
      */
     const submitHandler = async values => {
          update ? await handleUpdate(values, getIdFromUrl(currentPath)) : await handleAdd(values);
     };

     /**
      *
      * @param {*} id
      * get article data by id
      */
     const getArticleData = async id => {
          try {
               const data = await getRequest(getArticleByIdEndpoint(id), navigate, enqueueSnackbar);
               console.log(data);
               setArticleData(data);
          } catch (e) {
               console.log(e);
          }
     };

     /**
      *
      * @param {*} values
      * used add vlaues to db
      */
     //remove deafualt 1 this page is only for admin and employee
     const handleAdd = async values => {
          try {
               setButtonLoader(true);
               const dto = {
                    ...values,
                    subsidiaryId: cookies.subsidiaryId ? cookies.subsidiaryId : 1,
                    userIdx: cookies.idxId,
                    brandId: cookies.brandId,
               };
               const data = await postRequest(dto, articleEndpoints.BASE_ROUTE, navigate, enqueueSnackbar);
               setIsEditing(false);
               showSuccessSnackbar(data, enqueueSnackbar);
               setButtonLoader(false);
               navigate('/article');
          } catch (e) {
               console.log(e);
               setButtonLoader(false);
          }
     };
     /**
      *
      * @param {*} values
      * @param {Number} id
      * used to handle update
      */
     const handleUpdate = async (values, id) => {
          try {
               setButtonLoader(true);
               const dto = {
                    ...values,
                    subsidiaryId: cookies.subsidiaryId ? cookies.subsidiaryId : 1,
                    userIdx: cookies.idxId,
                    brandId: cookies.brandId,
               };
               const data = await putRequest(id, dto, articleEndpoints.BASE_ROUTE, navigate, enqueueSnackbar);
               setIsEditing(false);
               setButtonLoader(false);
               navigate('/article');
          } catch (e) {
               console.log(e);
               setButtonLoader(false);
          }
     };

     /**
      * Used to get all cotegories data to create option for select
      */
     const getAllCategories = async () => {
          try {
               const data = await getRequest(getAllCategoriesById(), navigate, enqueueSnackbar);
               setCategories(data);
               console.log(data);
          } catch (e) {
               console.log(e);
          }
     };

     /**
      * Used to set is eddding true
      */
     const handleEdit = () => {
          setIsEditing(true);
     };

     /**
      *
      * @param {string} url
      * @returns
      */
     const getIdFromUrl = url => {
          const parts = url.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart;
     };

     useEffect(() => {
          getAllCategories();
          update && getArticleData(getIdFromUrl(currentPath));
     }, []);

     return (
          <div>
               <PageTitle title={update ? 'Update Article Stock' : 'Add Article Stock'} />
               <div className="container">
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         {update && <EditButton onClick={handleEdit} />}
                         <Formik
                              initialValues={update ? articleData : initialValues}
                              enableReinitialize
                              validationSchema={articleValidation}
                              onSubmit={submitHandler}
                         >
                              {({ isSubmitting }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4">Article Stock information</h5>
                                        <div className="pl-md-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-articleName">
                                                                 Article Name
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-articleName"
                                                                 name="articleName"
                                                                 placeholder="Article Name"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="articleName" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-grossWeight">
                                                                 Gross Weight
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-grossWeight"
                                                                 name="grossWeight"
                                                                 placeholder="Gross Weight"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="grossWeight" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-netWeight">
                                                                 Net Weight
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-netWeight"
                                                                 name="netWeight"
                                                                 placeholder="Net Weight"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="netWeight" component="div" className="text-danger" />
                                                       </div>
                                                  </div>

                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-stoneWeight">
                                                                 Stone Weight
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-stoneWeight"
                                                                 name="stoneWeight"
                                                                 placeholder=" Stone Weight"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="stoneWeight" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-purity">
                                                                 Purity
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-purity"
                                                                 name="purity"
                                                                 placeholder="Purity"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="purity" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-huid">
                                                                 Huid
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-huid"
                                                                 name="huid"
                                                                 placeholder="Huid"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="huid" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-category">
                                                                 Category
                                                            </label>
                                                            <Field
                                                                 as="select"
                                                                 className="form-control"
                                                                 id="input-category"
                                                                 name="category"
                                                                 disabled={!isEditing}
                                                            >
                                                                 <option value="">Select Category</option>
                                                                 {categories.length > 0 &&
                                                                      categories.map((each, index) => (
                                                                           <>
                                                                                <option key={index} value={each.id}>
                                                                                     {each.categoryName}
                                                                                </option>
                                                                           </>
                                                                      ))}
                                                            </Field>
                                                            <ErrorMessage name="category" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        {isEditing && (
                                             <>
                                                  <hr style={{ width: '100%', background: '#1111' }} />
                                                  <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                       <button type="submit" className="btn btn-block submit-button" disabled={isSubmitting}>
                                                            {buttonLoader ? <ButtonLoader /> : update ? 'Update' : 'Add'}
                                                       </button>
                                                  </div>
                                             </>
                                        )}
                                   </Form>
                              )}
                         </Formik>
                    </div>
               </div>
          </div>
     );
};

export default AddArticle;
