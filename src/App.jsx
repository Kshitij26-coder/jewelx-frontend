import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';
import { SnackbarProvider } from 'notistack';
import Header from './component/Header';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { blue, red } from '@mui/material/colors';

function App() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const { collapseSidebar } = useProSidebar();

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
            <SnackbarProvider>
                <Header />
                <div id="app"  style={({ height: "100vh" }, { display: "flex", flexDirection: "row" })}>
              
                    <Sidebar
                        collapsed={sidebarCollapsed}
                        style={{
                            marginTop: "80px",
                            minHeight: "100vh",  
                            background: "linear-gradient(to right, #0011aa 0%,#5ca9fb  100%)",
                        }}
                     
                    >
                        <Menu className='text-dark'     style={{ color:'#333' }}>
                            <MenuItem
                                icon={<MenuOutlinedIcon />}
                                onClick={() => {
                                    setSidebarCollapsed(!sidebarCollapsed);
                                    collapseSidebar();
                                }}
                                style={{ textAlign: "center" }}
                            >{" "}
                            <h3 className='text-left'>Admin</h3>
                            </MenuItem>
                            <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
                            <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
                            <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
                            <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
                            <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
                            <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
                        </Menu>
                    </Sidebar>
                    
                    <main>
                        <Outlet />
                    </main>
                    </div>
                <Footer />
            </SnackbarProvider>
    );
}

export default App;
