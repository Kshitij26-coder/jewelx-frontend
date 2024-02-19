import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const OwnerSideBar = [
     { path: '/dashboard', icon: <AutoAwesomeMosaicIcon fontSize="large" />, option: 'Home' },
     { path: '/customer', icon: <PeopleOutlinedIcon fontSize="large" />, option: 'Team' },
     { path: '/contacts', icon: <ContactsOutlinedIcon fontSize="large" />, option: 'Contacts' },
     { path: '/profile', icon: <ReceiptOutlinedIcon fontSize="large" />, option: 'Profile' },
     { path: '/faq', icon: <HelpOutlineOutlinedIcon fontSize="large" />, option: 'FAQ' },
     { path: '/calendar', icon: <CalendarTodayOutlinedIcon fontSize="large" />, option: 'Calendar' },
];

export default OwnerSideBar;
