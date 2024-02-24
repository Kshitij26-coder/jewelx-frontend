import React from 'react';

const AddMetalStock = () => {
     const [isEditing, setIsEditing] = useState(!update);
     const [cookies, setCookies] = useState(getCookiesObject());
     const { enqueueSnackbar } = useSnackbar();
     const [buttonLoader, setButtonLoader] = useState(false);
     const [uomInfo, setuomInfo] = useState({});
     const navigate = useNavigate();
     const location = useLocation();
     const currentPath = location.pathname;

     const submitHandeler = async values => {
          update ? await handleUpdateUom(values, getIdFromUrl(currentPath)) : await handleAddUom(values);
     };

     const handleAddUom = async values => {
          try {
               let dto = { ...values, brandId: cookies.brandId, userID: cookies.idxId };
               const data = await postRequest(dto, uomEndpoints.BASE_URL, navigate, enqueueSnackbar);
               showSuccessSnackbar(data, enqueueSnackbar);
               navigate('/uom');
          } catch (e) {
               console.log(e);
          }
     };

     const handleUpdateUom = async (values, uomId) => {
          try {
               setButtonLoader(true);
               let dto = { ...values, brandId: cookies.brandId, userID: cookies.idxId };
               const data = await putRequest(uomId, dto, uomEndpoints.BASE_URL, navigate, enqueueSnackbar);
               setButtonLoader(false);
               navigate('/uom');
          } catch (e) {
               setButtonLoader(false);
               console.log(e);
          }
     };

     const getUomDataById = async uomId => {
          try {
               const data = await getRequest(getUomById(uomId), navigate, enqueueSnackbar);
               setuomInfo(data);
          } catch (e) {
               console.log(e);
          }
     };

     const getIdFromUrl = url => {
          const parts = url.split('/');
          const lastPart = parts[parts.length - 1];
          return lastPart;
     };

     useEffect(() => {
          if (currentPath !== '/uom/add') getUomDataById(getIdFromUrl(currentPath));
     }, []);
     return (
          <div>
               <PageTitle title={`${update ? 'Update' : 'Add'} Unit of Measurement`} />
               <div className="container" style={{ padding: '3rem' }}>
                    <div className="w-100 p-5 card " style={{ padding: '20px' }}>
                         {update && (
                              <IconButton
                                   onClick={() => {
                                        setIsEditing(true);
                                   }}
                                   aria-label="edit"
                                   style={{ marginLeft: '90%' }}
                              >
                                   <EditIcon fontSize="large" />
                              </IconButton>
                         )}
                         <Formik
                              initialValues={update ? uomInfo : { uomCode: '', uomName: '', description: '' }}
                              enableReinitialize
                              validationSchema={uomValidationSchema}
                              onSubmit={submitHandeler}
                         >
                              {({ isSubmitting }) => (
                                   <Form>
                                        <h5 className="heading-small text-muted mb-4 ">Unit Information</h5>
                                        <div>
                                             <div className="row">
                                                  <div className="col-md-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-name">
                                                                 Unit Code (eg gm, ct etc)
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="uomCode"
                                                                 name="uomCode"
                                                                 placeholder="Unit Code"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="uomCode" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                       <div className="form-group">
                                                            <label className="form-control-label" htmlFor="input-email">
                                                                 Unit Name(eg: gram, carat, etc)
                                                            </label>
                                                            <Field
                                                                 className="form-control"
                                                                 id="uomName"
                                                                 name="uomName"
                                                                 placeholder="Unit Name"
                                                                 disabled={!isEditing}
                                                            />
                                                            <ErrorMessage name="uomName" component="div" className="text-danger" />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        {/* Submit button */}
                                        {isEditing && (
                                             <>
                                                  <hr style={{ width: '100%', background: '#1111' }} />
                                                  <div className="button-submit" style={{ marginTop: '20px', textAlign: 'center' }}>
                                                       <button type="submit" className="btn btn-block submit-button" disabled={false}>
                                                            {buttonLoader ? <ButtonLoader /> : update ? 'Update' : 'Add'}
                                                       </button>
                                                  </div>
                                             </>
                                        )}
                                   </Form>
                              )}
                         </Formik>
                    </div>
               </div>
          </div>
     );
};

export default AddMetalStock;
