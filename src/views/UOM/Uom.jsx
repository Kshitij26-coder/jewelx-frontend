import React, { useEffect, useState } from 'react';
import { getRequest } from '../../utils/apis/apiRequestHelper';
import { getAllUomEndPoints } from '../../utils/apis/uomApiRequest';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import PageTitle from '../../component/PageTitle';
import PageLoader from '../../component/loaders/PageLoader';
import TableWithPagination from '../../component/form/Table';
import { getTablePages } from '../../utils/getTablePages';
import UomBadge from '../../component/badges/UomBadge';
import ViewButton from '../../component/edit/ViewButton';
import TableTitle from '../../component/TableTitle';

const Uom = () => {
     const columns = ['View', 'Id', 'Code', 'Name', 'Description'];
     const navigate = useNavigate();
     const { enqueueSnackbar } = useSnackbar();
     const [loader, setLoader] = useState(false);
     const [rows, setRows] = useState([]);
     const [totalRows, setTotalRows] = useState(1);
     const [page, setPage] = useState(1);
     const getUom = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getAllUomEndPoints(page), navigate, enqueueSnackbar);
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
               each.uomCode = <UomBadge code={each.uomCode} />;
               temp[index] = {
                    view: <ViewButton to={`/uom/update/${each.uomId}`} />,
                    ...each,
               };
          });
          setRows(temp);
     };

     useEffect(() => {
          getUom(0);
     }, []);
     return (
          <div>
               <TableTitle pageTitle={'Unit of Measurement'} to={'/uom/add'} buttonTitle={'+Add'} back={'/uom'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getUom(newPage - 1);
                         }}
                    />
               )}
          </div>
     );
};

export default Uom;
