import React from 'react';
import Markdown from 'markdown-to-jsx';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ChevronLeft } from 'react-feather';

const ProjectDetails = ({ project }) => {
  const history = useHistory();
  return (
    <>
      <Wrapper>
        <span onClick={() => history.goBack()}>
          <ChevronLeft size="48" />
        </span>
        <Details>
          <ImgWrapper>
            <img src={project.photoUrl} />
          </ImgWrapper>
          <ProjectInfo>
            <h2>{project.projectname}</h2>
            <div className="instructions">
              {project.instructions && (
                <Markdown>{project.instructions}</Markdown>
              )}
            </div>
          </ProjectInfo>
        </Details>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  color: #111;
  background: white;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  span {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 2rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  img {
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-rows: 25% 1fr;
  grid-gap: 1rem;
  justify-content: center;
  height: 100%;
`;

const ProjectInfo = styled.div`
  max-width: 600px;
  padding: 1rem;
  a {
    color: indianred;
    text-decoration: underline;
  }
  h2 {
    font-size: 3rem;
  }
`;

export default ProjectDetails;
