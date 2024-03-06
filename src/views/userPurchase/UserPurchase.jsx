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
import { userPurchasesEndPoints } from '../../utils/endpoints/userPurchaseEndPoints';

const UserPurchase = () => {
     const columns = [
          'Metal Name',
          'Customer Name',
          'Customer Id',
          'Purity',
          'Net Weight',
          'Gross Weight',
          'Article Description',
          'Metal Rate',
          'Total Amount',
          'Accounting',
          'Subsidiary Name',
     ];
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [cookies, setCookies] = useState(getCookiesObject());
     const [loader, setLoader] = useState(false);
     const [rows, setRows] = useState([]);
     const [totalRows, setTotalRows] = useState(1);
     const [page, setPage] = useState(1);

     const getAllUserPurchaseInfo = async page => {
          try {
               setLoader(true);
               const data = await getRequest(
                    `${userPurchasesEndPoints.BASE_URL}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&brand=${
                         cookies.brandId
                    }&subsidiary=${1}&role=${cookies.role}`,
                    navigate,
                    enqueueSnackbar,
               );
               // console.log(data);
               setLoader(false);
               responseToRows(data.content);
               setTotalRows(data.totalElements);
          } catch (e) {
               setLoader(false);
               console.error(e);
          }
     };

     const responseToRows = data => {
          let temp = [];
          data.map((each, index) => {
               temp[index] = {
                    metalName: each.metal.metalName,
                    custname: each.customer.name,
                    custId: each.customer.idx_id,
                    purity: each.purity,
                    netweight: each.netWeight,
                    Grosswt: each.grossWeight,
                    ArticleDesc: each.articleDescription,
                    Metalrate: each.metalRate,
                    Totalamt: each.totalAmount,
                    Accounting: each.accounting,
                    Subsidiaryname: each.subsidiary.subsidiaryName,
               };
          });
          setRows(temp);
     };

     useEffect(() => {
          getAllUserPurchaseInfo(0);
     }, []);

     return (
          <div>
               <TableTitle pageTitle={'User Purchase'} to={'/user-purchase/add'} buttonTitle={'+Add'} back={'/user-purchase'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getAllUserPurchaseInfo(newPage - 1);
                              setPage(newPage);
                         }}
                    />
               )}
          </div>
     );
};

export default UserPurchase;
