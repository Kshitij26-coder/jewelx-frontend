import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

/**
 *
 * @param {*} param0
 * @returns
 */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
     [`&.${tableCellClasses.head}`]: {
          background: 'linear-gradient(to bottom, #5ca9fb, #6372ff)',
          color: theme.palette.common.white,
          fontSize: 15,
     },
     [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
          color: theme.palette.common.grey,
     },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
     '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
     },
     // hide last border
     '&:last-child td, &:last-child th': {
          border: 0,
     },
     '&:hover': {
          backgroundColor: grey[300], // Change the color on hover
     },
}));

const TableWithPagination = ({ columns, rows, onPageChange, count, page }) => {
     return (
          <div className="container" style={{ marginLeft: '0' }}>
               <Table aria-label="customized table" sx={{ boxShadow: '5px 5px 10px #666' }}>
                    <TableHead>
                         <StyledTableRow>
                              {columns.map((column, index) => (
                                   <StyledTableCell align={index == 0 ? 'left' : 'left'} key={index} className={tableCellClasses.head}>
                                        {column}
                                   </StyledTableCell>
                              ))}
                         </StyledTableRow>
                    </TableHead>
                    <TableBody>
                         {Array.isArray(rows) &&
                              rows.map(row => (
                                   <StyledTableRow key={row.name}>
                                        {Object.values(row).map((value, index) => (
                                             <StyledTableCell align={index == 0 ? 'left' : 'left'} key={index} className={tableCellClasses.body}>
                                                  {value}
                                             </StyledTableCell>
                                        ))}
                                   </StyledTableRow>
                              ))}
                    </TableBody>
               </Table>
               <Box display="flex" justifyContent="center">
                    <Pagination
                         variant="outlined"
                         shape="rounded"
                         count={count}
                         page={page}
                         onChange={onPageChange}
                         size="large"
                         sx={{
                              '& .MuiPaginationItem-root': {
                                   fontSize: '1.5rem', // Increase the font size
                              },
                              mt: 2,
                              mb: 2, // Add margin top
                         }}
                    />
               </Box>
          </div>
     );
};

TableWithPagination.propTypes = {
     columns: PropTypes.array.isRequired,
     data: PropTypes.array.isRequired,
     onPageChange: PropTypes.func.isRequired,
};

export default TableWithPagination;
