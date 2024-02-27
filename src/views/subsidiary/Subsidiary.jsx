import React, { useEffect, useState } from 'react';
import { getRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageLoader from '../../component/loaders/PageLoader';
import Switch from '../../component/form/Switch';
import TableWithPagination from '../../component/form/Table';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { getTablePages } from '../../utils/getTablePages';
import { getSubsidiariesByIdEndpoint } from '../../utils/apis/subsidiaryApiRequests';
import { subsidiaryEndPoints } from '../../utils/endpoints/subsidiaryEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ViewButton from '../../component/edit/ViewButton';
import TableTitle from '../../component/TableTitle';

const Subsidiary = () => {
     const columns = ['view', 'Id', 'Subsidiary Name', 'ShopAct No.', 'Gst No.', 'City', 'Pincode', 'Brand Id', 'Brand Name', 'Is Active'];
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
      *
      */
     const getSubsidaries = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getSubsidiariesByIdEndpoint(page), navigate, enqueueSnackbar);
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
      * @param {Boolean} status
      * @param {String} subsidiaryId
      * @param {String} userId
      * Used To set The Subsidiary Status as Active or InActive
      */
     const setisActive = async (status, subsidiaryId, userId) => {
          try {
               console.log(cookies);
               let dto = { userIdxId: userId, isActive: status, subsidiaryId: subsidiaryId };
               const data = await putRequest('', dto, subsidiaryEndPoints.ACTIVATE_STATUS, navigate, enqueueSnackbar);

               showSuccessSnackbar(data, enqueueSnackbar);
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
                    view: <ViewButton to={`/subsidiary/update/${each.subsidiaryId}`} />,
                    Id: each.idxId,
                    subsidiaryName: <h4>{each.subsidiaryName}</h4>,
                    shopact: each.shopActNumber,
                    gst: each.gstin,
                    city: each.city,
                    pincode: each.pinCode,
                    brandId: each.brand.brandId,
                    brandName: each.brand.name,
                    isActive: (
                         <Switch
                              checked={each.active}
                              onChange={async (e, value) => {
                                   await setisActive(value, each.idxId, cookies.idxId);
                              }}
                         />
                    ),
               };
          });
          setRows(temp);
     };

     useEffect(() => {
          getSubsidaries(0);
     }, []);
     return (
          <div>
               <TableTitle pageTitle={'Subsidiary'} to={'/subsidiary/add'} buttonTitle={'+Add'} back={'/'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getSubsidaries(newPage - 1);
                              setPage(newPage);
                         }}
                    />
               )}
          </div>
     );
};

export default Subsidiary;
