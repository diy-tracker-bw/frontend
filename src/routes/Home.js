import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';

import ProjectsFeed from '../components/ProjectsFeed';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const { handleLogout } = useAuth();

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
      <ProjectsFeed projects={projects} />
    </Wrapper>
  );
};

export default Home;
