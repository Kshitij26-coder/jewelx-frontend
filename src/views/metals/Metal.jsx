import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { metalValidation } from '../../validation/metalValidation';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';

const Metal = () => {
     const [isEditing, setIsEditing] = useState(false);
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();

     const initialValues = {
          metalName: '',
          metalRate: '',
          metalDescription: '',
     };

     const handleSubmit = (values, { setSubmitting }) => {
          setSubmitting(false);
          setIsEditing(false);

          enqueueSnackbar('Form submitted successfully', { variant: 'success' });
     };

     const handleEdit = () => {
          setIsEditing(true);
     };

     return (
          <div>
               <PageTitle title="Metal" />
               <div>
                    <div className="w-100 p-5 card" style={{ padding: '20px', marginLeft: '15rem' }}>
                         <IconButton onClick={handleEdit} aria-label="edit" style={{ marginLeft: '90%' }}>
                              Edit <EditIcon />
                         </IconButton>
                         <Formik initialValues={initialValues} enableReinitialize validationSchema={metalValidation} onSubmit={handleSubmit}>
                              {({ isSubmitting }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4 ">Metal information</h5>
                                        <div className="pl-md-4">
                                             <div className="row">
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-metalName">
                                                                 Metal Name
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-metalName"
                                                                 name="metalName"
                                                                 placeholder="Metal Name"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="metalName" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-metalRate">
                                                                 Metal Rate
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="input-metalRate"
                                                                 name="metalRate"
                                                                 placeholder="Metal Rate"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="metalRate" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-metalDescription">
                                                                 Metal Description
                                                            </label>
                                                            <Field
                                                                 as="textarea"
                                                                 className="form-control"
                                                                 id="input-metalDescription"
                                                                 name="metalDescription"
                                                                 placeholder=" Metal Description"
                                                                 rows="4"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="metalDescription" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        {/* Submit button */}
                                        {isEditing && (
                                             <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                                                  Submit
                                             </button>
                                        )}
                                   </Form>
                              )}
                         </Formik>
                    </div>
               </div>
          </div>
     );
};

export default Metal;
