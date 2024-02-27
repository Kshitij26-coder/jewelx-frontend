import React, { useEffect, useState } from 'react';
import { getRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageLoader from '../../component/loaders/PageLoader';
import TableWithPagination from '../../component/form/Table';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { getTablePages } from '../../utils/getTablePages';
import ViewButton from '../../component/edit/ViewButton';
import TableTitle from '../../component/TableTitle';
import { getCustomerById } from '../../utils/apis/customerApiRequest';

const Customer = () => {
     const columns = ['view', 'Id', 'Customer Name', ' Mobile No.', 'Opening Balance', 'Aadhar No.', 'Pan No.', 'Address', 'Pincode', 'DOB', 'DOA'];
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
     const getCustomers = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getCustomerById(page), navigate, enqueueSnackbar);
              // console.log(data);
               setLoader(false);
               responseToRows(data.content);
               setTotalRows(data.totalElements);
          } catch (e) {
               setLoader(false);
               console.error(e);
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
                    view: <ViewButton to={`/customers/update/${each.customerID}`} />,
                    Id: each.idx_id,
                    name: <h4>{each.name}</h4>,
                    moNo: each.mobileNumber,
                    OpeningBal: each.openingBalance,
                    adharNo: each.aadharId,
                    panNo: each.panId,
                    address: each.address,
                    pincode: each.pincode,
                    dob: each.dateOfBirth,
                    doa: each.anniversaryDate,
               };
          });
          setRows(temp);
     };

     useEffect(() => {
          getCustomers(0);
     }, []);
     return (
          <div>
               <TableTitle pageTitle={'Customer'} to={'/customers/add'} buttonTitle={'+Add'} back={'/'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getCustomers(newPage - 1);
                              setPage(newPage);
                         }}
                    />
               )}
          </div>
     );
};

export default Customer;
