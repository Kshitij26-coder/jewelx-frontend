import React, { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { userValidationSchema } from '../validation/userValidationSchema';
import './style.css';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { showErrorSnackbar, showSuccessSnackbar } from '../utils/snackBar';
import { Link } from 'react-router-dom';
import ButtonLoader from './loaders/ButtonLoader';
import { getRequest, postRequest } from '../utils/apis/apiRequestHelper';
import { userEndpoints } from '../utils/endpoints/userEndpoints';
import { brandEndpoints } from '../utils/endpoints/BrandEndPoints';
import Footer from './Footer';
import roles from '../utils/roles';

export default function Registrationpage() {
     const { enqueueSnackbar } = useSnackbar();
     const navigate = useNavigate();
     const [loader, setLoader] = useState(false);

     //used to dynamically show the brand input feild
     const [showBrandForOwner, setShowBrandForOwner] = useState(false);
     const [brandOptions, setBrandOptions] = useState([]);

     /**
      * used to get brand and populate the brand feild
      */
     const getBrands = async () => {
          try {
               const data = await getRequest(brandEndpoints.ALL_BRAND, navigate, enqueueSnackbar);
               setBrandOptions(data);
          } catch (e) {
               console.log(e);
               showErrorSnackbar('error in populating Brands', enqueueSnackbar);
          }
     };

     /**
      *
      * @param {*} values
      * hanlde the what to do after onSubmit event
      */
     const onSubmitHandelr = values => {
          try {
               setLoader(true);
               postRequest(values, userEndpoints.BASE_ROUTE, navigate, enqueueSnackbar);
               showSuccessSnackbar('success', enqueueSnackbar);
               setLoader(false);
               navigate('/login');
          } catch (e) {
               setLoader(false);
               console.log(e);
               showErrorSnackbar('error in creating user', enqueueSnackbar);
          }
     };

     useEffect(() => {
          getBrands();
     }, []);

     return (
          <div>
               <div className="registration-form">
                    <Formik
                         initialValues={{
                              brandName: '',
                              brandDescription: '',
                              userName: '',
                              email: '',
                              mobileNumber: '',
                              password: '',
                              confirmPassword: '',
                              userRole: '',
                         }}
                         validationSchema={userValidationSchema}
                         onSubmit={async values => {
                              onSubmitHandelr(values);
                         }}
                    >
                         {({ errors, touched, isValid, setFieldValue }) => (
                              <Form>
                                   <div className="social-media">
                                        <h3> Signup </h3>
                                        <h6> with Jewelx</h6>
                                   </div>
                                   <div className="form-group" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="email" placeholder="Email" name="email" />
                                        {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                                   </div>

                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="userName" placeholder="Full Name " name="userName" />
                                        {errors.userName && touched.userName ? <div className="error">{errors.userName}</div> : null}
                                   </div>

                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="tel" className="form-control item" id="mob" placeholder="Mobile No" name="mobileNumber" />
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
                                                  e.target.value === roles.admin ? setShowBrandForOwner(true) : setShowBrandForOwner(false);
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
                                             <Field
                                                  type="text"
                                                  className="form-control item"
                                                  id="brandName"
                                                  placeholder="Brand Name"
                                                  name="brandName"
                                             />
                                        ) : (
                                             <Field
                                                  as="select"
                                                  className="form-control item"
                                                  id="brandName"
                                                  placeholder="Brand Name"
                                                  name="brandName"
                                             >
                                                  <option value="">Select Brand</option>
                                                  {brandOptions.length > 0 &&
                                                       brandOptions.map(each => (
                                                            <option value={each.brandId} key={each.brandId}>
                                                                 {each.name}
                                                            </option>
                                                       ))}
                                             </Field>
                                        )}
                                        {errors.brandName && touched.brandName ? <div className="error">{errors.brandName}</div> : null}
                                   </div>
                                   {showBrandForOwner && (
                                        <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
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
                                        </div>
                                   )}
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field type="text" className="form-control item" id="pass" placeholder="Password" name="password" />
                                        {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                                   </div>
                                   <div className="form-group mb-10" style={{ marginBottom: '25px' }}>
                                        <Field
                                             type="text"
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
                                        <button type="submit" className="btn btn-block create-account" disabled={!isValid}>
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
