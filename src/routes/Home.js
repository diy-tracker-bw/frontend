import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { CSSTransition } from 'react-transition-group';
import { Plus, Minus } from 'react-feather';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';

import ProjectsFeed from '../components/ProjectsFeed';
import AddForm from '../components/AddForm';

const Wrapper = styled.div`
  padding: 2rem;
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
`;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { handleLogout } = useAuth();

  const toggleAddForm = () => setShowAddForm(!showAddForm);

  useEffect(() => {
    (async () => {
      const res = await axiosWithAuth().get('/projects/projects');
      const data = await res.data;
      setProjects(data);
    })();
  }, []);
  return (
    <Wrapper>
      <h1>Discover</h1>
      <button onClick={handleLogout}>Log out</button>

      <CSSTransition in={showAddForm} timeout={300} classNames="show-add-form">
        <AddForm open={showAddForm} close={toggleAddForm} />
      </CSSTransition>
      <UserSection>
        <UserToolItem>
          <div className="add-project" onClick={toggleAddForm}>
            {showAddForm ? <Minus size="48" /> : <Plus size="48" />}
          </div>
        </UserToolItem>
      </UserSection>
      <ProjectsFeed projects={projects} />
    </Wrapper>
  );
};

export default Home;
