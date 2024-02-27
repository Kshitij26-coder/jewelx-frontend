import React, { useEffect, useState } from 'react';
import { getRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageLoader from '../../component/loaders/PageLoader';
import Switch from '../../component/form/Switch';
import TableWithPagination from '../../component/form/Table';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { getTablePages } from '../../utils/getTablePages';
import { getSubsidiariesByIdEndpoint } from '../../utils/apis/subsidiaryApiRequests';
import { subsidiaryEndPoints } from '../../utils/endpoints/subsidiaryEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import PageTitle from '../../component/PageTitle';
import { getAllSales } from '../../utils/apis/salesApiRequest';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { getPaymentMode } from '../../utils/getPaymentMode.jsx';

const Sales = () => {
     const columns = [
          'Sale Id',
          'Customer Id',
          'Customer Name',
          'Subsidiary Name',
          'Transaction Mode',
          'Customer Order Id',
          'Accounting Id',
          'cgst',
          'sgst',
          'Discount',
          'Net Amount',
          'Payable Amount',
          'Invoice',
     ];
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
     const getSales = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getAllSales(page), navigate, enqueueSnackbar);
               //     console.log(data);
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
                    // view: <ViewButton to={`/subsidiary/update/${each.subsidiaryId}`} />,
                    Id: each.saleIdxId,
                    custId: each.customer.idx_id,
                    custname: <h4>{each.customer.name}</h4>,
                    subsidiaryName: <h4>{each.subsidiary.subsidiaryName}</h4>,
                    transMode: getPaymentMode(each.accounting.transactionMode),
                    custOrderId: each.customerOrderid ? each.customerOrderid : 'NA',
                    accId: each.accounting.id,
                    cgst: `₹${each.cgst}`,
                    sgst: `₹${each.sgst}`,
                    dis: <h4>{`₹${each.discount}`}</h4>,
                    netAmt: <h4>{`₹${each.netAmount}`}</h4>,
                    payAmt: <h4>{`₹${each.payableAmount}`}</h4>,
                    invoice: (
                         <Link to={`/invoice/${each.saleId}`}>
                              {' '}
                              <ReceiptIcon fontSize="large" />
                         </Link>
                    ),
               };
          });
          setRows(temp);
     };

     useEffect(() => {
          getSales(0);
     }, []);
     return (
          <div>
               {/* <TableTitle pageTitle={'Sales'} to={'/subsidiary/add'} buttonTitle={'+Add'} back={'/subsidiary'} /> */}
               <PageTitle title={'Sales'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getSales(newPage - 1);
                              setPage(newPage);
                         }}
                    />
               )}
          </div>
     );
};

export default Sales;
