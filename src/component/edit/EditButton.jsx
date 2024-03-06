import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
const EditButton = ({ onClick }) => {
     return (
          <div>
               <IconButton onClick={onClick} aria-label="edit" style={{ marginLeft: '90%', fontSize: '1.5rem', borderRadius: 0 }}>
                    <EditIcon fontSize="medium" /> Edit
               </IconButton>
          </div>
     );
};

export default EditButton;
