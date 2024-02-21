import React from 'react';
import '../../styles/indicatorStyle.css';
const Indicator = ({ isLoggedIn }) => {
     const active = isLoggedIn ? 'indicator-online' : 'indicator-offline';
     return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
               <div className={'indicator ' + active}></div>
          </div>
     );
};

export default Indicator;
