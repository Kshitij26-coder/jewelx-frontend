import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { getSideBarAsRole } from './utils/sideBar';
import { getRolesFromCookies } from './utils/roles';

function App() {
     const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
     const { collapseSidebar } = useProSidebar();
     const navigate = useNavigate();

     useEffect(() => {
          // Get the previous state of the sidebar from local storage
          const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
          setSidebarCollapsed(collapsed);
     }, []);

     useEffect(() => {
          // Update local storage when the sidebar state changes
          localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
     }, [sidebarCollapsed]);

     return (
          <>
               <Header />
               <div id="app" style={({ height: '100vh' }, { display: 'flex', flexDirection: 'row' })}>
                    <Sidebar
                         collapsed={sidebarCollapsed}
                         style={{
                              marginTop: '80px',
                              minHeight: '100vh',
                              background: 'linear-gradient(to right, #0011aa 0%,#5ca9fb  100%)',
                         }}
                    >
                         <Menu className="text-dark" style={{ color: '#333' }}>
                              <MenuItem
                                   icon={<MenuOutlinedIcon fontSize="large" />}
                                   onClick={() => {
                                        setSidebarCollapsed(!sidebarCollapsed);
                                        collapseSidebar();
                                   }}
                                   style={{ textAlign: 'center' }}
                              >
                                   {' '}
                                   <h3 className="text-left">{getRolesFromCookies(navigate)}</h3>
                              </MenuItem>
                              {Array.isArray(getSideBarAsRole()) &&
                                   getSideBarAsRole()?.map((item, index) => (
                                        <MenuItem key={index} component={<Link to={item.path} className="link" />} icon={item.icon}>
                                             {item.option}
                                        </MenuItem>
                                   ))}
                         </Menu>
                    </Sidebar>

                    <main>
                         <div style={{ marginTop: '100px', left: '10px', paddingRight: '5rem' }}>
                              <Outlet />
                         </div>
                    </main>
               </div>
               <Footer />
          </>
     );
}

export default App;
