import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { metalValidation } from '../../validation/metalValidation';
import '../../styles/style.css';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { getRequest, postRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { metalEndPoints } from '../../utils/endpoints/metalEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import EditButton from '../../component/edit/EditButton';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { getMetalByMetalId } from '../../utils/apis/metalApiRequest';

const MetalAdd = ({ update }) => {
     const [isEditing, setIsEditing] = useState(update ? false : true);
     const navigate = useNavigate();
     const [cookies, setCookies] = useState(getCookiesObject());
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);
     const [data, setData] = useState();
     const initialValues = {
          metalName: '',
          metalRate: '',
          metalDescription: '',
     };

     /**
      *
      * @param {*} values
      *
      */
     const handleSubmit = async values => {
          update ? await handleUpdateMetal(values) : await handleAddMetal(values);
     };

     /**
      *
      * @param {*} values
      * used For Adding Metal in Database
      */
     const handleAddMetal = async values => {
          try {
               setButtonLoader(true);
               const dto = { ...values, brandId: cookies.brandId, userID: cookies.idxId };
               const data = await postRequest(dto, metalEndPoints.BASE_URL, navigate, enqueueSnackbar);
               setIsEditing(false);
               showSuccessSnackbar(data, enqueueSnackbar);
               //navifate to metal page
               setButtonLoader(false);
          } catch (e) {
               console.log(e);
               setButtonLoader(false);
          }
     };
     /**
      *
      * @param {*} values
      * used for update Metal in Database
      */
     const handleUpdateMetal = async values => {
          try {
               setButtonLoader(true);
               const dto = { ...values, brandId: cookies.brandId, userID: cookies.idxId };
               const data = await putRequest(1, dto, metalEndPoints.BASE_URL, navigate, enqueueSnackbar);
               setIsEditing(false);
               setButtonLoader(false);
          } catch (e) {
               setButtonLoader(false);
               console.log(e);
          }
     };

     /**
      * @param {string} values
      * used to populate the update form
      */
     const getMetalByBrand = async metalId => {
          try {
               const apiData = await getRequest(getMetalByMetalId(metalId), navigate, enqueueSnackbar);
               setData(apiData);
          } catch (error) {
               console.log(error);
          }
     };
     /**
      * used To toogle editing state
      */
     const handleEdit = () => {
          setIsEditing(true);
     };
     useEffect(() => {
          getMetalByBrand(1);
     }, []);

     return (
          <div>
               <PageTitle title={update ? 'Update Metals' : 'Add Metals'} />
               <div className="container" style={{ paddingtop: '1.5rem' }}>
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         {update && <EditButton onClick={handleEdit} />}
                         <Formik
                              initialValues={update ? data : initialValues}
                              enableReinitialize
                              validationSchema={metalValidation}
                              onSubmit={handleSubmit}
                         >
                              {({ isSubmitting }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4 ">Metal information</h5>
                                        <div className="pl-md-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-metalName">
                                                                 Metal Name
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-metalName"
                                                                 name="metalName"
                                                                 placeholder="Metal Name"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="metalName" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-metalRate">
                                                                 Metal Rate
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-metalRate"
                                                                 name="metalRate"
                                                                 placeholder="Metal Rate"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="metalRate" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-metalDescription">
                                                                 Metal Description
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-metalDescription"
                                                                 name="metalDescription"
                                                                 placeholder=" Metal Description"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="metalDescription" component="div" className="text-danger" />
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

export default MetalAdd;
