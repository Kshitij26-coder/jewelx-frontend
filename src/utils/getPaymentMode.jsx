import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LanguageIcon from '@mui/icons-material/Language';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const getPaymentMode = mode => {
     switch (mode) {
          case 'ca':
               return (
                    <div style={{ display: 'flex', color: '#333' }}>
                         <LocalAtmIcon fontSize="large" style={{ color: 'green' }} />
                         {'\u00A0'}Cash
                    </div>
               );
          case 'on':
               return (
                    <div style={{ display: 'flex', color: '#333' }}>
                         <LanguageIcon fontSize="large" style={{ color: 'blue' }} />
                         {'\u00A0'}Online
                    </div>
               );
          case 'ch':
               return (
                    <div style={{ display: 'flex', color: '#333' }}>
                         <PaymentsIcon fontSize="large" style={{ color: 'purple' }} />
                         {'\u00A0'}Cheque
                    </div>
               );
          case 'mp':
               return (
                    <div style={{ display: 'flex', color: '#333' }}>
                         <AccountBalanceWalletIcon fontSize="large" style={{ color: 'orange' }} />
                         {'\u00A0'}Mixed
                    </div>
               );
          default:
               // Return a default icon or handle the error gracefully
               return null; // or <ErrorIcon /> or any other default behavior
     }
};
