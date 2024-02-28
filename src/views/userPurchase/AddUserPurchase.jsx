import React, { useEffect, useState } from 'react';
import PageTitle from '../../component/PageTitle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { purchaseUserValidation } from '../../validation/purchaseUserValidation';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import EditButton from '../../component/edit/EditButton';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { getAllMetalsByBrand } from '../../utils/apis/metalApiRequest';
import { getRequest, postRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getCustomerByBrandId, getCustomerById } from '../../utils/apis/customerApiRequest';
import { userPurchasesEndPoints } from '../../utils/endpoints/userPurchaseEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import { getUomByBrand } from '../../utils/apis/uomApiRequest';
import { getCookiesObject } from '../../utils/getCookiesObject';

const PurchaseUser = ({ update }) => {
     const [isEditing, setIsEditing] = useState(update ? false : true);
     const [buttonLoader, setButtonLoader] = useState(false);
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [metals, setMetals] = useState([]);
     const [customers, setCustomers] = useState([]);
     const [uoms, setUOMs] = useState([]);
     const [cookies, setCookies] = useState(getCookiesObject());

     const initialValues = {
          metalId: '',
          customerId: '',
          uom: '',
          articleDescription: '',
          grossWeight: 0,
          netWeight: 0,
          purity: 0,
          metalRate: 0,
          totalAmount: 0,
          transactionType: '',
          transactionMode: '',
          cashAmount: 0,
          netbankingUTR: '',
          netbankingAmount: 0,
          chequeNo: '',
          chequeAmount: 0,
     };
     const handleEdit = () => {
          setIsEditing(true);
     };

     const getMetalsOptions = async () => {
          try {
               const data = await getRequest(getAllMetalsByBrand(), navigate, enqueueSnackbar);
               console.log(data);
               setMetals(data);
          } catch (e) {
               console.error(e);
          }
     };
     const getUOMOptions = async () => {
          try {
               const data = await getRequest(getUomByBrand(), navigate, enqueueSnackbar);
               //console.log(data);
               setUOMs(data);
          } catch (e) {
               console.error(e);
          }
     };

     const getCustomersOptions = async () => {
          try {
               const data = await getRequest(getCustomerByBrandId(), navigate, enqueueSnackbar);
               // console.log(data);
               setCustomers(data);
          } catch (e) {
               console.error(e);
          }
     };

     const submitHandeler = async values => {
          try {
               setButtonLoader(true);
               const dto = {
                    ...values,
                    brandId: cookies.brandId,
                    userId: cookies.idxId,
                    subsidiaryId: cookies.subsidiaryId == null ? 1 : cookies.subsidiaryId,
               };
               const data = await postRequest(dto, userPurchasesEndPoints.BASE_URL, navigate, enqueueSnackbar);

               showSuccessSnackbar('Added Successfully', enqueueSnackbar);
               navigate('/user-purchase');
               setIsEditing(false);
               setButtonLoader(false);
          } catch (e) {
               setButtonLoader(false);
               console.error(e);
          }
     };

     useEffect(() => {
          getMetalsOptions();
          getCustomersOptions();
          getUOMOptions();
     }, []);

     return (
          <div>
               <PageTitle title={update ? 'Update Purchase' : 'Add Purchase'} back="/user-purchase" />
               <div className="container" style={{ marginLeft: '3rem' }}>
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         {update && <EditButton onClick={handleEdit} />}
                         <Formik
                              initialValues={initialValues}
                              enableReinitialize
                              validationSchema={purchaseUserValidation}
                              onSubmit={values => {
                                   submitHandeler(values);
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
                                                       <label className="form-control-label" htmlFor="input-metalId">
                                                            Select Metal
                                                       </label>
                                                       <Field
                                                            as="select"
                                                            className="form-control"
                                                            id="metalId"
                                                            placeholder="metal"
                                                            name="metalId"
                                                            disabled={!isEditing}
                                                            onChange={async e => {
                                                                 setFieldValue('metalId', Number(e.target.value.id));
                                                                 setFieldValue('metalRate', e.target.value.rate);
                                                            }}
                                                       >
                                                            <option value="">Select Metal</option>

                                                            {metals?.length > 0 &&
                                                                 metals.map(each => (
                                                                      <option value={{ id: each.metalId, rate: each.metalRate }} key={each.metalId}>
                                                                           {each.metalName}
                                                                      </option>
                                                                 ))}
                                                       </Field>
                                                       <ErrorMessage name="metalId" component="div" className="text-danger" />
                                                  </div>
                                             </div>
                                             <div className="col-lg-6">
                                                  <div className="form-group">
                                                       <label className="form-control-label" htmlFor="input-customerId">
                                                            Select Customer
                                                       </label>
                                                       <Field
                                                            as="select"
                                                            className="form-control"
                                                            id="customerId"
                                                            placeholder="customer"
                                                            name="customerId"
                                                            disabled={!isEditing}
                                                            onChange={async e => {
                                                                 setFieldValue('customerId', Number(e.target.value));
                                                            }}
                                                       >
                                                            <option value="">Select Customer</option>

                                                            {customers?.length > 0 &&
                                                                 customers.map(each => (
                                                                      <option value={each.idx_id} key={each.idx_id}>
                                                                           {each.idx_id} {each.name}
                                                                      </option>
                                                                 ))}
                                                       </Field>
                                                       <ErrorMessage name="metalId" component="div" className="text-danger" />
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
                                                                 // handlePriceChange(e, setFieldValue);
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
                                        {isEditing &&
                                             (buttonLoader ? (
                                                  <ButtonLoader />
                                             ) : (
                                                  <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                       <button type="submit" className="btn btn-block submit-button" disabled={buttonLoader}>
                                                            submit
                                                       </button>
                                                  </div>
                                             ))}
                                   </Form>
                              )}
                         </Formik>
                    </div>
               </div>
          </div>
     );
};

export default PurchaseUser;
