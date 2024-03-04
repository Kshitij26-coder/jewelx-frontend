import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { subsidiaryMaintenenceValid } from '../../validation/subsidiaryMaintenenceValid';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { getRequest, postRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { getSubsidiaryMaintenanceByUUID } from '../../utils/apis/subsidiaryMaintenanceApiRequest';
import { maintenanceEndPoints } from '../../utils/endpoints/maintenanceEndPoints';
import { getIdFromUrl } from '../../utils/getIdFromUrl';
import EditButton from '../../component/edit/EditButton';

const AddSubsidiaryMaintain = ({ update }) => {
     const [isEditing, setIsEditing] = useState(update ? false : true);
     const navigate = useNavigate();
     const [cookie, setCookie] = useState(getCookiesObject());
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);

     const location = useLocation();
     const currentPath = location.pathname;

     const initialValues = {
          maintenanceDescription: '',
          transactionType: '',
          transactionMode: '',
          cashAmount: 0,
          netBankingUTR: 0,
          netBankingAmount: 0,
          chequeNo: 0,
          chequeAmount: 0,
     };
     const [data, setData] = useState(initialValues);
     const handleSubmit = async (values, { setSubmitting }) => {
          update ? await handleUpdateSubsidiaryMaintenace(values) : await handleAddSubsidiaryMaintenace(values);
     };

     const getSubsidiaryMaintenaceInfo = async id => {
          try {
               const data = await getRequest(getSubsidiaryMaintenanceByUUID(id), navigate, enqueueSnackbar);
               setData(data);
               // console.log(data);
          } catch (e) {
               console.error(e);
          }
     };

     const handleAddSubsidiaryMaintenace = async values => {
          try {
               setButtonLoader(true);
               const dto = {
                    ...values,
                    brandId: cookie.brandId,
                    userId: cookie.idxId,
                    subsidiaryId: cookie.subsidiaryId != null ? cookie.subsidiaryId : 1,
               };
               const data = await postRequest(dto, maintenanceEndPoints.BASE_ROUTE, navigate, enqueueSnackbar);
               showSuccessSnackbar('Subsidiary Added', enqueueSnackbar);
               setIsEditing(false);
               navigate('/maintenance');

               setButtonLoader(false);
          } catch (e) {
               setButtonLoader(false);
               console.error(e);
          }
     };

     const handleUpdateSubsidiaryMaintenace = async values => {
          try {
               setButtonLoader(true);
               const dto = {
                    ...values,
                    brandId: cookie.brandId,
                    userID: cookie.idxId,
                    subsidiaryId: cookie.subsidiaryId != null ? cookie.subsidiaryId : 1,
               };
               const data = await putRequest(getIdFromUrl(currentPath), dto, maintenanceEndPoints.BASE_ROUTE, navigate, enqueueSnackbar);
               //console.log(data);
               setIsEditing(false);
               navigate('/maintenance');
               setButtonLoader(false);
          } catch (e) {
               setButtonLoader(false);
               console.error(e);
          }
     };

     const handleEdit = () => {
          setIsEditing(true);
     };
     useEffect(() => {}, []);

     const calculateTotalAmount = values => {
          const cash = parseFloat(values.cashAmount) || 0;
          const netbanking = parseFloat(values.netbankingAmount) || 0;
          const cheque = parseFloat(values.chequeAmount) || 0;
          return cash + netbanking + cheque;
     };

     return (
          <div>
               <PageTitle title="Subsidiary Maintenance" back="/maintenance" />
               <div className="container">
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         {/* <IconButton onClick={handleEdit} aria-label="edit" style={{ marginLeft: '90%', fontSize: '1.5rem', borderRadius: 0 }}>
                              <EditIcon fontSize="medium" /> Edit
                         </IconButton> */}
                         {update && <EditButton onClick={handleEdit} />}
                         <Formik
                              initialValues={update ? data : initialValues}
                              enableReinitialize
                              validationSchema={subsidiaryMaintenenceValid}
                              onSubmit={handleAddSubsidiaryMaintenace}
                         >
                              {/* {({ isSubmitting, values, setFieldValue }) => ( */}
                              {({ isValid, values }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4">Maintenance information</h5>
                                        <div className="pl-md-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-maintenanceDescription">
                                                                 Maintenance Description
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-maintenanceDescription"
                                                                 name="maintenanceDescription"
                                                                 placeholder="Maintenance Description"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="maintenanceDescription" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-transactionType">
                                                                 Transaction Type
                                                            </label>
                                                            <Field
                                                                 as="select"
                                                                 className="form-control"
                                                                 id="input-transactionType"
                                                                 name="transactionType"
                                                                 disabled={!isEditing}
                                                            >
                                                                 <option value="">Select Transaction Type</option>
                                                                 <option value="c">Credit</option>
                                                                 <option value="d">Debit</option>
                                                            </Field>
                                                            <ErrorMessage name="transactionType" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-transactionMode">
                                                                 Transaction Mode
                                                            </label>
                                                            <Field
                                                                 as="select"
                                                                 className="form-control"
                                                                 id="input-transactionMode"
                                                                 name="transactionMode"
                                                                 disabled={!isEditing}
                                                            >
                                                                 <option value="">Select Transaction Mode</option>
                                                                 <option value="ca">Cash</option>
                                                                 <option value="on">Online</option>
                                                                 <option value="ch">Cheque</option>
                                                                 <option value="mp">Mixed Payment </option>
                                                            </Field>
                                                            <ErrorMessage name="transactionMode" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  {(values.transactionMode === 'mp' || values.transactionMode === 'ca') && (
                                                       <div className="col-lg-6">
                                                            <div className="form-group">
                                                                 <label className="form-control-label" htmlFor="input-cashAmount">
                                                                      Cash Amount
                                                                 </label>
                                                                 <Field
                                                                      type="number"
                                                                      className="form-control"
                                                                      id="input-cashAmount"
                                                                      name="cashAmount"
                                                                      placeholder="Cash Amount"
                                                                      disabled={!isEditing}
                                                                 />
                                                                 <ErrorMessage name="cashAmount" component="div" className="text-danger" />
                                                            </div>
                                                       </div>
                                                  )}
                                                  {(values.transactionMode === 'mp' || values.transactionMode === 'on') && (
                                                       <div className="col-lg-6">
                                                            <div className="form-group">
                                                                 <label className="form-control-label" htmlFor="input-netBankingUTR">
                                                                      Netbanking UTR
                                                                 </label>
                                                                 <Field
                                                                      className="form-control"
                                                                      id="input-netBankingUTR"
                                                                      name="netBankingUTR"
                                                                      placeholder="Netbanking UTR"
                                                                      disabled={!isEditing}
                                                                 />
                                                                 <ErrorMessage name="netBankingUTR" component="div" className="text-danger" />
                                                            </div>
                                                            <div className="form-group">
                                                                 <label className="form-control-label" htmlFor="input-netBankingAmount">
                                                                      Netbanking Amount
                                                                 </label>
                                                                 <Field
                                                                      type="number"
                                                                      className="form-control"
                                                                      id="input-netBankingAmount"
                                                                      name="netBankingAmount"
                                                                      placeholder="Netbanking Amount"
                                                                      disabled={!isEditing}
                                                                 />
                                                                 <ErrorMessage name="netBankingAmount" component="div" className="text-danger" />
                                                            </div>
                                                       </div>
                                                  )}
                                                  {(values.transactionMode === 'mp' || values.transactionMode === 'ch') && (
                                                       <div className="col-lg-6">
                                                            <div className="form-group">
                                                                 <label className="form-control-label" htmlFor="input-chequeNo">
                                                                      Cheque No
                                                                 </label>
                                                                 <Field
                                                                      className="form-control"
                                                                      id="input-chequeNo"
                                                                      name="chequeNo"
                                                                      placeholder="Cheque No"
                                                                      disabled={!isEditing}
                                                                 />
                                                                 <ErrorMessage name="chequeNo" component="div" className="text-danger" />
                                                            </div>
                                                            <div className="form-group">
                                                                 <label className="form-control-label" htmlFor="input-chequeAmount">
                                                                      Cheque Amount
                                                                 </label>
                                                                 <Field
                                                                      type="number"
                                                                      className="form-control"
                                                                      id="input-chequeAmount"
                                                                      name="chequeAmount"
                                                                      placeholder="Cheque Amount"
                                                                      disabled={!isEditing}
                                                                 />
                                                                 <ErrorMessage name="chequeAmount" component="div" className="text-danger" />
                                                            </div>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                        <hr style={{ width: '100%', background: '#1111' }} />
                                        <div className="col-lg-6">
                                             <div className="form-group">
                                                  <h3>Total Amount: {calculateTotalAmount(values)}</h3>
                                             </div>
                                        </div>
                                        {isEditing && (
                                             <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                  {/* <button type="submit" className="btn btn-block submit-button" disabled={isSubmitting}> */}
                                                  {/* Submit
                                                  </button> */}
                                                  <button type="submit" className="btn btn-block submit-button">
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

export default AddSubsidiaryMaintain;
