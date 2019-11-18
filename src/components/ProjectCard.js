import React from 'react';
import styled from 'styled-components/macro';
import { Heart, Share2, MessageSquare, MoreHorizontal } from 'react-feather';

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* grid-row-end: span 2; */
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  background-image: ${props =>
    `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 320px;
  padding: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  overflow: hidden;
  @media (min-width: 768px) {
    /* grid-column-end: ${props =>
      props.likes >= 100 ? 'span 2' : 'inherit'}; */
    grid-row-end: ${props => (props.likes >= 100 ? 'span 2' : 'inherit')};
  };
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    object-fit: cover;
    border-radius: 50px;
    width: 65px;
    height: 65px;
  }

  h4 {
    font-size: 1.25rem;
    margin-left: 2rem;
  }
`;

const ProjectInfo = styled.div`
  h2 {
  }
  div.meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  div.right {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ProjectCard = ({ project }) => {
  return (
    <GridItem image={project.photoUrl} likes={project.likes}>
      <UserInfo className="user-info">
        <div>
          <img src={project.image} />
        </div>
        <h4>{project.user.username}</h4>
      </UserInfo>
      <ProjectInfo>
        <h2>{project.projectName}</h2>
        <div className="meta">
          <div className="left">
            <MoreHorizontal />
          </div>
          <div className="right">
            <Heart />
            <MessageSquare />
            <Share2 />
          </div>
        </div>
      </ProjectInfo>
    </GridItem>
  );
};

export default ProjectCard;