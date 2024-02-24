import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profilevalidation } from '../../validation/profilevalidation';
import '../../styles/style.css';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { roles } from '../../utils/roles';
import { getRolesfromAbbrev } from '../../utils/getRolesfromAbbrev';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { putRequest } from '../../utils/apis/apiRequestHelper';
import { userEndpoints } from '../../utils/endpoints/userEndpoints';
import { useSnackbar } from 'notistack';
import ButtonLoader from '../../component/loaders/ButtonLoader';

const Profile = () => {
     const [isEditing, setIsEditing] = useState(false);
     const [formData, setFormData] = useState(null);
     const [cookiesData, setCookiesData] = useState({});
     const [initialValues, setInitialValues] = useState({});
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);
     const handleSubmit = async values => {
          // Handle form submission
          try {
               const dto = {
                    username: values.userName,
                    mobilenumber: values.mobileNumber,
                    userId: cookiesData.idxId,
                    brandId: cookiesData.brandId,
                    role: cookiesData.role,
                    brandName: values.brand,
               };
               const data = await putRequest('', dto, userEndpoints.BASE_ROUTE, navigate, enqueueSnackbar);
               //showSuccessSnackbar(data, enqueueSnackbar);
               Cookies.set(
                    'user',
                    JSON.stringify({
                         ...cookiesData,
                         username: values.userName,
                         mobileNumber: values.mobileNumber,
                         brand: { ...cookiesData.brand, name: values.brand },
                    }),
                    { expires: 3 },
               );
               setSubmitting(false);
               setFormData(values);
               setIsEditing(false);
          } catch (e) {
               setIsEditing(false);
               console.log(e);
          }
     };

     const handleLogout = async () => {
          setButtonLoader(true);
          // Handle logout functionality
          await putRequest(getCookiesObject().userId, {}, userEndpoints.LOGOUT, navigate, enqueueSnackbar);
          Cookies.remove('user');
          setButtonLoader(false);
          navigate('/home');
     };

     const handleEdit = () => {
          setIsEditing(true);
     };
     useEffect(() => {
          setCookiesData(getCookiesObject());
          let data = getCookiesObject();
          // console.log(data);
          setInitialValues({
               userName: data?.username,
               email: data?.email,
               mobileNumber: data?.mobileNumber,
               userRole: data?.role,
               brand: data?.brand?.name,
               subsidiary: data?.subsidiaryId,
               aboutMe: `Hello, I'm ${data?.username}. With a focus on ${data?.role}, I bring expertise in ${data?.brandDetails?.name} and ${data?.subsidiaryDetails?.subsidiaryId}. Reach out to me via email at ${data?.email} or call me on ${data?.mobileNumber}. Let's collaborate and drive success together.`,
          });
     }, []);

     return (
          <div className="container" style={{ marginTop: '100px' }}>
               <div className="row">
                    <div className="col-md-3 col-sm-12 col-xs-12" style={{ width: '40%', paddingRight: '1px' }}>
                         <div className="col-md-12">
                              <div className="card">
                                   <div className="text-center">
                                        <div className="half-inside-outside ">
                                             <img
                                                  alt="..."
                                                  className="img-circle img-fluid img-thumbnail"
                                                  src="https://t4.ftcdn.net/jpg/05/47/92/27/240_F_547922755_AazNubxrYOHUF3qHpJGl7FrE564utmH5.jpg"
                                             />
                                        </div>
                                   </div>
                                   <div className="card-body " style={{ height: 'auto' }}>
                                        <div className="text-center">
                                             <h3>{cookiesData.username}</h3>
                                             <div style={{ marginBottom: '20px' }}>
                                                  <h5>Brand Name : {cookiesData?.brand?.name}</h5>
                                             </div>
                                             <div className="h5 font-weight-300">
                                                  <i className="glyphicon glyphicon-map-marker" />
                                                  {getRolesfromAbbrev(cookiesData?.role)}
                                             </div>
                                             <div className="h5">
                                                  <i className="glyphicon glyphicon-briefcase" /> {cookiesData?.email}
                                             </div>

                                             <div style={{ marginTop: '20px' }}>
                                                  <button className="btn btn-danger btn-lg" onClick={handleLogout}>
                                                       {buttonLoader ? (
                                                            <ButtonLoader />
                                                       ) : (
                                                            <>
                                                                 <ExitToAppIcon />
                                                                 Logout
                                                            </>
                                                       )}
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="col-md-9 col-sm-12 col-xs-12" style={{ width: '60%' }}>
                         <div>
                              <div className="w-100 p-5 card " style={{ padding: '20px' }}>
                                   <IconButton type="button" onClick={handleEdit} aria-label="edit" style={{ marginLeft: '90%' }}>
                                        <EditIcon />
                                   </IconButton>
                                   <Formik
                                        initialValues={initialValues}
                                        enableReinitialize
                                        validationSchema={profilevalidation}
                                        onSubmit={values => handleSubmit(values)}
                                   >
                                        {({ isSubmitting }) => (
                                             <Form>
                                                  <h5 className="heading-small text-muted mb-4 ">User information</h5>
                                                  <div className="pl-md-4">
                                                       <div className="row">
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-name">
                                                                           Name
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-name"
                                                                           name="userName"
                                                                           placeholder="Name"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="userName" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-email">
                                                                           Email
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-email"
                                                                           name="email"
                                                                           placeholder="Email"
                                                                           disabled={true}
                                                                      />
                                                                      <ErrorMessage name="email" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-mobileno">
                                                                           Mobile No
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-mobileno"
                                                                           name="mobileNumber"
                                                                           placeholder="Mobile No"
                                                                           disabled={!isEditing}
                                                                      />
                                                                      <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-userrole">
                                                                           User Role
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-userrole"
                                                                           name="userRole"
                                                                           placeholder="User Role"
                                                                           disabled={true}
                                                                      />
                                                                      <ErrorMessage name="userRole" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-brand">
                                                                           Brand
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-brand"
                                                                           name="brand"
                                                                           placeholder="Brand"
                                                                           disabled={!(isEditing && getCookiesObject().role == roles.owner)}
                                                                      />
                                                                      <ErrorMessage name="brand" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>

                                                            <div className="col-lg-6">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="input-subsidiary">
                                                                           Subsidiary
                                                                      </label>
                                                                      <Field
                                                                           className="form-control"
                                                                           id="input-subsidiary"
                                                                           name="subsidiary"
                                                                           placeholder="Subsidiary"
                                                                           disabled={true}
                                                                      />

                                                                      <ErrorMessage name="subsidiary" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>

                                                            <hr className="my-4" />
                                                            <h5 className="heading-small text-muted mb-4 " style={{ marginLeft: '15px' }}>
                                                                 About Me
                                                            </h5>
                                                            <div className="col-lg-12">
                                                                 <div className="form-group">
                                                                      <label className="form-control-label" htmlFor="aboutMe">
                                                                           About Me
                                                                      </label>
                                                                      <Field
                                                                           as="textarea"
                                                                           className="form-control"
                                                                           id="aboutMe"
                                                                           name="aboutMe"
                                                                           placeholder="A few words about you ..."
                                                                           rows="4"
                                                                           disabled={true}
                                                                      />
                                                                      <ErrorMessage name="aboutMe" component="div" className="text-danger" />
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  {/* Submit button */}
                                                  {isEditing && (
                                                       <button type="submit" className="btn btn-primary btn-lg" disabled={false}>
                                                            Submit
                                                       </button>
                                                  )}
                                             </Form>
                                        )}
                                   </Formik>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Profile;
