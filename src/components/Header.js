import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../logo.png';

const Header = () => {
  const [toggleSubMenu, setToggleSubMenu] = useState(false);
  const { user, currentUser, isAuthenticated, handleLogout } = useAuth();
  const history = useHistory();

  const logout = e => {
    e.preventDefault();
    handleLogout();
    history.push('/login');
  };
  return (
    <Wrapper>
      <Logo>
        <Link to="/">
          <img src={logo} />
        </Link>
      </Logo>
      {isAuthenticated && (
        <Link className="findProjects" to="/byproject">
          Find Projects
        </Link>
      )}
      {isAuthenticated ? (
        <>
          {user.loading ? (
            <div>loading...</div>
          ) : (
            <UserInfo className="user-info">
              <div
                className="userImg"
                onClick={() => setToggleSubMenu(!toggleSubMenu)}
              >
                <img src={currentUser.photourl} />
              </div>
              {toggleSubMenu && (
                <UserSubInfo
                  onMouseLeave={() => toggleSubMenu && setToggleSubMenu(false)}
                >
                  <ul>
                    <li>
                      <Link to={`/profile/${currentUser.userid}`}>
                        Edit Profile
                      </Link>
                    </li>
                    <li onClick={logout}>Log out</li>
                  </ul>
                </UserSubInfo>
              )}
            </UserInfo>
          )}
        </>
      ) : null}
    </Wrapper>
  );
};

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

const UserInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 120px;

  div.userImg {
    background-color: #fff;
    width: 65px;
    height: 65px;
    border-radius: 50px;
    img {
      width: 65px;
      height: 65px;
      border-radius: 50px;
      object-fit: cover;
    }
  }
`;

const UserSubInfo = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  margin-top: 1rem;
  padding: 1rem;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.05), 0 0px 1px rgba(0, 0, 0, 0.08);

  ul {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: center;

      color: #111;
      padding: 0.5rem 0;
      list-style: none;
      border-top: 1px solid #cacaca;

      &:first-child {
        border-top: none;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default Header;
