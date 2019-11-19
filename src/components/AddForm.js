import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components/macro';
import { X } from 'react-feather';

import axiosWithAuth from '../utils/axiosWithAuth';

const CardWrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  color: #111;
  background: white;
  width: 100%;
  height: 100vh;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  overflow: hidden;
  > * {
    width: 100%;
  }
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

const AddForm = ({ setProject, open, close }) => {
  const initialProject = {
    projectname: '',
    instructions: '',
    photoUrl: '',
  };

  const [addProject, setAddProject] = useState(initialProject);

  const handleAddProject = async e => {
    e.preventDefault();
    try {
      const userRes = await axiosWithAuth().get('users/getuserinfo');
      const userData = await userRes.data;
      const res = await axiosWithAuth().post('/projects/project', {
        ...addProject,
        user: {
          ...userData,
        },
      });
      const data = await res.data;
      setAddProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    e.preventDefault();
    setAddProject({
      ...addProject,
      [e.target.name]: e.target.value,
    });
  };
  return open
    ? ReactDOM.createPortal(
        <CardWrapper>
          <span onClick={close}>
            <X size="48" />
          </span>
          <form onSubmit={handleAddProject}>
            <CardField>
              <CardInput
                type="text"
                name="projectname"
                placeholder="Project Name"
                value={addProject.projectname}
                onChange={handleChange}
              />
            </CardField>
            <CardField>
              <CardInput
                type="text"
                name="instructions"
                placeholder="Instructions"
                value={addProject.instructions}
                onChange={handleChange}
              />
            </CardField>
            <CardField>
              <CardInput
                type="text"
                name="photoUrl"
                placeholder="Photo url"
                value={addProject.photoUrl}
                onChange={handleChange}
              />
            </CardField>
            <CardButton type="submit">Add Project</CardButton>
          </form>
        </CardWrapper>,
        document.body,
      )
    : null;
};

export default AddForm;
