import React, { useEffect, useState } from 'react';
import { getRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import PageLoader from '../../component/loaders/PageLoader';
import TableWithPagination from '../../component/form/Table';
import { getTablePages } from '../../utils/getTablePages';
import { getSubsidiariesByIdEndpoint } from '../../utils/apis/subsidiaryApiRequests';

const Subsidiary = () => {
     const columns = ['Id', 'Subsidiary Name', 'ShopAct No.', 'Gst No.', 'Address', 'City', 'Pincode', 'Brand Id', 'Brand Name'];
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [loader, setLoader] = useState(false);
     const [rows, setRows] = useState([]);
     const [totalRows, setTotalRows] = useState(1);
     const [page, setPage] = useState(1);
     const getSubsidaries = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getSubsidiariesByIdEndpoint(page), navigate, enqueueSnackbar);
               setLoader(false);
               // setRows(data.content);
               responseToRows(data.content);
               setTotalRows(data.totalElements);
          } catch (e) {
               setLoader(false);
               console.log(e);
          }
     };

     const responseToRows = data => {
          let temp = [];
          data.map((each, index) => {
               temp[index] = {
                    Id: each.idxId,
                    subsidiaryName: each.subsidiaryName,
                    shopact: each.shopActNumber,
                    gst: each.gstin,
                    address: each.address,
                    city: each.city,
                    pincode: each.pinCode,
                    brandId: each.brand.brandId,
                    brandName: each.brand.name,
               };
          });
          setRows(temp);
     };

     useEffect(() => {
          getSubsidaries(0);
     }, []);
     return (
          <div>
               <PageTitle title="Subsidaries" />
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
                         }}
                    />
               )}
          </div>
     );
};

export default Subsidiary;
