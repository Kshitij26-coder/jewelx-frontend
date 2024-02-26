import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const EmployeeSideBar = [
     // { path: '/', icon: <HomeOutlinedIcon fontSize="large" />, option: 'Home' },
     // { path: '/customers', icon: <PeopleOutlinedIcon fontSize="large" />, option: 'Team' },
     // { path: '/contacts', icon: <ContactsOutlinedIcon fontSize="large" />, option: 'Contacts' },
     // { path: '/profile', icon: <ReceiptOutlinedIcon fontSize="large" />, option: 'Profile' },
     // { path: '/faq', icon: <HelpOutlineOutlinedIcon fontSize="large" />, option: 'FAQ' },
     // { path: '/calendar', icon: <CalendarTodayOutlinedIcon fontSize="large" />, option: 'Calendar' },
     // { path: '/invoice', icon: <CalendarTodayOutlinedIcon fontSize="large" />, option: 'Sales' },

     { path: '/', icon: <DashboardOutlinedIcon fontSize="large" />, option: 'Dashboard' },
     { path: '/subsidiary', icon: <StoreOutlinedIcon fontSize="large" />, option: 'Subsidiary' },
     { path: '/metal-stock', icon: <DataThresholdingOutlinedIcon fontSize="large" />, option: 'Metal Stock' },
     { path: '/category', icon: <CategoryIcon fontSize="large" />, option: 'Category' },
     { path: '/article', icon: <DiamondOutlinedIcon fontSize="large" />, option: 'Article Stock' },
     { path: '/customers', icon: <FaceRetouchingNaturalOutlinedIcon fontSize="large" />, option: 'Customers' },
     { path: '/customer-orders', icon: <AddShoppingCartIcon fontSize="large" />, option: 'Orders' },
     { path: '/bill', icon: <ReceiptLongIcon fontSize="large" />, option: 'Billing' },
     { path: '/user-purchase', icon: <ShoppingBagIcon fontSize="large" />, option: 'Purchase' },
     { path: '/maintenance', icon: <EngineeringIcon fontSize="large" />, option: 'Maintenance' },
     { path: '/accounts', icon: <RequestQuoteOutlinedIcon fontSize="large" />, option: 'Accounts' },
     { path: '/sales', icon: <AutoGraphOutlinedIcon fontSize="large" />, option: 'Sales' },
];

export default EmployeeSideBar;
