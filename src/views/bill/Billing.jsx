import React, { useEffect, useState } from 'react';
import PageTitle from '../../component/PageTitle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { billingValidation } from '../../validation/billingValidation';
import PageLoader from '../../component/loaders/PageLoader';
import TableWithPagination from '../../component/form/Table';
import { getTablePages } from '../../utils/getTablePages';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRequest } from '../../utils/apis/apiRequestHelper';
import { articleEndpoints } from '../../utils/endpoints/articleStockEndpoints';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { getAllArticles, getAllArticlesById, getAllItemsById } from '../../utils/apis/articleStockApiRequests';
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
     const { enqueueSnackbar } = useSnackbar();
     //state to amange form
     const [itemRate, setItemRate] = useState(0);
     const [payableAmt, setPayableAmt] = useState(0);
     const [articleOptions, setArticleOptions] = useState([]);

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
               const data = await getRequest(getAllArticles(), navigate, enqueueSnackbar);
               console.log(data);
               setArticleOptions(data);
          } catch (e) {
               console.error(e);
          }
     };

     const getArticleInfoById = async (id, setFieldValue) => {
          try {
               const data = await getRequest(getAllArticlesById(id), navigate, enqueueSnackbar);
               console.log(data);
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
          console.log(values);
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

     useEffect(() => {
          getAllArticleInfo();
     }, []);
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
                                                  <label className="form-control-label" htmlFor="input-articleName">
                                                       Article Name
                                                  </label>
                                                  <Field
                                                       as="select"
                                                       className="form-control item"
                                                       id="brandId"
                                                       placeholder="Brand Name"
                                                       name="articleId"
                                                       onChange={async e => {
                                                            console.log(e.target.value);
                                                            await getArticleInfoById(e.target.value, setFieldValue);
                                                            setFieldValue('articleId', Number(e.target.value));
                                                            //await getSubsidiaries(e.target.value);
                                                       }}
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
                                        </div>
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
                                                       disabled={!isEditing}
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
                                                       disabled={!isEditing}
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
                                                       disabled={!isEditing}
                                                  />
                                                  <ErrorMessage name="netWeight" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-3">
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
                                                       disabled={!isEditing}
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
                                                       disabled={!isEditing}
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
                         initialValues={initialValues}
                         enableReinitialize
                         validationSchema={billingValidation}
                         onSubmit={values => {
                              handleSubmit(values);
                         }}
                    >
                         {({ isSubmitting, setFieldValue }) => (
                              <Form>
                                   <h5 className="heading-small text-muted mb-4">Payment </h5>
                                   <div className="row">
                                        <div className="col-md-4">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-sgst">
                                                       S-Gst
                                                  </label>
                                                  <Field
                                                       className="form-control"
                                                       id="sgst"
                                                       placeholder="S-Gst "
                                                       name="sgst"
                                                       disabled={!isEditing}
                                                  ></Field>
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
                                                       disabled={!isEditing}
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
                                                       disabled={!isEditing}
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
                                                       disabled={!isEditing}
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
                                                       disabled={!isEditing}
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
                                                       disabled={!isEditing}
                                                  />
                                                  <ErrorMessage name="payableAmount" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                   </div>
                              </Form>
                         )}
                    </Formik>
                    <div>
                         <div className="form-group">
                              {!isEditing && (
                                   <button
                                        className="submit-button"
                                        onClick={() => {
                                             setIsEditing(true);
                                        }}
                                   >
                                        Edit
                                   </button>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Billing;
