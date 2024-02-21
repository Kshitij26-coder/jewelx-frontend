import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const PageTitle = props => {
     return (
          <div>
               <h3 className="mt-5 text-center" style={{ textAlign: 'left', fontSize: '2.5rem', color: '#333' }}>
                    {' '}
                    <button className="btn btn-link">
                         <ArrowBackIcon style={{ color: '#333', fontSize: '2rem' }} />
                    </button>
                    {props.title}
               </h3>
          </div>
     );
};

export default PageTitle;
