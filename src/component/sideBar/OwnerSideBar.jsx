import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const OwnerSideBar = [
     { path: '/', icon: <DashboardOutlinedIcon fontSize="large" />, option: 'Dashboard' },
     { path: '/users', icon: <PeopleOutlinedIcon fontSize="large" />, option: 'Users' },
     { path: '/customer-orders', icon: <AddShoppingCartIcon fontSize="large" />, option: 'Orders' },
     { path: '/purchaseuser', icon: <ShoppingBagIcon fontSize="large" />, option: 'Purchase' },
     { path: '/subsidiary', icon: <StoreOutlinedIcon fontSize="large" />, option: 'Subsidiary' },
     { path: '/maintenance', icon: <EngineeringIcon fontSize="large" />, option: 'Maintenance' },
     { path: '/customers', icon: <FaceRetouchingNaturalOutlinedIcon fontSize="large" />, option: 'Customers' },
     { path: '/accounts', icon: <RequestQuoteOutlinedIcon fontSize="large" />, option: 'Accounts' },
     { path: '/metal-stock', icon: <DataThresholdingOutlinedIcon fontSize="large" />, option: 'Metal Stock' },
     { path: '/article', icon: <DiamondOutlinedIcon fontSize="large" />, option: 'Article Stock' },
     { path: '/uom', icon: <ScaleOutlinedIcon fontSize="large" />, option: 'Unit Of Measurement' },
     { path: '/metal', icon: <InventoryIcon fontSize="large" />, option: 'Metal' },
     { path: '/bill', icon: <ReceiptLongIcon fontSize="large" />, option: 'Billing' },
     { path: '/sales', icon: <AutoGraphOutlinedIcon fontSize="large" />, option: 'Sales' },
];

export default OwnerSideBar;
