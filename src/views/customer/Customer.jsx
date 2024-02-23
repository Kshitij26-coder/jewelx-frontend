import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageTitle from '../../component/PageTitle';

const initialValues = {
     name: '',
     pincode: '',
     address: '',
     adhar_id: '',
     pan_id: '',
     mobile_number: '',
     date_of_birth: null,
     anniversary_date: null,
     opening_balance: '',
};

const validationSchema = Yup.object().shape({
     name: Yup.string().required('Name is required'),
     pincode: Yup.string()
          .required('Pincode is required')
          .matches(/^[0-9]+$/, 'Pincode must only contain numbers')
          .length(6, 'Pincode must be exactly 6 characters long'),
     address: Yup.string().required('Address is required'),
     adhar_id: Yup.string()
          .required('Aadhar ID is required')
          .matches(/^[0-9]+$/, 'Aadhar ID must only contain numbers')
          .length(12, 'Aadhar ID must be exactly 12 characters long'),
     pan_id: Yup.string()
          .required('PAN ID is required')
          .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN ID'),
     mobile_number: Yup.string()
          .required('Mobile Number is required')
          .matches(/^[0-9]{10}$/, 'Mobile Number must be exactly 10 digits long'),
     date_of_birth: Yup.date().required('Date of Birth is required'),
     opening_balance: Yup.number().required('Opening Balance is required'),
});

const handleSubmit = (values, { setSubmitting }) => {
     setSubmitting(false);
};

const Customer = () => {
     return (
          <div>
               <PageTitle title="Add Customer" />
               <div className="container">
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                                                            <Field type="text" id="name" name="name" className="form-control" />
                                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="pincode">Pincode:</label>
                                                            <Field type="text" id="pincode" name="pincode" className="form-control" />
                                                            <ErrorMessage name="pincode" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="address">Address:</label>
                                                            <Field type="text" id="address" name="address" className="form-control" />
                                                            <ErrorMessage name="address" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="adhar_id">Adhar ID:</label>
                                                            <Field type="text" id="adhar_id" name="adhar_id" className="form-control" />
                                                            <ErrorMessage name="adhar_id" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="pan_id">Pan ID:</label>
                                                            <Field type="text" id="pan_id" name="pan_id" className="form-control" />
                                                            <ErrorMessage name="pan_id" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="mobile_number">Mobile Number:</label>
                                                            <Field type="text" id="mobile_number" name="mobile_number" className="form-control" />
                                                            <ErrorMessage name="mobile_number" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="date_of_birth">Date of Birth:</label>
                                                            <Field type="date" id="date_of_birth" name="date_of_birth" className="form-control" />
                                                            <ErrorMessage name="date_of_birth" component="div" className="text-danger" />
                                                       </div>
                                                  </div>

                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="opening_balance">Opening Balance:</label>
                                                            <Field type="text" id="opening_balance" name="opening_balance" className="form-control" />
                                                            <ErrorMessage name="opening_balance" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label htmlFor="anniversary_date">Anniversary Date:</label>
                                                            <Field
                                                                 type="date"
                                                                 id="anniversary_date"
                                                                 name="anniversary_date"
                                                                 className="form-control"
                                                            />
                                                            <ErrorMessage name="anniversary_date" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             </div>

                                             <div className="row " style={{ width: '50%' }}>
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
                                                                      <input type="text" className="form-control" placeholder="Enter weight" />
                                                                 </td>
                                                                 <td>
                                                                      <select className="form-control" style={{ backgroundColor: 'transparent' }}>
                                                                           <option value="credit">Credit</option>
                                                                           <option value="debit">Debit</option>
                                                                      </select>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>Stone</td>
                                                                 <td>
                                                                      <input type="text" className="form-control" placeholder="Enter weight" />
                                                                 </td>
                                                                 <td>
                                                                      <select className="form-control" style={{ backgroundColor: 'transparent' }}>
                                                                           <option value="credit">Credit</option>
                                                                           <option value="debit">Debit</option>
                                                                      </select>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>Silver</td>
                                                                 <td>
                                                                      <input type="text" className="form-control" placeholder="Enter weight" />
                                                                 </td>
                                                                 <td>
                                                                      <select className="form-control" style={{ backgroundColor: 'transparent' }}>
                                                                           <option value="credit">Credit</option>
                                                                           <option value="debit">Debit</option>
                                                                      </select>
                                                                 </td>
                                                            </tr>
                                                            <tr>
                                                                 <td>Platinum</td>
                                                                 <td>
                                                                      <input type="text" className="form-control " placeholder="Enter weight" />
                                                                 </td>
                                                                 <td>
                                                                      <select className="form-control" style={{ backgroundColor: 'transparent' }}>
                                                                           <option value="credit">Credit</option>
                                                                           <option value="debit">Debit</option>
                                                                      </select>
                                                                 </td>
                                                            </tr>
                                                       </tbody>
                                                  </table>
                                             </div>
                                        </div>
                                        <hr style={{ width: '100%', background: '#1111' }} />
                                        <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                             <button type="submit" className="btn btn-block submit-button" disabled={!isValid}>
                                                  Submit
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

export default Customer;
