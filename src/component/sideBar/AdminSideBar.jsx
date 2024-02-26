import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const AdminSideBar = [
     { path: '/', icon: <DashboardOutlinedIcon fontSize="large" />, option: 'Dashboard' },
     { path: '/users', icon: <PeopleOutlinedIcon fontSize="large" />, option: 'Users' },
     // { path: '/subsidiary', icon: <StoreOutlinedIcon fontSize="large" />, option: 'Subsidiary' },
     { path: '/customers', icon: <FaceRetouchingNaturalOutlinedIcon fontSize="large" />, option: 'Customers' },
     { path: '/sales', icon: <AutoGraphOutlinedIcon fontSize="large" />, option: 'Sales' },
     { path: '/bill', icon: <ReceiptLongIcon fontSize="large" />, option: 'Billing' },
     { path: '/accounts', icon: <RequestQuoteOutlinedIcon fontSize="large" />, option: 'Accounts' },
     { path: '/metal-stock', icon: <DataThresholdingOutlinedIcon fontSize="large" />, option: 'Metal Stock' },
     { path: '/article', icon: <DiamondOutlinedIcon fontSize="large" />, option: 'Article Stock' },
     { path: '/uom', icon: <ScaleOutlinedIcon fontSize="large" />, option: 'Unit Of Measurement' },
];

export default AdminSideBar;
