import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
const PageTitle = ({ title, back }) => {
     useEffect(() => {
          console.log({ title, back });
     }, []);
     return (
          <div>
               <h3 className="mt-5 text-center" style={{ textAlign: 'left', fontSize: '2.5rem', color: '#333' }}>
                    {' '}
                    <button className="btn btn-link">
                         <Link to={back}>
                              <ArrowBackIcon style={{ color: '#333', fontSize: '2rem' }} />
                         </Link>
                    </button>
                    {title}
               </h3>
          </div>
     );
};

export default PageTitle;
