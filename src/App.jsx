import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';
import { SnackbarProvider } from 'notistack';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Header from './component/Header';

function App() {
     return (
          <div className="App">
               <SnackbarProvider>
                    <Header />
                    <Outlet />
                    <Footer />
               </SnackbarProvider>
          </div>
     );
}

export default App;
