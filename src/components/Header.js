import React from 'react';
import styled from 'styled-components/macro';
import { PlusCircle, Plus, Minus } from 'react-feather';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #edc7c5;
  width: 100%;
  height: 5rem;
  padding: 1rem;

  .findProjects {
    display: block;
    padding: 0.875rem 1rem;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    color: #111;
    background-color: #fff;
    border: 0;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
    &:hover {
      box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
      transform: translate(0, -5px);
    }
  }
`;

const Logo = styled.div`
  width: 4rem;
  height: 4rem;
`;

const Button = styled.button`
  display: block;
  padding: 0.875rem 1rem;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #111;
  background-color: #fff;
  border: 0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

const Header = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  return (
    <Wrapper>
      <Logo>
        <img src={logo} />
      </Logo>
      {isAuthenticated && (
        <Link className="findProjects" to="/byproject">
          Find Projects
        </Link>
      )}
      {isAuthenticated && <Button onClick={handleLogout}>Log out</Button>}
    </Wrapper>
  );
};

export default Header;
