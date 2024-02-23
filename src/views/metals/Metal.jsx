import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { metalValidation } from '../../validation/metalValidation';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { postRequest } from '../../utils/apis/apiRequestHelper';
import { metalEndPoints } from '../../utils/endpoints/metalEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ButtonLoader from '../../component/loaders/ButtonLoader';

const Metal = () => {
     const [isEditing, setIsEditing] = useState(false);
     const navigate = useNavigate();
     const [cookies, setCookies] = useState({});
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);

     const initialValues = {
          metalName: '',
          metalRate: '',
          metalDescription: '',
     };

     const handleSubmit = async (values, { setSubmitting }) => {
          try {
            setButtonLoader(true)
               const dto = { ...values, brandId: cookies.brandId, userID: cookies.idxId };
               const data = await postRequest(dto, metalEndPoints.BASE_URL, navigate, enqueueSnackbar);
               setSubmitting(false);
               setIsEditing(false);
               //console.log(values);
               showSuccessSnackbar(data, enqueueSnackbar);
               setButtonLoader(false)
          } catch (e) {
               console.log(e);
               setButtonLoader(false)
          }
     };

     const handleEdit = () => {
          setIsEditing(true);
     };
     useEffect(() => {
          setCookies(getCookiesObject());
          // console.log(getCookiesObject());
     }, []);

     return (
          <div>
               <PageTitle title="Metal" />
               <div className="container">
                    <div className="w-100 p-5 card" style={{ padding: '20px' }}>
                         <IconButton onClick={handleEdit} aria-label="edit" style={{ marginLeft: '90%', fontSize: '1.5rem', borderRadius: 0 }}>
                              <EditIcon fontSize="medium" /> Edit
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
                                                                 className="form-control"
                                                                 id="input-metalDescription"
                                                                 name="metalDescription"
                                                                 placeholder=" Metal Description"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="metalDescription" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>

                                        <hr style={{ width: '100%', background: '#1111' }} />
                                        {isEditing && (
                                             <button type="submit" className="btn btn-block submit-button" disabled={isSubmitting}>
                                                {buttonLoader?<ButtonLoader/>:"Add"}
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
