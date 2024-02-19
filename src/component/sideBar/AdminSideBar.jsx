import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';

const AdminSideBar = [
     { path: '/dashboard', icon: <DashboardOutlinedIcon fontSize="large" />, option: 'Dashboard' },
     { path: '/users', icon: <PeopleOutlinedIcon fontSize="large" />, option: 'Users' },
     { path: '/contacts', icon: <StoreOutlinedIcon fontSize="large" />, option: 'Subsidiary' },
     { path: '/customers', icon: <FaceRetouchingNaturalOutlinedIcon fontSize="large" />, option: 'Customers' },
     { path: '/profile', icon: <AutoGraphOutlinedIcon fontSize="large" />, option: 'Sales' },
     { path: '/faq', icon: <RequestQuoteOutlinedIcon fontSize="large" />, option: 'Accounts' },
     { path: '/calendar', icon: <DataThresholdingOutlinedIcon fontSize="large" />, option: 'Metal Stock' },
     { path: '/calendar', icon: <DiamondOutlinedIcon fontSize="large" />, option: 'Article Stock' },
     { path: '/calendar', icon: <ScaleOutlinedIcon fontSize="large" />, option: 'Unit Of Measurement' },
];

export default AdminSideBar;
