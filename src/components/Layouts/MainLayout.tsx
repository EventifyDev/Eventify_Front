import React from 'react';
import { Navbar } from '../navbar';
import FooterMain from './FooterMain'; 

interface LayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16"> 
                {children}
            </main>
            <FooterMain />
        </div>
    );
};

export default MainLayout;