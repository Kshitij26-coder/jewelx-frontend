import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { roles } from '../../utils/roles';
import { getRolesfromAbbrev } from '../../utils/getRolesfromAbbrev';
import PageTitle from '../../component/PageTitle';
import { subsidiaryValidationSchema } from '../../validation/subsidiaryValidationSchema';
import { postRequest } from '../../utils/apis/apiRequestHelper';
import { subsidiaryEndPoints } from '../../utils/endpoints/subsidiaryEndPoints';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { showSuccessSnackbar } from '../../utils/snackBar';

const AddSubsidiary = () => {
     const [isEditing, setIsEditing] = useState(false);
     const [formData, setFormData] = useState(null);
     const [cookies, setCookies] = useState({});
     const [buttonLoader, setButtonLoader] = useState(false);
     //const [initialValues, setInitialValues] = useState({});

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

     const handleSubmit = async (values, { setSubmitting }) => {
          // Handle form submission
          try {
               setButtonLoader(true);
               const dto = { ...values, brandId: cookies.brandId, userIdxId: cookies.idxId };
               const data = await postRequest(dto, subsidiaryEndPoints.BASE_URL, navigate, enqueueSnackbar);
               showSuccessSnackbar(data, enqueueSnackbar);
          } catch (e) {
               setButtonLoader(false);
               console.log(e);
          }

          setIsEditing(false);
     };

     const handleLogout = () => {
          // Handle logout functionality
          console.log('Logged out');
     };

     const handleEdit = () => {
          // Handle edit functionality
          setIsEditing(true);
     };
     useEffect(() => {
          setCookies(getCookiesObject());
          //  console.log(getCookiesObject());
     }, []);

     return (
          <div>
               <PageTitle title={'Subsidiary'} />
               <div className="container">
                    <div className="w-100 p-5 card " style={{ padding: '20px' }}>
                         <IconButton onClick={handleEdit} aria-label="edit" style={{ marginLeft: '90%' }}>
                              <EditIcon />
                         </IconButton>
                         <Formik
                              initialValues={initialValues}
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
                                        {/* Submit button */}
                                        {isEditing && (
                                             <button type="submit" className="btn btn-primary btn-lg " disabled={false}>
                                                  {buttonLoader ? <ButtonLoader /> : 'Submit'}
                                             </button>
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
