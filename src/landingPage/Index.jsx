import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { About } from './components/About';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import JsonData from './data/data.json';
import Footer from '../component/Footer';
import SmoothScroll from 'smooth-scroll';
import './index.css';
import { Navigation } from './components/Navigation';

export const scroll = new SmoothScroll('a[href*="#"]', {
     speed: 1000,
     speedAsDuration: true,
});

const Index = () => {
     const [landingPageData, setLandingPageData] = useState({});
     useEffect(() => {
          setLandingPageData(JsonData);
     }, []);

     return (
          <div>
               <Navigation />
               <Header data={landingPageData.Header} />
               <Features data={landingPageData.Features} />
               <About data={landingPageData.About} />
               <Services data={landingPageData.Services} />
               <Team data={landingPageData.Team} />
               <Contact data={landingPageData.Contact} /> 
               <Footer />
          </div>
     );
};

export default Index;
