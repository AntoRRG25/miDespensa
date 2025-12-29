import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../styles/components.css';

export const Header: React.FC = () => {
    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? 'var(--primary)' : 'var(--text)',
        fontWeight: isActive ? 600 : 400,
        marginRight: '1rem',
        textDecoration: 'none'
    });

    return (
        <Navbar expand="lg" style={{
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            padding: '1rem'
        }}>
            <Container>
                <Navbar.Brand style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    Mi Despensa
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" end className="nav-link" style={linkStyle}>Despensa</NavLink>
                        <NavLink to="/shopping" className="nav-link" style={linkStyle}>Compras</NavLink>
                        <NavLink to="/settings" className="nav-link" style={linkStyle}>Configuración</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
