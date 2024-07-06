// NavBar.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Nav>
      <Logo>WeatherApp</Logo>
      <Menu>
        <MenuItem>
          <StyledLink to="/">Home</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/login">Login</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/register">Register</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/dashboard">dashboard</StyledLink>
        </MenuItem>
      </Menu>
    </Nav>
  );
};

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

export default NavBar;
