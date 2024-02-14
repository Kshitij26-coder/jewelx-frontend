import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import selectPhoto from '../assets/select photo.png';

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
     anniversary_date: Yup.date().required('Anniversary Date is required'),
     opening_balance: Yup.number().required('Opening Balance is required'),
});

const onSubmit = values => {
     // Handle form submission
     console.log('clicked');
     console.log('Form Values:', values);
};

const FormicForm = () => {
     return (
          <div className="container">
               <div className="row">
                    <div className="col-md-6">
                         <h1 className="mt-4 text-center">Add Customer</h1>
                         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                              {({ setFieldValue, values }) => (
                                   <Form>
                                        <div className="mb-3">
                                             <label htmlFor="name" className="form-label">
                                                  Name:
                                             </label>
                                             <Field type="text" name="name" className="form-control" />
                                             <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="pincode" className="form-label">
                                                  Pincode:
                                             </label>
                                             <Field type="text" name="pincode" className="form-control" />
                                             <ErrorMessage name="pincode" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="address" className="form-label">
                                                  Address:
                                             </label>
                                             <Field type="text" name="address" className="form-control" />
                                             <ErrorMessage name="address" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="adhar_id" className="form-label">
                                                  Adhar ID:
                                             </label>
                                             <Field type="text" name="adhar_id" className="form-control" />
                                             <ErrorMessage name="adhar_id" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="pan_id" className="form-label">
                                                  PAN ID:
                                             </label>
                                             <Field type="text" name="pan_id" className="form-control" />
                                             <ErrorMessage name="pan_id" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="mobile_number" className="form-label">
                                                  Mobile Number:
                                             </label>
                                             <Field type="text" name="mobile_number" className="form-control" />
                                             <ErrorMessage name="mobile_number" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="date_of_birth" className="form-label">
                                                  Date of Birth:
                                             </label>
                                             <Field type="date" name="date_of_birth" className="form-control" />
                                             <ErrorMessage name="date_of_birth" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="anniversary_date" className="form-label">
                                                  Anniversary Date:
                                             </label>
                                             <Field type="date" name="anniversary_date" className="form-control" />
                                             <ErrorMessage name="anniversary_date" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                             <label htmlFor="opening_balance" className="form-label">
                                                  Opening Balance:
                                             </label>
                                             <Field type="text" name="opening_balance" className="form-control" />
                                             <ErrorMessage name="opening_balance" component="div" className="text-danger" />
                                        </div>
                                        <div className="d-grid gap-2 mt-3">
                                             <button type="submit" className="btn btn-primary btn-sm">
                                                  Submit
                                             </button>
                                        </div>
                                   </Form>
                              )}
                         </Formik>
                    </div>
                    <div className="col-md-6">
                         <div>
                              <div className="image-upload">
                                   <label htmlFor="fileInput" className="d-inline-block mb-3">
                                        <input id="fileInput" type="file" className="visually-hidden" />
                                        <img
                                             src={selectPhoto}
                                             alt="Dummy Human"
                                             className="human-image"
                                             style={{
                                                  width: '100px',
                                                  height: '100px',
                                             }}
                                        />
                                   </label>
                              </div>
                              <div className="btn-group mb-3" role="group" aria-label="Basic example">
                                   <button type="button" className="btn btn-primary btn-sm me-1">
                                        Add
                                   </button>
                                   <button type="button" className="btn btn-danger btn-sm">
                                        Remove
                                   </button>
                              </div>
                         </div>
                         <h1 className="mt-4 text-center">Weight Details</h1>
                         <table className="table table-bordered">
                              <thead>
                                   <tr>
                                        <th>Type Name</th>
                                        <th>Weight</th>
                                        <th>Credit/Debit</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   <tr>
                                        <td>Gold</td>
                                        <td>
                                             <input type="text" className="form-control" placeholder="Enter weight" />
                                        </td>
                                        <td>
                                             <select className="form-select">
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
                                             <select className="form-select">
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
                                             <select className="form-select">
                                                  <option value="credit">Credit</option>
                                                  <option value="debit">Debit</option>
                                             </select>
                                        </td>
                                   </tr>
                                   <tr>
                                        <td>Platinum</td>
                                        <td>
                                             <input type="text" className="form-control" placeholder="Enter weight" />
                                        </td>
                                        <td>
                                             <select className="form-select">
                                                  <option value="credit">Credit</option>
                                                  <option value="debit">Debit</option>
                                             </select>
                                        </td>
                                   </tr>
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default FormicForm;
