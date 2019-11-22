import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Heart, Share2, MessageSquare, MoreHorizontal } from 'react-feather';

const Project = ({ project, handleDelete }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const history = useHistory();
  return (
    <GridItem
      image={project.photoUrl}
      likes={project.likes}
      onClick={() => (toggleMenu ? setToggleMenu(false) : null)}
    >
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
                  <li
                    onClick={() => history.push(`/edit/${project.projectId}`)}
                  >
                    Edit
                  </li>
                  <li onClick={() => handleDelete(project.projectId)}>
                    Delete
                  </li>
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
  );
};

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

export default Project;
