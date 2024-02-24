import React, { useEffect, useState } from 'react';
import { getRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import PageLoader from '../../component/loaders/PageLoader';
import Switch from '../../component/form/Switch';
import TableWithPagination from '../../component/form/Table';
import { getTablePages } from '../../utils/getTablePages';
import { getSubsidiariesByIdEndpoint } from '../../utils/apis/subsidiaryApiRequests';
import { subsidiaryEndPoints } from '../../utils/endpoints/subsidiaryEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ViewButton from '../../component/edit/ViewButton';
import TableTitle from '../../component/TableTitle';
import { getMetalStockEndPoint, getMetalsByBrand } from '../../utils/apis/metalApiRequest';
import { getCookiesObject } from '../../utils/getCookiesObject';
import UomBadge from '../../component/badges/UomBadge';
import SilverBadge from '../../component/badges/SilverBadge';
import { Field } from 'formik';

const MetalStock = () => {
     const columns = ['Metal', 'Metal Id', 'Rate', 'Openeing Weight', 'Closing Weight'];
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [cookies, setCookies] = useState(getCookiesObject());
     const [loader, setLoader] = useState(false);
     const [rows, setRows] = useState([]);
     const [totalRows, setTotalRows] = useState(1);
     const [page, setPage] = useState(1);

     /**
      *
      * @param {Number} page
      *to get all metals data
      */
     const getMetalStock = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getMetalStockEndPoint(page), navigate, enqueueSnackbar);
               setLoader(false);
               responseToRows(data.content);
               setTotalRows(data.totalElements);
          } catch (e) {
               setLoader(false);
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
                    metalName:
                         each.metal.metalName.charAt(0).toLowerCase() === 'g' ? (
                              <UomBadge code={each.metal.metalName} />
                         ) : (
                              <SilverBadge code={each.metal.metalName} />
                         ),
                    metalId: each.metal.metalId,
                    metalRate: <h4>₹{each.metal.metalRate}</h4>,
                    openingBalance: each.openingWeight,
                    closingBalance: each.closingWeight,
               };
          });

          setRows(temp);
     };

     useEffect(() => {
          getMetalStock(0);
     }, []);
     return (
          <div>
               <TableTitle pageTitle={'Metals Stock'} to={'/metal-stock'} buttonTitle={'+Add'} back={'/metal'} />

               <div
                    className="container w-100 p-5 card "
                    style={{ height: '100px', marginLeft: '50px', padding: '20px', width: '96%', marginTop: '40px' }}
               >
                    <div className="row">
                         <div className="col-md-5">
                              <div className="form-group">
                                   <label className="form-control-label" htmlFor="input-name">
                                        Unit Code (eg gm, ct etc)
                                   </label>
                                   <input className="form-control" id="uomCode" name="uomCode" placeholder="Unit Code" />
                              </div>
                         </div>
                         <div className="col-lg-5">
                              <div className="form-group">
                                   <label className="form-control-label" htmlFor="input-email">
                                        Unit Name(eg: gram, carat, etc)
                                   </label>
                                   <input className="form-control" id="uomName" name="uomName" placeholder="Unit Name" />
                              </div>
                         </div>
                         <div className="col-lg-2">
                              <div className="form-group">
                                   <label className="form-control-label" style={{ marginTop: '50px' }} htmlFor="input-email"></label>
                                   <input className="form-control" id="uomName" value="Add" name="uomName" type="submit" />
                              </div>
                         </div>
                    </div>
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

export default MetalStock;
