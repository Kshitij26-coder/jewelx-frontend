import React, { useEffect } from 'react';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';

const TableTitle = ({ pageTitle, to, buttonTitle, back }) => {
     useEffect(() => {
          console.log(back);
     }, []);
     return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <PageTitle title={pageTitle} back={back} />
               <Link to={to}>
                    <button className="submit-button" style={{ height: '4rem', marginTop: '2rem', width: '9rem', fontSize: '1.5rem' }}>
                         {buttonTitle}
                    </button>
               </Link>
          </div>
     );
};

export default TableTitle;
