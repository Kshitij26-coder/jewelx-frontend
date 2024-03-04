import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageTitle from '../../component/PageTitle';
import { customerValidationSchema } from '../../validation/customerValidation';
import { getRequest, postRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { customerEndPoints } from '../../utils/endpoints/customerEndPoints';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import EditButton from '../../component/edit/EditButton';
import { getCustomerByUUID } from '../../utils/apis/customerApiRequest';
import { getIdFromUrl } from '../../utils/getIdFromUrl';

const initialValues = {
     name: '',
     pincode: '',
     address: '',
     aadharId: '',
     panId: '',
     mobileNumber: '',
     dateOfBirth: '',
     anniversaryDate: '',
     openingBalance: 0,
};

const AddCustomer = ({ update }) => {
     const [cookie, setCookie] = useState(getCookiesObject());
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);
     const [isEditing, setIsEditing] = useState(update ? false : true);
     const [data, setData] = useState(initialValues);

     /**
      * here uselocation is the Hook Used For getting the Current Url
      */
     const location = useLocation();
     const currentPath = location.pathname;

     const handleSubmit = async (values, { setSubmitting }) => {
          // setSubmitting(false);
          update ? await handleUpdateCustomer(values) : await handleAddCustomer(values);
     };

     const getCustomerInfo = async id => {
          try {
               const data = await getRequest(getCustomerByUUID(id), navigate, enqueueSnackbar);
               setData(data);
               // console.log(data);
          } catch (e) {
               console.error(e);
          }
     };

     const handleAddCustomer = async values => {
          try {
               setButtonLoader(true);
               const dto = {
                    ...values,
                    brandId: cookie.brandId,
                    userID: cookie.idxId,
                    subsidiaryId: cookie.subsidiaryId != null ? cookie.subsidiaryId : 1,
               };
               const data = await postRequest(dto, customerEndPoints.BASE_URL, navigate, enqueueSnackbar);
               showSuccessSnackbar('Customer Added', enqueueSnackbar);
               // console.log(data);
               setIsEditing(false);
               navigate('/customers');
               setButtonLoader(false);
          } catch (e) {
               setButtonLoader(false);
               console.error(e);
          }
     };
     const handleUpdateCustomer = async values => {
          try {
               setButtonLoader(true);
               const dto = {
                    ...values,
                    brandId: cookie.brandId,
                    userID: cookie.idxId,
                    subsidiaryId: cookie.subsidiaryId != null ? cookie.subsidiaryId : 1,
               };
               const data = await putRequest(getIdFromUrl(currentPath), dto, customerEndPoints.BASE_URL, navigate, enqueueSnackbar);
               //  showSuccessSnackbar('Customer Updated Added', enqueueSnackbar);
               //  console.log(data);
               setIsEditing(false);
               navigate('/customers');
               setButtonLoader(false);
          } catch (e) {
               setButtonLoader(false);
               console.error(e);
          }
     };

     /**
      * Editing is Handled here
      */
     const handleEdit = () => {
          setIsEditing(true);
     };

     useEffect(() => {
         // console.log(cookie);
          update && getCustomerInfo(getIdFromUrl(currentPath));
     }, []);

     return (
          <div>
               <PageTitle title="Add Customer" back="/customers" />
               <div className="container">
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         {update && <EditButton onClick={handleEdit} />}
                         <Formik
                              initialValues={update ? data : initialValues}
                              enableReinitialize
                              validationSchema={customerValidationSchema}
                              onSubmit={handleSubmit}
                         >
                              {({ isValid }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4">Customer information : </h5>
                                        <div className="pl-md-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="name">
                                                                 Name:
                                                            </label>
                                                            <Field type="text" id="name" name="name" className="form-control" disabled={!isEditing} />
                                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="pincode">Pincode:</label>
                                                            <Field
                                                                 type="text"
                                                                 id="pincode"
                                                                 name="pincode"
                                                                 className="form-control"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="pincode" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="address">Address:</label>
                                                            <Field
                                                                 type="text"
                                                                 id="address"
                                                                 name="address"
                                                                 className="form-control"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="address" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="aadharId">Adhar ID:</label>
                                                            <Field
                                                                 type="text"
                                                                 id="aadharId"
                                                                 name="aadharId"
                                                                 className="form-control"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="aadharId" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="panId">Pan ID:</label>
                                                            <Field
                                                                 type="text"
                                                                 id="panId"
                                                                 name="panId"
                                                                 className="form-control"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="panId" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="mobileNumber">Mobile Number:</label>
                                                            <Field
                                                                 type="text"
                                                                 id="mobileNumber"
                                                                 name="mobileNumber"
                                                                 className="form-control"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                                                            <Field
                                                                 type="date"
                                                                 id="dateOfBirth"
                                                                 name="dateOfBirth"
                                                                 className="form-control"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="dateOfBirth" component="div" className="text-danger" />
                                                       </div>
                                                  </div>

                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="openingBalance">Opening Balance:</label>
                                                            <Field
                                                                 type="text"
                                                                 id="openingBalance"
                                                                 name="openingBalance"
                                                                 className="form-control"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="openingBalance" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="anniversaryDate">Anniversary Date:</label>
                                                            <Field
                                                                 type="date"
                                                                 id="anniversaryDate"
                                                                 name="anniversaryDate"
                                                                 className="form-control"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="anniversaryDate" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             </div>

                                             {/* <div className="row " style={{ width: '50%' }}>
                                                  <table className="table table-bordered ">
                                                       <thead>
                                                            <tr>
                                                                 <th className="table-customer">Metal Name</th>
                                                                 <th className="table-customer">Weight</th>
                                                                 <th className="table-customer">Credit/Debit</th>
                                                            </tr>
                                                       </thead>
                                                       <tbody>
                                                            <tr>
                                                                 <td>Gold</td>
                                                                 <td>
                                                                      <Field
                                                                           type="text"
                                                                           className="form-control"
                                                                           placeholder="Enter weight"
                                                                           disabled={!isEditing}
                                                                      />
                                                                 </td>
                                                                 <td>
                                                                      <Field
                                                                           disabled={!isEditing}
                                                                           as="select"
                                                                           className="form-control"
                                                                           style={{ backgroundColor: 'transparent' }}
                                                                      >
                                                                           <option value="credit">Credit</option>
                                                                           <option value="debit">Debit</option>
                                                                      </Field>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>Stone</td>
                                                                 <td>
                                                                      <Field
                                                                           type="text"
                                                                           className="form-control"
                                                                           placeholder="Enter weight"
                                                                           disabled={!isEditing}
                                                                      />
                                                                 </td>
                                                                 <td>
                                                                      <Field
                                                                           disabled={!isEditing}
                                                                           as="select"
                                                                           className="form-control"
                                                                           style={{ backgroundColor: 'transparent' }}
                                                                      >
                                                                           <option value="credit">Credit</option>
                                                                           <option value="debit">Debit</option>
                                                                      </Field>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>Silver</td>
                                                                 <td>
                                                                      <Field
                                                                           type="text"
                                                                           className="form-control"
                                                                           placeholder="Enter weight"
                                                                           disabled={!isEditing}
                                                                      />
                                                                 </td>
                                                                 <td>
                                                                      <Field
                                                                           disabled={!isEditing}
                                                                           as="select"
                                                                           className="form-control item"
                                                                           id="userRole"
                                                                           placeholder="Select UserType"
                                                                           name="userRole"
                                                                           style={{ backgroundColor: 'transparent' }}
                                                                      >
                                                                           <option value="credit">Credit</option>
                                                                           <option value="debit">Debit</option>
                                                                      </Field>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>Platinum</td>
                                                                 <td>
                                                                      <Field
                                                                           type="text"
                                                                           className="form-control "
                                                                           placeholder="Enter weight"
                                                                           disabled={!isEditing}
                                                                      />
                                                                 </td>
                                                                 <td>
                                                                      <Field
                                                                           as="select"
                                                                           className="form-control"
                                                                           style={{ backgroundColor: 'transparent' }}
                                                                           disabled={!isEditing}
                                                                      >
                                                                           <option value="credit">Credit</option>
                                                                           <option value="debit">Debit</option>
                                                                      </Field>
                                                                 </td>
                                                            </tr>
                                                       </tbody>
                                                  </table>
                                             </div> */}
                                        </div>
                                        <hr style={{ width: '100%', background: '#1111' }} />
                                        <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                             <button type="submit" className="btn btn-block submit-button">
                                                  {buttonLoader ? <ButtonLoader /> : update ? 'Update' : 'Add'}
                                             </button>
                                        </div>
                                   </Form>
                              )}
                         </Formik>
                    </div>
               </div>
          </div>
     );
};

export default AddCustomer;
