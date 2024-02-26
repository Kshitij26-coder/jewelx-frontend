import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LanguageIcon from '@mui/icons-material/Language';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const getPaymentMode = mode => {
     switch (mode) {
          case 'ca':
               return <LocalAtmIcon fontSize="large" style={{ color: 'green' }} />;
          case 'on':
               return <LanguageIcon fontSize="large" style={{ color: 'blue' }} />;
          case 'ch':
               return <PaymentsIcon fontSize="large" style={{ color: 'purple' }} />;
          case 'mp':
               return <AccountBalanceWalletIcon fontSize="large" style={{ color: 'orange' }} />;
          default:
               // Return a default icon or handle the error gracefully
               return null; // or <ErrorIcon /> or any other default behavior
     }
};
