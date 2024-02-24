import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { articleValidation } from '../../validation/articleValidation';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import EditButton from '../../component/edit/EditButton';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { postRequest } from '../../utils/apis/apiRequestHelper';
import { metalEndPoints } from '../../utils/endpoints/metalEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ButtonLoader from '../../component/loaders/ButtonLoader';

const Article = ({ update }) => {
     const [isEditing, setIsEditing] = useState(update ? false : true);
     const navigate = useNavigate();
     const [cookies, setCookies] = useState(getCookiesObject());
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);
     const [articleData, setArticleData] = useState();

     const initialValues = {
          articleName: '',
          grossWeight: '',
          netWeight: '',
          purity: '',
          stoneWeight: '',
          huid: '',
          category: '',
     };

     const submitHandler = async values => {
          update ? await handleSubmit(values, getIdFromUrl(currentPath)) : await handleAddUom(values);
     };

     const handleSubmit = async (values, { setSubmitting }) => {
          try {
               setButtonLoader(true);
               const dto = { ...values, subsidiaryId: '', userID: cookies.idxId };
               const data = await postRequest(dto, metalEndPoints.BASE_URL, navigate, enqueueSnackbar);
               setSubmitting(false);
               setIsEditing(false);
               //console.log(values);
               showSuccessSnackbar(data, enqueueSnackbar);
               setButtonLoader(false);
          } catch (e) {
               console.log(e);
               setButtonLoader(false);
          }
     };

     const handleEdit = () => {
          setIsEditing(true);
     };
     useEffect(() => {}, []);

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
                              onSubmit={handleSubmit}
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
                                                                 <option value="Category 1">Category 1</option>
                                                                 <option value="Category 2">Category 2</option>
                                                                 <option value="Category 3">Category 3</option>
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

export default Article;
