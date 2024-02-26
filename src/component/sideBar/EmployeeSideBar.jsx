import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const EmployeeSideBar = [
     { path: '/', icon: <HomeOutlinedIcon fontSize="large" />, option: 'Home' },
     { path: '/customers', icon: <PeopleOutlinedIcon fontSize="large" />, option: 'Team' },
     { path: '/contacts', icon: <ContactsOutlinedIcon fontSize="large" />, option: 'Contacts' },
     { path: '/profile', icon: <ReceiptOutlinedIcon fontSize="large" />, option: 'Profile' },
     { path: '/accounts', icon: <HelpOutlineOutlinedIcon fontSize="large" />, option: 'Accounts' },
     { path: '/calendar', icon: <CalendarTodayOutlinedIcon fontSize="large" />, option: 'Calendar' },
     { path: '/invoice', icon: <CalendarTodayOutlinedIcon fontSize="large" />, option: 'Sales' },
     { path: '/bill', icon: <ReceiptLongIcon fontSize="large" />, option: 'Billing' },
];

export default EmployeeSideBar;
