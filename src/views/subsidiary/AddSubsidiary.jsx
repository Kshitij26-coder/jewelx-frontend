import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../styles/style.css';
import { getCookiesObject } from '../../utils/getCookiesObject';
import PageTitle from '../../component/PageTitle';
import { subsidiaryValidationSchema } from '../../validation/subsidiaryValidationSchema';
import { getRequest, postRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { subsidiaryEndPoints } from '../../utils/endpoints/subsidiaryEndPoints';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { showSuccessSnackbar } from '../../utils/snackBar';
import EditButton from '../../component/edit/EditButton';
import { getSubsidiaryByUuidEndpoint } from '../../utils/apis/subsidiaryApiRequests';

const AddSubsidiary = ({ update }) => {
     const [isEditing, setIsEditing] = useState(update ? false : true);
     const [formData, setFormData] = useState(null);
     const [cookies, setCookies] = useState(getCookiesObject());
     const [buttonLoader, setButtonLoader] = useState(false);
     //const [initialValues, setInitialValues] = useState({});
     const [subsidiaryInfo, setSubsidiaryInfo] = useState({});
     /**
      * here uselocation is the Hook Used For getting the Current Url
      */
     const location = useLocation();
     const currentPath = location.pathname;

     const initialValues = {
          shopActNumber: '',
          subsidiaryName: '',
          gstin: '',
          cashBalance: '',
          address: '',
          city: '',
          pinCode: '',
          logoUrl: '',
          formHeader: '',
          formFooter: '',
     };

     let navigate = useNavigate();
     let { enqueueSnackbar } = useSnackbar();

     /**
      *
      * @param {*} values
      * @param {*} param1
      * used for submit handling using ternary
      * if update update will be seen if add add wwill be seen
      */
     const handleSubmit = async (values, { setSubmitting }) => {
          update ? await handleUpdateSubsidiary(values) : await handleAddSubsidiary(values, { setSubmitting });
     };

     /**
      *
      * @param {*} values
      * Used For Update Subsidiary in Database
      */
     const handleUpdateSubsidiary = async values => {
          try {
               setButtonLoader(true);
               const dto = { ...values, brandId: cookies.brandId, userIdxId: cookies.idxId };
               await putRequest(getUuidFromUrl(currentPath), dto, subsidiaryEndPoints.BASE_URL, navigate, enqueueSnackbar);
               setIsEditing(false);
               navigate('/subsidiary');
               setButtonLoader(false);
          } catch (e) {
               setButtonLoader(false);
               console.log(e);
          }
     };
     /**
      *
      * @param {String} subsidiaryId
      * Used For GetRequest Subsidiary
      */
     const getSubsidiaryDataById = async subsidiaryId => {
          try {
               const data = await getRequest(getSubsidiaryByUuidEndpoint(subsidiaryEndPoints.BASE_URL, subsidiaryId), navigate, enqueueSnackbar);
               // console.log(data);
               setSubsidiaryInfo(data);
          } catch (e) {
               console.log(e);
          }
     };
     /**
      *
      * @param {*} values
      * Used For Adding Subsidiary In Database
      */
     const handleAddSubsidiary = async (values, { setSubmitting }) => {
          try {
               setButtonLoader(true);
               const dto = { ...values, brandId: cookies.brandId, userIdxId: cookies.idxId };
               const data = await postRequest(dto, subsidiaryEndPoints.BASE_URL, navigate, enqueueSnackbar);
               showSuccessSnackbar(data, enqueueSnackbar);
               setIsEditing(false);
               navigate('/subsidiary');

               setButtonLoader(false);
          } catch (e) {
               setButtonLoader(false);
               console.log(e);
          }
     };
     /**
      * Editing is Handled here
      */
     const handleEdit = () => {
          setIsEditing(true);
     };
     /**
      *
      * @param {String} url
      * used For Getting the Last Part Of the Current url
      * @returns
      * will Return the last part  using split
      */
     const getUuidFromUrl = url => {
          const parts = url.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart;
     };
     useEffect(() => {
          if (currentPath !== '/subsidiary/add') getSubsidiaryDataById(getUuidFromUrl(currentPath));
     }, []);

     return (
          <div>
               <PageTitle title={update ? 'Update Subsidiary' : 'Add Subsidiary'} back="/subsidiary" />
               <div className="container" style={{ padding: '3rem' }}>
                    <div className="w-100 p-5 card " style={{ padding: '20px' }}>
                         {update && <EditButton onClick={handleEdit} />}
                         <Formik
                              initialValues={update ? subsidiaryInfo : initialValues}
                              enableReinitialize
                              validationSchema={subsidiaryValidationSchema}
                              onSubmit={handleSubmit}
                         >
                              {({ isSubmitting, setFieldValue }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4 ">Subsidiary information</h5>
                                        <div className="pl-md-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-shopActNumber">
                                                                 Shop Act Number
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-shopActNumber"
                                                                 name="shopActNumber"
                                                                 placeholder="Shop Act Number"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="shopActNumber" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-subsidiaryName">
                                                                 Subsidiary Name
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-name"
                                                                 name="subsidiaryName"
                                                                 placeholder="Subsidiary Name"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="subsidiaryName" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-gstin">
                                                                 GST Number
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-gstin"
                                                                 name="gstin"
                                                                 placeholder="GST Number"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="gstin" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-cashBalance">
                                                                 Cash Balance
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-cashBalance"
                                                                 name="cashBalance"
                                                                 placeholder="Cash Balance"
                                                                 disabled={!isEditing}
                                                                 type="number"
                                                                 onChange={e => setFieldValue('cashBalance', Number(e.target.value))}
                                                            />
                                                            <ErrorMessage name="cashBalance" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-address">
                                                                 Address
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-address"
                                                                 name="address"
                                                                 placeholder="Address"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="address" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-city">
                                                                 City
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-city"
                                                                 name="city"
                                                                 placeholder="City"
                                                                 disabled={!isEditing}
                                                            ></Field>
                                                            <ErrorMessage name="city" component="div" className="text-danger" />
                                                       </div>
                                                  </div>

                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-pinCode">
                                                                 Pin Code
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-pinCode"
                                                                 name="pinCode"
                                                                 placeholder="Pin Code"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="pinCode" component="div" className="text-danger" />
                                                       </div>
                                                  </div>

                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-logoUrl">
                                                                 Logo URL
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-logoUrl"
                                                                 name="logoUrl"
                                                                 placeholder="Logo Url"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="logoUrl" component="div" className="text-danger" />
                                                       </div>
                                                  </div>

                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-formHeader">
                                                                 Form Header
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-formHeader"
                                                                 name="formHeader"
                                                                 placeholder="Form Header"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="formHeader" component="div" className="text-danger" />
                                                       </div>
                                                  </div>

                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-formFooter">
                                                                 Form Footer
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-formFooter"
                                                                 name="formFooter"
                                                                 placeholder="Form formFooter"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="formFooter" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <hr style={{ width: '100%', background: '#1111' }} />
                                        {/* Submit button */}
                                        {isEditing && (
                                             <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                  <button type="submit" className="btn btn-block submit-button" disabled={buttonLoader}>
                                                       {buttonLoader ? <ButtonLoader /> : update ? 'Update' : 'Add'}
                                                  </button>
                                             </div>
                                        )}
                                   </Form>
                              )}
                         </Formik>
                    </div>
               </div>
          </div>
     );
};

export default AddSubsidiary;
