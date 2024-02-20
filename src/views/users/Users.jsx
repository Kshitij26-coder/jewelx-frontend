import React, { useEffect, useState } from 'react';
import PageTitle from '../../component/PageTitle';
import { getRequest } from '../../utils/apis/apiRequestHelper';
import { userEndpoints } from '../../utils/endpoints/userEndpoints';
import { getUsersPaginatedEndpoint } from '../../utils/apis/userApiRequests';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import TableWithPagination from '../../component/form/Table';
import { roles } from '../../utils/roles';
import Badge from '../../component/badges/Badge';
import Indicator from '../../component/badges/Indicator';

const Users = () => {
     const columns = ['Email', 'Name', 'Mobile', 'Subsidiary', 'Role', 'IsActive', 'IsLoggedIn'];
     const { enqueSnackbar } = useSnackbar();
     const [rows, setRows] = useState([]);
     const navigate = useNavigate();
     const getUsers = async page => {
          try {
               const data = await getRequest(getUsersPaginatedEndpoint(userEndpoints.BASE_ROUTE, 0), navigate, enqueSnackbar);
               console.log(data.content);
               data1(data.content);
          } catch (e) {
               console.log(e);
          }
     };

     const data1 = data => {
          let arr = [];
          console.log(data);
          data.map((each, index) => {
               const temp = {
                    email: each?.email,
                    name: each?.userName,
                    mobile: each?.mobileNumber,
                    subsidiary: each?.subsidiary?.subsidiaryName,
                    role: <Badge role={each?.userRole} />,
                    isActive: each.active ? 'active' : 'disabled',
                    isLoggedIn: <Indicator isLoggedIn={each.loggedIn} />,
               };
               arr[index] = temp;
          });
          console.log(arr);
          setRows(arr);
     };

     useEffect(() => {
          getUsers();
     }, []);
     return (
          <div className="container w-100">
               <PageTitle title="Users" />
               <TableWithPagination
                    columns={columns}
                    rows={rows}
                    count={10}
                    page={7}
                    onPageChange={(e, newPage) => {
                         console.log(newPage);
                    }}
               />
          </div>
     );
};

export default Users;
