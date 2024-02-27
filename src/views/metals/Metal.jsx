import React, { useEffect, useState } from 'react';
import { getRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageLoader from '../../component/loaders/PageLoader';
import TableWithPagination from '../../component/form/Table';
import { getTablePages } from '../../utils/getTablePages';
import ViewButton from '../../component/edit/ViewButton';
import TableTitle from '../../component/TableTitle';
import { getMetalsByBrand } from '../../utils/apis/metalApiRequest';
import { getCookiesObject } from '../../utils/getCookiesObject';
import UomBadge from '../../component/badges/UomBadge';
import SilverBadge from '../../component/badges/SilverBadge';

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
               //console.log(data);
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
                    view: <ViewButton to={`/metal/update/${each.metalId}`} />,
                    metalName:
                         each.metalName.charAt(0).toLowerCase() === 'g' ? <UomBadge code={each.metalName} /> : <SilverBadge code={each.metalName} />,
                    metalRate: <h4>₹{each.metalRate}</h4>,
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
                              setPage(newPage);
                         }}
                    />
               )}
          </div>
     );
};

export default Metal;
