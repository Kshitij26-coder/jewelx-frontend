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
import { getSubsidiaryMaintenanceById } from '../../utils/apis/subsidiaryMaintenanceApiRequest';

const SubsidiaryMaintain = () => {
     const columns = ['Id', 'Maintanence Description', 'Amount', 'Created By Id', 'User Id', 'Brand Id.', 'Subsidiary Id'];
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
     const getSubsidiaryMaintences = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getSubsidiaryMaintenanceById(page), navigate, enqueueSnackbar);
               //console.log(data);
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
          //console.log(data);
          let temp = [];
          data.map((each, index) => {
               temp[index] = {
                    // view: <ViewButton to={`/maintenance/update/${each.maintenanceId}`} />,
                    Id: each.idxId,
                    desc: each.maintenanceDescription,
                    accId: -1 * each.accounting.transactAmount,
                    created: each.createdBy.username,
                    id: each.createdBy.userId,
                    brandId: each.brand,
                    subsidiaryId: each.subsidiary.subsidiaryName,
               };
          });
          //console.log(temp);
          setRows(temp);
     };

     useEffect(() => {
          getSubsidiaryMaintences(0);
     }, []);
     return (
          <div>
               <TableTitle pageTitle={'Subsidiary Maintainance'} to={'/maintenance/add'} buttonTitle={'+Add'} back={'/'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getSubsidiaryMaintences(newPage - 1);
                              setPage(newPage);
                         }}
                    />
               )}
          </div>
     );
};

export default SubsidiaryMaintain;
