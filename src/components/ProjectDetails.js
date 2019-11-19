import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components/macro';

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
    justify-content: flex-end;
    width: 100%;
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
    object-fit: contain;
    object-position: 50% 50%;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-gap: 1rem;
  align-items: center;
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
`;

const ProjectDetails = ({ project, open, close }) =>
  open
    ? ReactDOM.createPortal(
        <>
          <Wrapper>
            <span onClick={close}>X</span>
            <Details>
              <ImgWrapper>
                <img src={project.photoUrl} />
              </ImgWrapper>
              <ProjectInfo>
                <h2>{project.projectName}</h2>
              </ProjectInfo>
            </Details>
          </Wrapper>
        </>,
        document.body,
      )
    : null;

export default ProjectDetails;
