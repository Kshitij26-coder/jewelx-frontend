import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function App() {
     return (
          <div className="App">
               <Header />
               <Outlet />
               <Footer />
          </div>
     );
}

export default App;
