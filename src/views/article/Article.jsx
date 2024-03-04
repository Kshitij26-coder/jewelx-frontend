import React, { useEffect, useState } from 'react';
import { getRequest, putRequest } from '../../utils/apis/apiRequestHelper';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PageTitle from '../../component/PageTitle';
import PageLoader from '../../component/loaders/PageLoader';
import Switch from '../../component/form/Switch';
import TableWithPagination from '../../component/form/Table';
import { getCookiesObject } from '../../utils/getCookiesObject';
import { getTablePages } from '../../utils/getTablePages';
import { getSubsidiariesByIdEndpoint } from '../../utils/apis/subsidiaryApiRequests';
import { subsidiaryEndPoints } from '../../utils/endpoints/subsidiaryEndPoints';
import { showSuccessSnackbar } from '../../utils/snackBar';
import ViewButton from '../../component/edit/ViewButton';
import TableTitle from '../../component/TableTitle';
import { getArticleItemsPagesById } from '../../utils/apis/articleStockApiRequests';

const Article = () => {
     const columns = ['view', 'Id', 'Article Name', 'Gross Wt', 'Net Wt', 'Purity', 'Stone Wt', 'HUID', 'category', 'status'];
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
     const getArticleItems = async page => {
          try {
               setLoader(true);
               const data = await getRequest(getArticleItemsPagesById(page), navigate, enqueueSnackbar);
               //console.log(data);
               setLoader(false);
               responseToRows(data.content);
               setTotalRows(data.totalElements);
          } catch (e) {
               setLoader(false);
               //  showSuccessSnackbar('data is empty', enqueueSnackbar);
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
                    view: <ViewButton to={`/article/update/${each.tagId}`} />,
                    Id: each.barcode,
                    subsidiaryName: <h4>{each.articleName}</h4>,
                    grossWeight: each.grossWeight,
                    netWeight: each.netWeight,
                    purity: each.purity,
                    stoneWeight: each.stoneWeight,
                    huid: each.huid,
                    category: each.categoryInfo.categoryName,
                    status:
                         each.status == 'sold' ? (
                              <div className="btn btn-danger w-100">{each.status}</div>
                         ) : (
                              <div className="btn btn-primary w-100">{each.status}</div>
                         ),
               };
          });
          setRows(temp);
     };

     useEffect(() => {
          getArticleItems(0);
     }, []);
     return (
          <div>
               <TableTitle pageTitle={'Article Stock'} to={'/article/add'} buttonTitle={'+Add'} back={'/article'} />
               {loader ? (
                    <PageLoader />
               ) : (
                    <TableWithPagination
                         columns={columns}
                         rows={rows}
                         count={getTablePages(totalRows)}
                         page={page}
                         onPageChange={(e, newPage) => {
                              getArticleItems(newPage - 1);
                              setPage(newPage);
                         }}
                    />
               )}
          </div>
     );
};

export default Article;
