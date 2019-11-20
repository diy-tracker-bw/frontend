import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Heart, Share2, MessageSquare, MoreHorizontal } from 'react-feather';
import { CSSTransition } from 'react-transition-group';

import axiosWithAuth from '../utils/axiosWithAuth';
import UpdateForm from './UpdateForm';

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
  /* overflow: hidden; */
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

  div.left {
    position: relative;
  }

  div.left,
  div.right {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;

  ul {
    padding: 0;

    li {
      color: #111;
      padding: 0.5rem 0;
      list-style: none;
      border-top: 1px solid #cacaca;

      &:first-child {
        border-top: none;
      }
    }
  }
`;

const ProjectCard = ({ project, projects, setProjects }) => {
  const [toggleMenu, setToggleMenu] = useState();
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleEditForm = () => setShowEditForm(!showEditForm);

  const deleteProject = async () => {
    try {
      const res = await axiosWithAuth().delete(
        `/projects/project/${project.projectId}`,
        project,
      );
      const data = await res.data;
      const newProjects = projects.filter(
        project => project.projectId !== data,
      );
      setProjects(newProjects);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CSSTransition in={showEditForm} timeout={300} classNames="show-add-form">
        <UpdateForm
          open={showEditForm}
          close={toggleEditForm}
          project={project}
        />
      </CSSTransition>
      <GridItem image={project.photoUrl} likes={project.likes}>
        <UserInfo className="user-info">
          <div>
            <img src={project.image} />
          </div>
          <h4>{project.user && project.user.username}</h4>
        </UserInfo>
        <ProjectInfo>
          <Link to={`/project/${project.projectId}`}>
            <h2>{project.projectname}</h2>
          </Link>
          <div className="meta">
            <div className="left">
              <MoreHorizontal onClick={() => setToggleMenu(!toggleMenu)} />
              {toggleMenu ? (
                <Menu>
                  <ul>
                    <li onClick={() => setShowEditForm(!showEditForm)}>Edit</li>
                    <li onClick={deleteProject}>Delete</li>
                  </ul>
                </Menu>
              ) : null}
            </div>
            <div className="right">
              <Heart />
              <MessageSquare />
              <Share2 />
            </div>
          </div>
        </ProjectInfo>
      </GridItem>
    </>
  );
};

export default ProjectCard;
