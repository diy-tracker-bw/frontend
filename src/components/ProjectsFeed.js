import React from 'react';
import styled from 'styled-components/macro';
import ProjectCard from './ProjectCard';

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

const ProjectsFeed = ({ projects }) => {
  return (
    <GridList>
      {projects.map(project => (
        <ProjectCard key={project.projetId} />
      ))}
    </GridList>
  );
};

export default ProjectsFeed;
