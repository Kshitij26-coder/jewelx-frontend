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
          <div className="container">
               <PageTitle title="Add Customer" />

               <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isValid }) => (
                         <Form className="customer-form">
                              <div className="row p-5 m-5" style={{ margin: '10px' }}>
                                   <div className="col-md-6 col-sm-12 ">
                                        <table className="table">
                                             <tbody>
                                                  <tr>
                                                       <td>
                                                            <td>Name : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="text" name="name" className="form-control" />
                                                                 <ErrorMessage name="name" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>
                                                            <td>Pincode : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="text" name="pincode" className="form-control" />
                                                                 <ErrorMessage name="pincode" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>
                                                            <td>Address : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="text" name="address" className="form-control" />
                                                                 <ErrorMessage name="address" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>
                                                            <td>Adhar Id : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="text" name="adhar_id" className="form-control" />
                                                                 <ErrorMessage name="adhar_id" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>
                                                            <td>Pan Id : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="text" name="pan_id" className="form-control" />
                                                                 <ErrorMessage name="pan_id" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>
                                                            <td>Mobile No : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="text" name="mobile_number" className="form-control" />
                                                                 <ErrorMessage name="mobile_number" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>
                                                            <td>Date Of Birth : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="date" name="date_of_birth" className="form-control" />
                                                                 <ErrorMessage name="date_of_birth" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>
                                                            <td>Anniversary Date : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="date" name="anniversary_date" className="form-control" />
                                                                 <ErrorMessage name="anniversary_date" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>
                                                            <td>Opening Balance : </td>
                                                       </td>
                                                       <td>
                                                            <div className="form-group">
                                                                 <Field type="text" name="opening_balance" className="form-control" />
                                                                 <ErrorMessage name="opening_balance" component="div" className="text-danger" />
                                                            </div>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                                   <div className="col-md-6 col-sm-12">
                                        <table className="table table-bordered">
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
     );
};

export default Customer;
