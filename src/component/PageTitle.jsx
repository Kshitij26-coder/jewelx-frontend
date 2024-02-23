import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
const PageTitle = props => {
     return (
          <div>
               <h3 className="mt-5 text-center" style={{ textAlign: 'left', fontSize: '2.5rem', color: '#333' }}>
                    {' '}
                    <button className="btn btn-link">
                         <Link to={'/'}>
                              <ArrowBackIcon style={{ color: '#333', fontSize: '2rem' }} />
                         </Link>
                    </button>
                    {props.title}
               </h3>
          </div>
     );
};

export default PageTitle;
