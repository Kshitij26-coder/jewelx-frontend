import React, { useEffect, useState } from 'react';
import PageTitle from '../../component/PageTitle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { purchaseUserValidation } from '../../validation/purchaseUserValidation';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const PurchaseUser = () => {
     const [isEditing, setIsEditing] = useState(false);

     const initialValues = {
          articleDescription: '',
          grossWeight: '',
          netWeight: '',
          purity: '',
          metalRate: '',
          totalAmount: 0,
          transactionType: '',
          transactionMode: '',
          cashAmount: '',
          netbankingUTR: '',
          netbankingAmount: '',
          chequeNo: '',
          chequeAmount: '',
     };
     const handleEdit = () => {
          setIsEditing(true);
     };

     return (
          <div>
               <PageTitle title={'User Purchase '} />
               <div className="container">
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         <IconButton onClick={handleEdit} aria-label="edit" style={{ marginLeft: '90%', fontSize: '1.5rem', borderRadius: 0 }}>
                              <EditIcon fontSize="medium" /> Edit
                         </IconButton>
                         <Formik
                              initialValues={initialValues}
                              enableReinitialize
                              validationSchema={purchaseUserValidation}
                              onSubmit={values => {
                                   handleSubmit(values);
                              }}
                         >
                              {({ isSubmitting, setFieldValue, values }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4">Purchase information</h5>
                                        <div className="row">
                                             <div className="col-md-6">
                                                  <div className="form-group">
                                                       <label className="form-control-label" htmlFor="input-articleDescription">
                                                            Article Description
                                                       </label>
                                                       <Field
                                                            className="form-control"
                                                            id="articleDescription"
                                                            placeholder="Article Description"
                                                            name="articleDescription"
                                                            disabled={!isEditing}
                                                       ></Field>
                                                       <ErrorMessage name="articleDescription" component="div" className="text-danger" />
                                                  </div>
                                             </div>
                                             <div className="col-lg-6">
                                                  <div className="form-group">
                                                       <label className="form-control-label" htmlFor="input-grossWeight">
                                                            Gross Weight Details
                                                       </label>
                                                       <Field
                                                            type="number"
                                                            className="form-control"
                                                            id="grossWeight"
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
                                                            Net Weight Details
                                                       </label>
                                                       <Field
                                                            type="number"
                                                            className="form-control"
                                                            id="netWeight"
                                                            name="netWeight"
                                                            placeholder="Net Weight"
                                                            disabled={!isEditing}
                                                       />
                                                       <ErrorMessage name="netWeight" component="div" className="text-danger" />
                                                  </div>
                                             </div>
                                             <div className="col-lg-6">
                                                  <div className="form-group">
                                                       <label className="form-control-label" htmlFor="input-purity">
                                                            Purity
                                                       </label>
                                                       <Field
                                                            className="form-control"
                                                            id="purity"
                                                            name="purity"
                                                            placeholder="Purity"
                                                            disabled={!isEditing}
                                                       />
                                                       <ErrorMessage name="purity" component="div" className="text-danger" />
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
                                                            id="metalRate"
                                                            name="metalRate"
                                                            placeholder="Metal Rate"
                                                            disabled={!isEditing}
                                                            onChange={e => {
                                                                 handlePriceChange(e, setFieldValue);
                                                                 setFieldValue('metalRate', e.target.value);
                                                            }}
                                                       />
                                                       <ErrorMessage name="metalRate" component="div" className="text-danger" />
                                                  </div>
                                             </div>
                                             <div className="col-lg-6">
                                                  <div className="form-group">
                                                       <label className="form-control-label" htmlFor="input-totalAmount">
                                                            Total Amount
                                                       </label>
                                                       <Field
                                                            type="number"
                                                            className="form-control"
                                                            id="totalAmount"
                                                            name="totalAmount"
                                                            placeholder="Total Amount"
                                                            disabled={!isEditing}
                                                       />
                                                       <ErrorMessage name="totalAmount" component="div" className="text-danger" />
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
                                        {isEditing && (
                                             <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                  <button type="submit" className="btn btn-block submit-button" disabled={isSubmitting}>
                                                       Purchase
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

export default PurchaseUser;
