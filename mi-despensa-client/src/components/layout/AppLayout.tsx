import React from 'react';
import { Container } from 'react-bootstrap';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container className="py-4" style={{ flex: 1 }}>
                <Outlet />
            </Container>
        </div>
    );
};
