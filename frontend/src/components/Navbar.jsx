import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <Nav>
      <Logo>WeatherApp</Logo>
      <Menu>
        <MenuItem>
          <StyledLink to="/">Home</StyledLink>
        </MenuItem>
        {!isLoggedIn && (
          <>
            <MenuItem>
              <StyledLink to="/login">Login</StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/register">Register</StyledLink>
            </MenuItem>
          </>
        )}
        {isLoggedIn && (
          <>
            <MenuItem>
              <StyledLink to="/dashboard">Dashboard</StyledLink>
            </MenuItem>
            <MenuItem>
              <PlainButton onClick={handleLogout}>Logout</PlainButton>
            </MenuItem>
          </>
        )}
      </Menu>
    </Nav>
  );
};



export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: #fff;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-left: 1rem;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const PlainButton = styled.button`
  all: unset;
  color: white;
  cursor: pointer; /* optional: to keep pointer cursor on hover */
`;
