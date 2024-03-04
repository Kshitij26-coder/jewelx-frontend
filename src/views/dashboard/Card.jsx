import React from 'react';
import '../dashboard/style.css';
import { height } from '@mui/system';

const Card = ({ title, children, footer, height }) => {
     return (
          <div className="card">
               <div className="card-body" style={{ height: height }}>
                    <h2 className="card-title">{title}</h2>
                    {children}
               </div>
               {footer && <div className="card-footer">{footer}</div>}
          </div>
     );
};

export default Card;
