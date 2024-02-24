import React, { useEffect, useState } from 'react';
import { getRequest, postRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import PageLoader from '../../component/loaders/PageLoader';
import TableWithPagination from '../../component/form/Table';
import { getTablePages } from '../../utils/getTablePages';
import { showSuccessSnackbar } from '../../utils/snackBar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getAllMetalsByBrand } from '../../utils/apis/metalApiRequest';
import { getCookiesObject } from '../../utils/getCookiesObject';
import UomBadge from '../../component/badges/UomBadge';
import SilverBadge from '../../component/badges/SilverBadge';
import { getAlCategoriesPagesById } from '../../utils/apis/itemCategoryApiRequest';
import { articleCategoryEndpoints } from '../../utils/endpoints/articleCategoryEndpoints';
import { articleCategoryValidationSchema } from '../../validation/articleCategory';

const ArticleCategory = () => {
     const columns = ['Sr No', 'Category name', 'Metal'];
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [cookies, setCookies] = useState(getCookiesObject());
     const [loader, setLoader] = useState(false);
     const [rows, setRows] = useState([]);
     const [totalRows, setTotalRows] = useState(1);
     const [page, setPage] = useState(1);
     const [isEditing, setIsEditing] = useState(false);
     const [metals, setMetals] = useState([]);
     const [refresh, setRefresh] = useState(false);
     /**
      *
      * @param {Number} page
      *to get all metals data
      */
     const getCategories = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getAlCategoriesPagesById(page), navigate, enqueueSnackbar);
               setLoader(false);
               responseToRows(data.content);
               setTotalRows(data.totalElements);
          } catch (e) {
               setLoader(false);
               console.log(e);
          }
     };

     /**
      * Used to fetch metal data
      */
     const getMetalsOptions = async () => {
          try {
               const data = await getRequest(getAllMetalsByBrand(), navigate, enqueueSnackbar);
               setMetals(data);
          } catch (e) {
               console.log(e);
          }
     };

     const submitHandeler = async values => {
          try {
               const dto = {
                    ...values,
                    brandId: cookies.brandId,
                    userId: cookies.idxId,
               };
               const data = await postRequest(dto, articleCategoryEndpoints.BASE_ROUTE, navigate, enqueueSnackbar);
               showSuccessSnackbar('don', enqueueSnackbar);
               // const data = await postRequest();
               setIsEditing(false);
               setRefresh(!refresh);
          } catch (e) {
               console.log(e);
          }
     };
     /**
      *
      * @param {*} data
      * Used to map And convert Response rate of Api to column of Table
      * also used switch fpr active/inActive status
      */
     const responseToRows = data => {
          let temp = [];
          data.map((each, index) => {
               temp[index] = {
                    srNo: index,
                    categoryName: each.categoryName,
                    metalName:
                         each.metal.metalName.charAt(0).toLowerCase() === 'g' ? (
                              <UomBadge code={each.metal.metalName} />
                         ) : (
                              <SilverBadge code={each.metal.metalName} />
                         ),
               };
          });

          setRows(temp);
     };

     useEffect(() => {
          getMetalsOptions();
     }, []);

     useEffect(() => {
          getCategories(0);
     }, [refresh]);

     return (
          <div>
               {/* <TableTitle pageTitle={'Metals Stock'} to={'/metal-stock'} buttonTitle={'+Add'} back={'/metal'} /> */}
               <PageTitle title={'Article Category'} />
               <div
                    className="container w-100 p-5 card "
                    style={{ height: 'auto', marginLeft: '50px', padding: '10px', width: '96%', marginTop: '30px' }}
               >
                    <Formik
                         initialValues={{
                              metalId: '',
                              categoryName: '',
                         }}
                         enableReinitialize
                         validationSchema={articleCategoryValidationSchema}
                         onSubmit={values => {
                              submitHandeler(values);
                         }}
                    >
                         {({ isSubmitting, setFieldValue }) => (
                              <Form>
                                   <h5 className="heading-small text-muted mb-4 ">Category Information</h5>
                                   <div className="row">
                                        <div className="col-lg-5">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-weight">
                                                       Category Name
                                                  </label>
                                                  <Field
                                                       className="form-control"
                                                       id="categoryName"
                                                       name="categoryName"
                                                       placeholder="Category Name"
                                                       disabled={!isEditing}
                                                  />
                                                  <ErrorMessage name="categoryName" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div className="col-lg-5">
                                             <div className="form-group">
                                                  <label className="form-control-label" htmlFor="input-metalId">
                                                       Select Metal
                                                  </label>
                                                  <Field
                                                       as="select"
                                                       className="form-control"
                                                       id="metalId"
                                                       placeholder="metal"
                                                       name="metalId"
                                                       disabled={!isEditing}
                                                       onChange={async e => {
                                                            setFieldValue('metalId', Number(e.target.value));
                                                            // await getSubsidiaries(e.target.value);
                                                       }}
                                                  >
                                                       <option value="">Select Metal</option>

                                                       {metals?.length > 0 &&
                                                            metals.map(each => (
                                                                 <option value={each.metalId} key={each.metalName}>
                                                                      {each.metalName}
                                                                 </option>
                                                            ))}
                                                  </Field>
                                                  <ErrorMessage name="metalId" component="div" className="text-danger" />
                                             </div>
                                        </div>
                                        <div>
                                             <div className="form-group">
                                                  {isEditing && (
                                                       <button type="submit" className="submit-button" style={{ width: '8rem', marginTop: '1.5rem' }}>
                                                            Add
                                                       </button>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              </Form>
                         )}
                    </Formik>
                    {!isEditing && (
                         <button
                              className="submit-button"
                              onClick={() => {
                                   setIsEditing(true);
                              }}
                         >
                              + Add Entry
                         </button>
                    )}
               </div>

               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getMetalStock(newPage - 1);
                         }}
                    />
               )}
          </div>
     );
};

export default ArticleCategory;
