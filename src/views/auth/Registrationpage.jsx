import React, { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { userValidationSchema } from '../../validation/userValidationSchema';
import '../../styles/style.css';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { showErrorSnackbar, showSuccessSnackbar } from '../../utils/snackBar';
import { Link } from 'react-router-dom';
import ButtonLoader from '../../component/loaders/ButtonLoader';
import { getRequest, postRequest } from '../../utils/apis/apiRequestHelper';
import { userEndpoints } from '../../utils/endpoints/userEndpoints';
import { brandEndpoints } from '../../utils/endpoints/BrandEndPoints';
import Footer from '../../component/Footer';
import { roles } from '../../utils/roles';
import { subsidiaryEndPoints } from '../../utils/endpoints/subsidiaryEndPoints';
import { getSubsidiariesByIdEndpoint } from '../../utils/apis/subsidiaryApiRequests';

export default function Registrationpage() {
     const { enqueueSnackbar } = useSnackbar();
     const navigate = useNavigate();
     const [loader, setLoader] = useState(false);

     //used to dynamically show the brand input feild
     const [showBrandForOwner, setShowBrandForOwner] = useState(false);
     const [brandOptions, setBrandOptions] = useState([]);
     const [subsidiaryOptions, setSubsidiaryOptions] = useState([]);

     /**
      * used to get brand and populate the brand feild
      */
     const getBrands = async () => {
          try {
               const data = await getRequest(brandEndpoints.ALL_BRAND, navigate, enqueueSnackbar);
               setBrandOptions(data);
          } catch (e) {
               console.log(e);
          }
     };

     /**
      *
      * @param {Number} id
      */
     const getSubsidiaries = async id => {
          try {
               const data = await getRequest(
                    getSubsidiariesByIdEndpoint(subsidiaryEndPoints.GET_SUBSIDIARIES_BY_BRAND, id),
                    navigate,
                    enqueueSnackbar,
               );
               setSubsidiaryOptions(data);
          } catch (e) {
               console.log(e);
          }
     };

     /**
      *
      * @param {*} values
      * hanlde the what to do after onSubmit event
      */
     const onSubmitHandler = async values => {
          try {
               setLoader(true);
               await postRequest(values, userEndpoints.BASE_ROUTE, navigate, enqueueSnackbar);
               showSuccessSnackbar('success', enqueueSnackbar);
               setLoader(false);
               navigate('/login');
          } catch (e) {
               setLoader(false);
               console.log(e);
          }
     };

     useEffect(() => {
         // getBrands();
     }, []);

     return (
          <div>
               <div className="registration-form">
                    <div className="section-title text-center">
                         <Link to="/home">
                              <h2>Jewelx</h2>
                         </Link>
                    </div>
                    <Formik
                         initialValues={{
                              email: '',
                              userName: '',
                              mobileNumber: '',
                              password: '',
                              confirmPassword: '',
                              userRole: '',
                              brandName: '',
                              brandDescription: '',
                              subsidiaryId: 0,
                              brandId: 0,
                         }}
                         validationSchema={userValidationSchema}
                         onSubmit={async values => {
                              onSubmitHandler(values);
                         }}
                    >
                         {({ errors, touched, isValid, setFieldValue }) => (
                              <Form>
                                   <h3 className="text-center mb-5" style={{ marginBottom: '25px' }}>
                                        Signup with Jewelx
                                   </h3>

                                   <div className="form-group" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="email" placeholder="Email" name="email" />
                                        {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                                   </div>

                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="userName" placeholder="Full Name " name="userName" />
                                        {errors.userName && touched.userName ? <div className="error">{errors.userName}</div> : null}
                                   </div>

                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field
                                             type="tel"
                                             className="form-control item"
                                             id="mobileNumber"
                                             placeholder="Mobile No"
                                             name="mobileNumber"
                                        />
                                        {errors.mobileNumber && touched.mobileNumber ? <div className="error">{errors.mobileNumber}</div> : null}
                                   </div>

                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field
                                             as="select"
                                             className="form-control item"
                                             id="userRole"
                                             placeholder="Select UserType"
                                             name="userRole"
                                             onChange={e => {
                                                  setShowBrandForOwner(e.target.value == roles.owner);
                                                  setFieldValue('userRole', e.target.value);
                                             }}
                                        >
                                             <option value="select">Select UserType</option>
                                             <option value={roles.employee}>Employee</option>
                                             <option value={roles.owner}>Owner</option>
                                             <option value={roles.admin}>Admin</option>
                                        </Field>
                                        {errors.userRole && touched.userRole ? <div className="error">{errors.userRole}</div> : null}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        {showBrandForOwner ? (
                                             <>
                                                  <Field
                                                       type="text"
                                                       className="form-control item"
                                                       id="brandName"
                                                       placeholder="Brand Name"
                                                       name="brandName"
                                                  />
                                                  {errors.brandName && touched.brandName ? <div className="error">{errors.brandName}</div> : null}
                                             </>
                                        ) : (
                                             <>
                                                  <Field
                                                       as="select"
                                                       className="form-control item"
                                                       id="brandId"
                                                       placeholder="Brand Name"
                                                       name="brandId"
                                                       onChange={async e => {
                                                            setFieldValue('brandId', Number(e.target.value));
                                                            await getSubsidiaries(e.target.value);
                                                       }}
                                                  >
                                                       <option value="">Select Brand</option>
                                                       {brandOptions.length > 0 &&
                                                            brandOptions.map(each => (
                                                                 <option value={each.brandId} key={each.brandId}>
                                                                      {each.name}
                                                                 </option>
                                                            ))}
                                                  </Field>
                                                  {errors.brandId && touched.brandId ? <div className="error">{errors.brandId}</div> : null}
                                             </>
                                        )}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        {showBrandForOwner ? (
                                             <>
                                                  <Field
                                                       type="text"
                                                       className="form-control item"
                                                       id="brandDescription"
                                                       placeholder="Brand Description"
                                                       name="brandDescription"
                                                  />
                                                  {errors.brandDescription && touched.brandDescription ? (
                                                       <div className="error">{errors.brandDescription}</div>
                                                  ) : null}
                                             </>
                                        ) : (
                                             <>
                                                  <Field
                                                       as="select"
                                                       className="form-control item"
                                                       id="subsidiaryId"
                                                       placeholder="Select Subsidiary"
                                                       name="subsidiaryId"
                                                       onChange={async e => {
                                                            setFieldValue('subsidiaryId', Number(e.target.value));
                                                       }}
                                                  >
                                                       <option value="">Select Subsidiary</option>
                                                       {subsidiaryOptions.length > 0 &&
                                                            subsidiaryOptions.map(each => (
                                                                 <option value={each.idxId} key={each.idxId}>
                                                                      {each.subsidiaryName}
                                                                 </option>
                                                            ))}
                                                  </Field>
                                                  {errors.subsidiaryId && touched.subsidiaryId ? (
                                                       <div className="error">{errors.subsidiaryId}</div>
                                                  ) : null}
                                             </>
                                        )}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="password" className="form-control item" id="password" placeholder="Password" name="password" />
                                        {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field
                                             type="password"
                                             className="form-control item"
                                             id="confirmPassword"
                                             placeholder="Confirm Password"
                                             name="confirmPassword"
                                        />
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                             <div className="error">{errors.confirmPassword}</div>
                                        ) : null}
                                   </div>
                                   <div className="form-group">
                                        <button type="submit" className="btn btn-block create-account btn btn-lg" disabled={!isValid}>
                                             {loader ? <ButtonLoader /> : 'Create Account'}
                                        </button>
                                   </div>
                                   <div className="links">
                                        <p>
                                             Already have an account? <Link to="/login">Login</Link>
                                        </p>
                                   </div>
                              </Form>
                         )}
                    </Formik>
               </div>
               <Footer />
          </div>
     );
}
