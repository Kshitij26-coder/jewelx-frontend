import React, { useEffect, useState } from 'react';
import { getRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageLoader from '../../component/loaders/PageLoader';
import TableWithPagination from '../../component/form/Table';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { getTablePages } from '../../utils/getTablePages';
import { getSubsidiariesByIdEndpoint } from '../../utils/apis/subsidiaryApiRequests';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ViewButton from '../../component/edit/ViewButton';
import TableTitle from '../../component/TableTitle';
import PageTitle from '../../component/PageTitle';
import { getAccountingPagesById } from '../../utils/apis/accountingApiRequest';
import UomBadge from '../../component/badges/UomBadge';
import SilverBadge from '../../component/badges/SilverBadge';

const Accounting = () => {
     const columns = [
          'Id',
          'Opening Bal',
          'Closing Bal',
          'Transaction Bal',
          'Transaction Type',
          'Date',
          'Mode',
          'Cheque No',
          'Cheque Amt.',
          'Cash Amt.',
          'UTR',
          'Net Baking Amt',
          'Description',
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
     const getAccounts = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getAccountingPagesById(page), navigate, enqueueSnackbar);
               setLoader(false);
               console.log(data);
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
                    id: each.id,
                    openigBalance: <h4>₹{each.openigBalance}</h4>,
                    closingBalance: <h4>₹{each.closingBalance}</h4>,
                    transactionAmount: each.transactionAmount,
                    transactionType: each.transactionType == 'c' ? <UomBadge code={'credit'} /> : <SilverBadge code={'debit'} />,
                    transactionDate: each.transactionDate,
                    transactionMode: each.transactionMode,
                    chequeNo: each.chequeNo ? each.chequeNo : 'NA',
                    chequeAmount: each.chequeAmount ? each.chequeAmount : 'NA',
                    cashAmount: each.cashAmount ? each.cashAmount : 'NA',
                    netBankingUTR: each.netBankingUTR ? each.netBankingUTR : 'NA',
                    netBankingAmount: each.netBankingAmount ? each.netBankingAmount : 'NA',
                    description: each.description,
               };
          });
          setRows(temp);
     };

     useEffect(() => {
          console.log(getAccountingPagesById(page));
          getAccounts(0);
     }, []);
     return (
          <div>
               <PageTitle title={'Accounts'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getAccounts(newPage - 1);
                         }}
                    />
               )}
          </div>
     );
};

export default Accounting;
