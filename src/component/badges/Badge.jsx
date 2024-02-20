import React from 'react';
import { roles } from '../../utils/roles';

const Badge = ({ role }) => {
     const color = role == roles.admin ? 'warning' : role == roles.owner ? 'success' : 'danger';
     const rolename = role == roles.admin ? 'Admin' : role == roles.owner ? 'Owner' : 'danger';
     return <button className={'btn btn-' + color}>{rolename}</button>;
};

export default Badge;
