import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { subsidiaryMaintenenceValid } from '../../validation/subsidiaryMaintenenceValid';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { postRequest } from '../../utils/apis/apiRequestHelper';
import { metalEndPoints } from '../../utils/endpoints/metalEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ButtonLoader from '../../component/loaders/ButtonLoader';

const SubsidiaryMaintain = () => {
     const [isEditing, setIsEditing] = useState(false);
     const navigate = useNavigate();
     const [cookies, setCookies] = useState({});
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);

     const initialValues = {
          maintenanceDescription: '',
          transactionType: '',
          transactionMode: '',
          cashAmount: '',
          netbankingUTR: '',
          netbankingAmount: '',
          chequeNo: '',
          chequeAmount: '',
     };

     const handleSubmit = async (values, { setSubmitting }) => {
          try {
               setButtonLoader(true);
               const dto = { ...values, subsidiaryId: '', userID: cookies.idxId };
               const data = await postRequest(dto, metalEndPoints.BASE_URL, navigate, enqueueSnackbar);
               setSubmitting(false);
               setIsEditing(false);
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

     const calculateTotalAmount = values => {
          const cash = parseFloat(values.cashAmount) || 0;
          const netbanking = parseFloat(values.netbankingAmount) || 0;
          const cheque = parseFloat(values.chequeAmount) || 0;
          return cash + netbanking + cheque;
     };
     useEffect(() => {
          setCookies(getCookiesObject());
     }, []);

     return (
          <div>
               <PageTitle title="Subsidiary Maintenance" />
               <div className="container">
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         <IconButton onClick={handleEdit} aria-label="edit" style={{ marginLeft: '90%', fontSize: '1.5rem', borderRadius: 0 }}>
                              <EditIcon fontSize="medium" /> Edit
                         </IconButton>
                         <Formik
                              initialValues={initialValues}
                              enableReinitialize
                              validationSchema={subsidiaryMaintenenceValid}
                              onSubmit={handleSubmit}
                         >
                              {({ isSubmitting, values, setFieldValue }) => (
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
                                                                 <option value="cr">Credit</option>
                                                                 <option value="db">Debit</option>
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
                                                                 <option value="Cash">Cash</option>
                                                                 <option value="Online">Online</option>
                                                                 <option value="Cheque">Cheque</option>
                                                                 <option value="All Mode">All Mode</option>
                                                            </Field>
                                                            <ErrorMessage name="transactionMode" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  {(values.transactionMode === 'All Mode' || values.transactionMode === 'Cash') && (
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
                                                  {(values.transactionMode === 'All Mode' || values.transactionMode === 'Online') && (
                                                       <div className="col-lg-6">
                                                            <div className="form-group">
                                                                 <label className="form-control-label" htmlFor="input-netbankingUTR">
                                                                      Netbanking UTR
                                                                 </label>
                                                                 <Field
                                                                      className="form-control"
                                                                      id="input-netbankingUTR"
                                                                      name="netbankingUTR"
                                                                      placeholder="Netbanking UTR"
                                                                      disabled={!isEditing}
                                                                 />
                                                                 <ErrorMessage name="netbankingUTR" component="div" className="text-danger" />
                                                            </div>
                                                            <div className="form-group">
                                                                 <label className="form-control-label" htmlFor="input-netbankingAmount">
                                                                      Netbanking Amount
                                                                 </label>
                                                                 <Field
                                                                      type="number"
                                                                      className="form-control"
                                                                      id="input-netbankingAmount"
                                                                      name="netbankingAmount"
                                                                      placeholder="Netbanking Amount"
                                                                      disabled={!isEditing}
                                                                 />
                                                                 <ErrorMessage name="netbankingAmount" component="div" className="text-danger" />
                                                            </div>
                                                       </div>
                                                  )}
                                                  {(values.transactionMode === 'All Mode' || values.transactionMode === 'Cheque') && (
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
                                                  <button type="submit" className="btn btn-block submit-button" disabled={isSubmitting}>
                                                       Submit
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

export default SubsidiaryMaintain;
