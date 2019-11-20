import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { CSSTransition } from 'react-transition-group';
import { PlusCircle, Plus, Minus } from 'react-feather';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';

import ProjectsFeed from '../components/ProjectsFeed';
import AddForm from '../components/AddForm';

const Wrapper = styled.div`
  padding: 2rem;

  h2 {
    span {
      color: indianred;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  padding: 1rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: mandatory;
`;

const UserToolItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 200px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.05), 0 0px 1px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  padding: 1rem;
  scroll-snap-align: start;

  div.add-project {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const { handleLogout } = useAuth();

  const toggleAddForm = () => setShowAddForm(!showAddForm);

  useEffect(() => {
    (async () => {
      const userRes = await axiosWithAuth().get('users/getuserinfo');
      const user = await userRes.data;
      setCurrentUser(user);
    })();
    console.log(currentUser);
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axiosWithAuth().get('/projects/projects');
      const data = await res.data;
      setProjects(data);
    })();
  }, [setProjects]);
  return (
    <Wrapper>
      <h2>
        hello <span>{currentUser.username}</span>
      </h2>
      <CSSTransition in={showAddForm} timeout={300} classNames="show-form">
        <AddForm open={showAddForm} close={toggleAddForm} />
      </CSSTransition>
      <UserSection>
        <UserToolItem>
          <div className="add-project" onClick={toggleAddForm}>
            <PlusCircle size="48" />
            <h3>Add New</h3>
          </div>
        </UserToolItem>
      </UserSection>
      <h2>Discover</h2>
      <ProjectsFeed projects={projects} setProjects={setProjects} />
    </Wrapper>
  );
};

export default Home;
