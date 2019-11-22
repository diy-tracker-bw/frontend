import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { X } from 'react-feather';
import styled from 'styled-components/macro';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';
import { useAxiosWithAuth } from '../hooks/useAxiosWithAuth';

const initialState = {
  projectname: '',
  instructions: '',
  photoUrl: '',
};

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [currentProject, setCurrentProject] = useState(initialState);
  const { user } = useAuth();
  // const user = useAxiosWithAuth('/users/getuserinfo');
  const project = useAxiosWithAuth(`/projects/project/${id}`);

  const handleChange = e => {
    e.persist();
    setCurrentProject({
      ...currentProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleMDChange = value => {
    setCurrentProject({
      ...currentProject,
      instructions: value,
    });
  };

  const handleEdit = async () => {
    try {
      const res = await axiosWithAuth().put(`/projects/project/${id}`, {
        ...currentProject,
        user: { ...user.data },
      });
      console.log(res.data);
      setCurrentProject({
        ...project.data,
        projectname: '',
        instructions: '',
        photoUrl: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await handleEdit();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentProject(project.data);
  }, [id, project.data]);

  return (
    <CardWrapper>
      <h1>Edit</h1>
      <span className="close" onClick={() => history.goBack()}>
        <X size="48" />
      </span>
      {project.loading ? (
        <div>loading...</div>
      ) : (
        <form onSubmit={onSubmit}>
          <CardField>
            <CardInput
              type="text"
              name="projectname"
              placeholder="Project Name"
              value={currentProject.projectname}
              onChange={handleChange}
            />
          </CardField>
          <CardField>
            <SimpleMDE
              label="Instructions"
              onChange={handleMDChange}
              value={currentProject.instructions}
              options={{
                autofocus: true,
                spellChecker: false,
              }}
            />
          </CardField>
          <CardField>
            <CardInput
              type="text"
              name="photoUrl"
              placeholder="Photo url"
              value={currentProject.photoUrl}
              onChange={handleChange}
            />
          </CardField>
          <CardButton type="submit">Save Project</CardButton>
        </form>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  color: #111;
  background: white;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  overflow: hidden;
  > * {
    width: 100%;
  }
  span.close {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    &:hover {
      cursor: pointer;
    }
  }
  label {
    color: #7b7b7b;
  }
`;

const CardField = styled.div`
  display: flex;
  flex-direction: ${props => (props.checkbox ? 'row-reverse' : 'column')};
  align-items: ${props => (props.checkbox ? 'center' : 'normal')};
  justify-content: ${props => (props.checkbox ? 'flex-end' : 'normal')};
  margin-bottom: 1rem;
  padding: ${props => (props.select ? '1rem' : '0')};
  background: ${props => (props.select ? '#eee' : 'none')};
  label {
    margin-left: ${props => (props.checkbox ? '1rem' : '0')};
    margin-right: ${props => (props.checkbox ? '1rem' : '0')};
  }
  select {
    background: none;
    width: 100%;
    margin: 1rem 0;
    border: none;
    transition: border-bottom-color 0.25s ease-in;
    &:focus {
      outline: 0;
    }
  }
`;

const CardInput = styled.input`
  padding: 7px 0;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;
  &:focus {
    border-bottom-color: #e5195f;
    outline: 0;
  }
`;

const CardButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.875rem 0;
  margin: 1rem 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #e5195f;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

export default Edit;
