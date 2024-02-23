import React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

const ViewButton = ({to}) => {
     return (
          <div>
               <div>
                    <Link to={to}>
                         <RemoveRedEyeIcon fontSize="large" />
                    </Link>
               </div>
          </div>
     );
};

export default ViewButton;
