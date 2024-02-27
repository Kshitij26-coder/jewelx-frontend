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

const CustomerOrder = () => {
     const columns = [
          'Metal Name',
          'Customer Name',
          'Customer Id',
          'Purity',
          'Net Weight',
          'Gross Weight',
          'Article Description',
          'Order Status ',
          'FullfillDate',
          'Order Date',
          'Subsidiary Name',
     ];
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [cookies, setCookies] = useState(getCookiesObject());
     const [loader, setLoader] = useState(false);
     const [rows, setRows] = useState([]);
     const [totalRows, setTotalRows] = useState(1);
     const [page, setPage] = useState(1);
     return (
          <div>
               <TableTitle pageTitle={'Customer Order'} to={'/customer-orders/add'} buttonTitle={'+Order'} back={'/'} />
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

export default CustomerOrder;
