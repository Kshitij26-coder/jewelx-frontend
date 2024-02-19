import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const PageTitle = props => {
     return (
          <div>
               <h3 className="mt-4 text-center" style={{ textAlign: 'left' }}>
                    {' '}
                    <button className="btn btn-link">
                         <ArrowBackIcon style={{ color: 'black', fontSize: '2rem' }} />
                    </button>
                    {props.title}
               </h3>
          </div>
     );
};

export default PageTitle;
