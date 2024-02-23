import React, { useEffect, useState } from 'react';
import PageTitle from '../../component/PageTitle';
import { getRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { userEndpoints } from '../../utils/endpoints/userEndpoints';
import { getUsersPaginatedEndpoint } from '../../utils/apis/userApiRequests';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import TableWithPagination from '../../component/form/Table';
import Badge from '../../component/badges/Badge';
import Indicator from '../../component/badges/Indicator';
import Switch from '../../component/form/Switch';
import PageLoader from '../../component/loaders/PageLoader';
import { getTablePages } from '../../utils/getTablePages';
import { getCookiesObject } from '../../utils/getCookiesObject';

const Users = () => {
     const columns = ['Email', 'Name', 'Mobile', 'Subsidiary', 'Role', 'IsActive', 'IsLoggedIn'];
     const { enqueueSnackbar } = useSnackbar();
     const [rows, setRows] = useState([]);
     const navigate = useNavigate();
     const [loader, setLoader] = useState(false);
     const [page, setPage] = useState(1);
     const [totalRows, setTotalRows] = useState(1);

     /**
      *
      * @param {*} data //API response data
      * used to convert reponse object to rows object
      */
     const reponseToColoumns = data => {
          let arr = [];
          //console.log(data);
          data.map((each, index) => {
               const temp = {
                    email: each?.email,
                    name: each?.userName,
                    mobile: each?.mobileNumber,
                    subsidiary: each?.subsidiary?.subsidiaryName,
                    role: <Badge role={each?.userRole} />,
                    isActive: (
                         <Switch
                              checked={each.active}
                              onChange={async (e, value) => {
                                   await setUserActive({ assigneeId: each.idxId, assignerId: getCookiesObject().idxId });
                              }}
                         />
                    ),
                    isLoggedIn: <Indicator isLoggedIn={each.loggedIn} />,
               };
               arr[index] = temp;
          });
          // console.log(arr);
          setRows(arr);
     };

     /**
      *
      * @param {String} id //uuid of the user
      * API call used activate/disable user
      */
     const setUserActive = async data => {
          await putRequest('', data, userEndpoints.ACTIVATE_USER, navigate, enqueueSnackbar);
     };

     /**
      *
      * @param {int} page
      * get users data according to page number
      */
     const getUsers = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getUsersPaginatedEndpoint(userEndpoints.BASE_ROUTE, page), navigate, enqueueSnackbar);
               setTotalRows(data.totalElements);
               reponseToColoumns(data.content);
               setLoader(false);
          } catch (e) {
               setLoader(false);
               console.log(e);
          }
     };

     useEffect(() => {
          getUsers(0);
     }, []);

     return (
          <div>
               <PageTitle title="Users" />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              setPage(newPage);
                              getUsers(newPage - 1);
                         }}
                    />
               )}
          </div>
     );
};

export default Users;
