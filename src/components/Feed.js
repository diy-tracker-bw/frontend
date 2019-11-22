import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

import Project from './Project';

const Feed = ({ projects, handleDelete }) => {
  return (
    <GridList>
      {projects &&
        projects.map(project => (
          <Project
            key={project.projectId}
            project={project}
            handleDelete={handleDelete}
          />
        ))}
    </GridList>
  );
};

const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 1rem;
  margin-top: 2rem;
  @media (min-width: 768px) {
    grid-auto-flow: dense;
  }
`;

export default Feed;
