import React, { useEffect, useState } from 'react';
import PageTitle from '../../component/PageTitle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { billingValidation, paymentValidation } from '../../validation/billingValidation';
import PageLoader from '../../component/loaders/PageLoader';
import TableWithPagination from '../../component/form/Table';
import { getTablePages } from '../../utils/getTablePages';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRequest, postRequest } from '../../utils/apis/apiRequestHelper';
import { articleEndpoints } from '../../utils/endpoints/articleStockEndpoints';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { getAllArticles, getAllArticlesById, getAllArticlesByStatus, getAllItemsById } from '../../utils/apis/articleStockApiRequests';
import { showSuccessSnackbar } from '../../utils/snackBar';
import { getCustomerByBrandId } from '../../utils/apis/customerApiRequest';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { saleEndPoints } from '../../utils/endpoints/saleEndPoints';
import ButtonLoader from '../../component/loaders/ButtonLoader';
const Billing = () => {
     const columns = [
          'Article Name',
          'Gross Weight',
          'Net-Weight',
          'Purity',
          'Stone-Weight',
          'Huid',
          'Item',
          'Metal Rate',
          'Making Charges',
          'Artifact Amt',
          'Payable Amt',
          'Customer Id',
          'Article Id',
          'Remove',
     ];
     const [isEditing, setIsEditing] = useState(false);
     const [metals, setMetals] = useState([]);
     const [uom, setUom] = useState([]);
     const [loader, setLoader] = useState(false);
     const [rows, setRows] = useState([]);
     const [totalRows, setTotalRows] = useState(1);
     const [page, setPage] = useState(1);
     const [articleInfo, setArticleInfo] = useState([]);
     const navigate = useNavigate();
     const [cookies, setCookies] = useState(getCookiesObject());
     const { enqueueSnackbar } = useSnackbar();
     //state to amange form
     const [itemRate, setItemRate] = useState(0);
     const [payableAmt, setPayableAmt] = useState(0);
     const [articleOptions, setArticleOptions] = useState([]);
     const [customers, setCustomers] = useState([]);
     const [customerId, setCustomerId] = useState('');
     const [buttonLoader, setButtonLoader] = useState(false);
     const [paymentInitialVlaues, setPaymentInitialVlaues] = useState({
          payableAmount: 0,
          netAmount: 0,
          totalMakingCharges: 0,
          sgst: 0,
          cgst: 0,
          transactionType: '',
          transactionMode: '',
          cashAmount: '',
          netBankingUTR: '',
          netBankingAmount: '',
          chequeNo: 0,
          chequeAmount: '',
     });
     /**
      *
      * @param {*} e
      * @param {*} setFieldValue
      * to handle the price change
      */
     const handlePriceChange = (e, setFieldValue) => {
          const price = parseInt(e.target.value);
          const makingCharges = parseInt(e.target.form.elements.makingCharges.value);
          const artifactAmount = parseInt(e.target.form.elements.artifactAmount.value);
          const netWeight = parseInt(e.target.form.elements.netWeight.value);
          if (!isNaN(netWeight) && !isNaN(price) && !isNaN(makingCharges) && !isNaN(artifactAmount)) {
               const total = netWeight * price;
               setFieldValue('itemAmount', total);
               setFieldValue('payableAmount', total + makingCharges + artifactAmount);
          }
     };

     /**
      *
      * @param {*} e
      * @param {*} setFieldValue
      * To handle the extra changes
      */
     const handleChargesChange = (e, setFieldValue) => {
          const makingCharges = parseInt(e.target.form.elements.makingCharges.value);
          const ItemAmount = parseInt(e.target.form.elements.itemAmount.value);
          const artifactAmount = parseInt(e.target.form.elements.artifactAmount.value);
          if (!isNaN(makingCharges) && !isNaN(ItemAmount) && !isNaN(artifactAmount)) {
               const total = ItemAmount + makingCharges + artifactAmount;
               setFieldValue('payableAmount', total);
          }
     };

     /**
      * Used to gt article info of all articles
      */
     const getAllArticleInfo = async () => {
          try {
               const data = await getRequest(getAllArticlesByStatus(), navigate, enqueueSnackbar);
               // console.log(data);
               setArticleOptions(data);
          } catch (e) {
               console.error(e);
          }
     };

     const getArticleInfoById = async (id, setFieldValue) => {
          try {
               const data = await getRequest(getAllArticlesById(id), navigate, enqueueSnackbar);
               //console.log(data);
               setFieldValue('articleName', data.articleName);
               setFieldValue('grossWeight', data.grossWeight);
               setFieldValue('netWeight', data.netWeight);
               setFieldValue('purity', data.purity);
               setFieldValue('stoneWeight', data.stoneWeight);
               setFieldValue('huid', data.huid);
          } catch (e) {
               console.error(e);
          }
     };

     /**
      *
      */
     const responseToRows = data => {
          let temp = [];
          data.map((each, index) => {
               temp[index] = { ...each, remove: <DeleteIcon onClick={() => rows.splice(index, 1)} fontSize="large" /> };
          });

          setRows(temp);
     };

     const initialValues = {
          articleName: '',
          grossWeight: 0,
          netWeight: 0,
          purity: '',
          stoneWeight: 0,
          huid: 0,
          itemAmount: 0,
          metalRate: 0,
          makingCharges: 0,
          artifactAmount: 0,
          payableAmount: 0,
     };

     const handleSubmit = values => {
          setIsEditing(false);
          //console.log(values);
          setArticleInfo([...articleInfo, values]);
          let rowWiseBill = { ...values };
          setRows([
               ...rows,
               {
                    ...values,
                    remove: (
                         <DeleteIcon
                              onClick={() => {
                                   let temp = [...rows];
                                   setRows(temp);
                              }}
                              fontSize="large"
                         />
                    ),
               },
          ]);
     };

     const handleCalculateBill = () => {
          let netAmount = 0;
          let sgst = 0;
          let cgst = 0;
          let payableAmount = 0;
          let totalMakingCharges = 0;
          rows.forEach(row => {
               netAmount += row.payableAmount;
               totalMakingCharges += row.makingCharges == null ? 0 : Number(row.makingCharges);
          });
          cgst = netAmount * 0.015;
          sgst = netAmount * 0.015;
          // console.log(`netAmount: ${netAmount}`);
          // console.log(`making: ${totalMakingCharges}`);
          // console.log(`cgst: ${cgst}`);
          // console.log(`payable: ${payableAmount}`);

          setPaymentInitialVlaues({
               payableAmount: netAmount + cgst + sgst,
               netAmount: netAmount,
               totalMakingCharges: totalMakingCharges,
               sgst: sgst,
               cgst: cgst,
               transactionType: '',
               transactionMode: '',
               cashAmount: 0,
               netBankingUTR: '',
               netBankingAmount: 0,
               chequeNo: 0,
               chequeAmount: 0,
               discount: 0,
               customerId: '',
          });
     };

     const handleDiscountChange = (e, setFieldValue) => {
          // console.log(e.target.value);
          // console.log(setFieldValue);
          // console.log(e.target.form.elements.discount);
          // console.log(e.target.form.elements.value);
          setFieldValue('payableAmount', 1000);
          const discount = Number(e.target.form.elements.discount.value);
          const netAmount = Number(e.target.form.elements.netAmount.value);
          if (!isNaN(discount) && !isNaN(netAmount)) {
               const discountAmount = netAmount - discount;
               const cgst = discountAmount * 0.015;
               const sgst = discountAmount * 0.015;
               const payable = discountAmount + cgst + sgst;
               setFieldValue('payableAmount', payable);
               setFieldValue('cgst', cgst);
               setFieldValue('sgst', sgst);
          }
     };

     const getCustomersOptions = async () => {
          try {
               const data = await getRequest(getCustomerByBrandId(), navigate, enqueueSnackbar);
               //console.log(data);
               setCustomers(data);
          } catch (e) {
               console.log(e);
          }
     };

     const handeGenerateSale = async values => {
          try {
               setButtonLoader(true);
               const dto = {
                    ...values,
                    saleItems: rows,
                    customerId: customerId,
                    subsidiaryId: cookies.subsidiaryId ? cookies.subsidiaryId : 1,
                    userId: cookies.idxId,
                    brandId: cookies.brandId,
                    transactionDescription: `bill genearation of customer id ${customerId}`,
               };
               const data = await postRequest(dto, saleEndPoints.BASE_URL, navigate, enqueueSnackbar);
               showSuccessSnackbar('bill created successfully', enqueueSnackbar);
               navigate('/sales');
               setButtonLoader(false);
          } catch (e) {
               console.error(e);
          }
     };

     useEffect(() => {
          getAllArticleInfo();
          getCustomersOptions();
     }, []);

     useEffect(() => {
          handleCalculateBill();
     }, [rows]);
     return (
          <div>
               <PageTitle title={'Billing'} />
               <div
                    className="container w-100 p-5 card "
                    style={{ height: 'auto', marginLeft: '50px', padding: '10px', width: '96%', marginTop: '30px' }}
               >
                    <Formik
                         initialValues={initialValues}
                         enableReinitialize
                         validationSchema={billingValidation}
                         onSubmit={values => {
                              handleSubmit(values);
                         }}
                    >
                         {({ isSubmitting, setFieldValue, values }) => (
                              <Form>
                                   <h5 className="heading-small text-muted mb-4">Bill information</h5>
                                   <div className="row">
                                        <div className="col-md-3">
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
                                                       disabled={false}
                                                       onChange={async e => {
                                                            setFieldValue('customerId', Number(e.target.value));
                                                            setCustomerId(e.target.value);
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
                                        <div className="col-md-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-articleName">
                                                       Article Name
                                                  </label>
                                                  <Field
                                                       as="select"
                                                       className="form-control item"
                                                       id="brandId"
                                                       placeholder="Select Article"
                                                       name="tagId"
                                                       onChange={async e => {
                                                            await getArticleInfoById(e.target.value, setFieldValue);
                                                            setFieldValue('tagId', Number(e.target.value));
                                                       }}
                                                  >
                                                       <option value="">Select Article</option>
                                                       {articleOptions.length > 0 &&
                                                            articleOptions.map(each => (
                                                                 <option value={each.tagId} key={each.tagId}>
                                                                      {each.tagId} {each.articleName}
                                                                 </option>
                                                            ))}
                                                  </Field>
                                                  <ErrorMessage name="tagId" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        {/* <div className="col-md-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-articleName">
                                                       Article Name
                                                  </label>
                                                  <Field
                                                       as="select"
                                                       className="form-control item"
                                                       id="brandId"
                                                       placeholder="Select Article"
                                                       name="customerId"
                                                  >
                                                       <option value="">Select Article</option>
                                                       {articleOptions.length > 0 &&
                                                            articleOptions.map(each => (
                                                                 <option value={each.tagId} key={each.tagId}>
                                                                      {each.articleName}
                                                                 </option>
                                                            ))}
                                                  </Field>
                                                  <ErrorMessage name="articleName" component="div" className="text-danger" />
                                             </div>
                                        </div> */}
                                        <div className="col-md-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-articleName">
                                                       Article Name
                                                  </label>
                                                  <Field
                                                       className="form-control"
                                                       id="articleName"
                                                       placeholder="Article Name"
                                                       name="articleName"
                                                       disabled={true}
                                                  ></Field>
                                                  <ErrorMessage name="articleName" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
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
                                                       disabled={true}
                                                  />
                                                  <ErrorMessage name="grossWeight" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
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
                                                       disabled={true}
                                                  />
                                                  <ErrorMessage name="netWeight" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-purity">
                                                       Purity
                                                  </label>
                                                  <Field className="form-control" id="purity" name="purity" placeholder="Purity" disabled={true} />
                                                  <ErrorMessage name="purity" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-stoneWeight">
                                                       Stone Weight
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="stoneWeight"
                                                       placeholder="Stone Weight"
                                                       name="stoneWeight"
                                                       disabled={true}
                                                  ></Field>
                                                  <ErrorMessage name="stoneWeight" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-huid">
                                                       Huid
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="huid"
                                                       name="huid"
                                                       placeholder="huid"
                                                       disabled={true}
                                                  />
                                                  <ErrorMessage name="huid" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-itemAmount">
                                                       Item Amount
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="itemAmount"
                                                       name="itemAmount"
                                                       placeholder="Item Amount"
                                                       disabled={true}
                                                  />
                                                  <ErrorMessage name="itemAmount" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
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
                                        <div className="col-lg-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-makingCharges">
                                                       Making Charges
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="makingCharges"
                                                       name="makingCharges"
                                                       placeholder="Making Charges"
                                                       disabled={!isEditing}
                                                       onChange={e => {
                                                            handleChargesChange(e, setFieldValue);
                                                            setFieldValue('makingCharges', e.target.value);
                                                       }}
                                                  />
                                                  <ErrorMessage name="makingCharges" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-artifactAmount">
                                                       Artifact Amount
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="artifactAmount"
                                                       name="artifactAmount"
                                                       placeholder="Artifact Amount"
                                                       disabled={!isEditing}
                                                       onChange={e => {
                                                            handleChargesChange(e, setFieldValue);
                                                            setFieldValue('artifactAmount', e.target.value);
                                                       }}
                                                  />
                                                  <ErrorMessage name="artifactAmount" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-payableAmount">
                                                       Payable Amount
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="payableAmount"
                                                       name="payableAmount"
                                                       placeholder="PayableAmount "
                                                       disabled={true}
                                                  />
                                                  <ErrorMessage name="payableAmount" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div>
                                             <div className="form-group">
                                                  {isEditing && (
                                                       <button type="submit" className="submit-button" style={{ width: '8rem', marginTop: '1.5rem' }}>
                                                            Add
                                                       </button>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              </Form>
                         )}
                    </Formik>
                    {!isEditing && (
                         <button
                              className="submit-button"
                              onClick={() => {
                                   setIsEditing(true);
                              }}
                         >
                              + Add Entry
                         </button>
                    )}
               </div>
               {loader ? <PageLoader /> : <TableWithPagination columns={columns} rows={rows} page={page} />}

               <div
                    className="container w-100 p-5 card "
                    style={{ height: 'auto', marginLeft: '50px', padding: '10px', width: '96%', marginTop: '30px' }}
               >
                    <Formik
                         initialValues={paymentInitialVlaues}
                         enableReinitialize
                         validationSchema={paymentValidation}
                         onSubmit={values => {
                              //handleSubmit(values);
                              handeGenerateSale(values);
                         }}
                    >
                         {({ isSubmitting, setFieldValue, values }) => (
                              <Form>
                                   <h5 className="heading-small text-muted mb-4">Payment </h5>
                                   <div className="row">
                                        <div className="col-md-4">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-sgst">
                                                       S-Gst
                                                  </label>
                                                  <Field className="form-control" id="sgst" placeholder="S-Gst " name="sgst" disabled={true}></Field>
                                                  <ErrorMessage name="sgst" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-4">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-cgst">
                                                       C-Gst
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="cgst"
                                                       name="cgst"
                                                       placeholder="C-Gst"
                                                       disabled={true}
                                                  />
                                                  <ErrorMessage name="cgst" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-4">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-totalMakingCharges">
                                                       Total Making Charges
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="totalMakingCharges"
                                                       name="totalMakingCharges"
                                                       placeholder="Total Making Charges"
                                                       disabled={true}
                                                  />
                                                  <ErrorMessage name="totalMakingCharges" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-4">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-discount">
                                                       Discount
                                                  </label>
                                                  <Field
                                                       className="form-control"
                                                       id="discount"
                                                       name="discount"
                                                       placeholder="Discount"
                                                       disabled={false}
                                                       onChange={e => {
                                                            handleDiscountChange(e, setFieldValue);
                                                            // console.log('Discount');
                                                            setFieldValue('discount', e.target.value);
                                                       }}
                                                  />
                                                  <ErrorMessage name="discount" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-4">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-netAmount">
                                                       Net Amount
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="netAmount"
                                                       placeholder="Net Amount"
                                                       name="netAmount"
                                                       disabled={true}
                                                  ></Field>
                                                  <ErrorMessage name="netAmount" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-4">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-payableAmount">
                                                       Payable Amount
                                                  </label>
                                                  <Field
                                                       type="number"
                                                       className="form-control"
                                                       id="payableAmount"
                                                       name="payableAmount"
                                                       placeholder="Payable Amount"
                                                       disabled={true}
                                                  />
                                                  <ErrorMessage name="payableAmount" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div>
                                             <div className="col-lg-4">
                                                  <div className="form-group">
                                                       <label className="form-control-label" htmlFor="input-transactionType">
                                                            Transaction Type
                                                       </label>
                                                       <Field
                                                            as="select"
                                                            className="form-control"
                                                            id="input-transactionType"
                                                            name="transactionType"
                                                            disabled={false}
                                                       >
                                                            <option value="">Select Transaction Type</option>
                                                            <option value="c">Credit</option>
                                                            <option value="d">Debit</option>
                                                       </Field>
                                                       <ErrorMessage name="transactionType" component="div" className="text-danger" />
                                                  </div>
                                             </div>
                                             <div className="col-lg-4">
                                                  <div className="form-group">
                                                       <label className="form-control-label" htmlFor="input-transactionMode">
                                                            Transaction Mode
                                                       </label>
                                                       <Field
                                                            as="select"
                                                            className="form-control"
                                                            id="input-transactionMode"
                                                            name="transactionMode"
                                                            disabled={false}
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
                                                  <div className="col-lg-4">
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
                                                                 disabled={false}
                                                            />
                                                            <ErrorMessage name="cashAmount" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             )}
                                             {(values.transactionMode === 'mp' || values.transactionMode === 'on') && (
                                                  <div className="col-lg-4">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-netbankingUTR">
                                                                 Netbanking UTR
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-netbankingUTR"
                                                                 name="netBankingUTR"
                                                                 placeholder="netBankingUTR"
                                                                 disabled={false}
                                                            />
                                                            <ErrorMessage name="netBankingUTR" component="div" className="text-danger" />
                                                       </div>
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-netbankingAmount">
                                                                 Netbanking Amount
                                                            </label>
                                                            <Field
                                                                 type="number"
                                                                 className="form-control"
                                                                 id="input-netbankingAmount"
                                                                 name="netBankingAmount"
                                                                 placeholder="Netbanking Amount"
                                                                 disabled={false}
                                                            />
                                                            <ErrorMessage name="netBankingAmount" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             )}
                                             {(values.transactionMode === 'mp' || values.transactionMode === 'ch') && (
                                                  <div className="col-lg-4 ">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-chequeNo">
                                                                 Cheque No
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-chequeNo"
                                                                 name="chequeNo"
                                                                 placeholder="Cheque No"
                                                                 disabled={false}
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
                                                                 disabled={false}
                                                            />
                                                            <ErrorMessage name="chequeAmount" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             )}
                                             <div>
                                                  <div className="form-group col-lg-4">
                                                       <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                            <button type="submit" className="btn btn-block submit-button" disabled={buttonLoader}>
                                                                 {buttonLoader ? <ButtonLoader /> : 'Generate'}
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </Form>
                         )}
                    </Formik>
               </div>
          </div>
     );
};

export default Billing;
