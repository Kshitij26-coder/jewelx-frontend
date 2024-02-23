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
import { getMetalsByBrand } from '../../utils/apis/metalApiRequest';
import { getCookiesObject } from '../../utils/getCookiesObject';

const Metal = () => {
     const columns = ['View', 'Metal Name', 'Rate', 'Description'];
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
     const getMetals = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getMetalsByBrand(page), navigate, enqueueSnackbar);
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
                    view: <ViewButton to={`/metal/update/${each.metalId}`} />,
                    metalName: each.metalName,
                    metalRate: each.metalRate,
                    metalDesc: each.metalDescription,
               };
          });

          setRows(temp);
     };

     useEffect(() => {
          getMetals(0);
     }, []);
     return (
          <div>
               <TableTitle pageTitle={'Metals'} to={'/metal/add'} buttonTitle={'+Add'} back={'/metal'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getMetals(newPage - 1);
                         }}
                    />
               )}
          </div>
     );
};

export default Metal;
