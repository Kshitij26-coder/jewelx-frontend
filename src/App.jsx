import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import { SnackbarProvider } from 'notistack';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

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
