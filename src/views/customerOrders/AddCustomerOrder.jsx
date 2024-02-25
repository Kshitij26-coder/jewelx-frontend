import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { orderValidation } from '../../validation/orderValidation';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PageTitle from '../../component/PageTitle';
import EditButton from '../../component/edit/EditButton';
import ButtonLoader from '../../component/loaders/ButtonLoader';

const CustomerOrder = ({ update }) => {
     const [isEditing, setIsEditing] = useState(update ? false : true);
     const [buttonLoader, setButtonLoader] = useState(false);
     const initialValues = {
          purity: '',
          articleDescription: '',
          metalRate: '',
          grossWeight: '',
          netWeight: '',
          orderStatus: '',
          fullfillDate: '',
          makingCharges: '',
          paidAmount: '',
          transactionType: '',
          transactionMode: '',
          fullAmount: '',
          cashAmount: '',
          netbankingUTR: '',
          netbankingAmount: '',
          chequeNo: '',
          chequeAmount: '',
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
     const calculateBalanceAmount = values => {
          const fullAmount = parseFloat(values.fullAmount) || 0;
          const paidAmount = parseFloat(values.paidAmount) || 0;
          return fullAmount - paidAmount;
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

     return (
          <div>
               <PageTitle title={update ? 'Update Order' : 'Customer Order'} back="/customer-orders" />
               <div className="container">
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         {update && <EditButton onClick={handleEdit} />}
                         <Formik initialValues={initialValues} enableReinitialize validationSchema={orderValidation} onSubmit={handleSubmit}>
                              {({ isSubmitting, values, setFieldValue }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4">Order information</h5>
                                        <div className="pl-md-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-purity">
                                                                 Purity
                                                            </label>
                                                            <Field
                                                                 type="number"
                                                                 className="form-control"
                                                                 id="input-purity"
                                                                 name="purity"
                                                                 placeholder=" Purity"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="purity" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-articleDescription">
                                                                 Article Description
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-articleDescription"
                                                                 name="articleDescription"
                                                                 placeholder="Article Description"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="articleDescription" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-metalRate">
                                                                 Metal Rate
                                                            </label>
                                                            <Field
                                                                 type="number"
                                                                 className="form-control"
                                                                 id="input-metalRate"
                                                                 name="metalRate"
                                                                 placeholder=" Metal Rate"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="metalRate" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-grossWeight">
                                                                 Gross Weight
                                                            </label>
                                                            <Field
                                                                 type="number"
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
                                                                 type="number"
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
                                                            <label className="form-control-label" htmlFor="input-orderStatus">
                                                                 Order Status
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-orderStatus"
                                                                 name="orderStatus"
                                                                 placeholder="Order Status"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="orderStatus" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-fullfillDate">
                                                                 Full Fill Date
                                                            </label>
                                                            <Field
                                                                 type="date"
                                                                 className="form-control"
                                                                 id="input-fullfillDate"
                                                                 name="fullfillDate"
                                                                 placeholder="Full Fill Date"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="fullfillDate" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-makingCharges">
                                                                 Making Charges
                                                            </label>
                                                            <Field
                                                                 type="number "
                                                                 className="form-control"
                                                                 id="input-makingCharges"
                                                                 name="makingCharges"
                                                                 placeholder="Making Charges"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="makingCharges" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <h5 className="heading-small text-muted mb-4">Payment information</h5>
                                        <div className="pl-md-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-fullAmount">
                                                                 Full Amount
                                                            </label>
                                                            <Field
                                                                 type="number "
                                                                 className="form-control"
                                                                 id="input-fullAmount"
                                                                 name="fullAmount"
                                                                 placeholder="Full Amount"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="fullAmount" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-paidAmount">
                                                                 Paid Amount (Advance Amount)
                                                            </label>
                                                            <Field
                                                                 type="number "
                                                                 className="form-control"
                                                                 id="input-paidAmount"
                                                                 name="paidAmount"
                                                                 placeholder="Paid Amount"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="paidAmount" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <hr style={{ width: '100%', background: '#1111' }} />

                                                  <div style={{ marginLeft: '3rem' }}>
                                                       <div className="form-group">
                                                            <h4>Balance Amount: {calculateBalanceAmount(values)}</h4>
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
                                                  <button type="submit" className="btn btn-block submit-button" disabled={buttonLoader}>
                                                       {buttonLoader ? <ButtonLoader /> : update ? 'Update Order' : 'Place An Order'}
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

export default CustomerOrder;
