import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { CSSTransition } from 'react-transition-group';
import { PlusCircle, Plus, Minus } from 'react-feather';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useAuth } from '../hooks/useAuth';

import ProjectsFeed from '../components/ProjectsFeed';
import AddForm from '../components/AddForm';

const Wrapper = styled.div`
  padding: 2rem;

  h2.discover {
    font-size: 3rem;
  }
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: mandatory;

  h2 {
    font-size: 2.5rem;
    align-self: flex-end;
    margin-bottom: 1rem;
    span {
      color: indianred;
    }
  }
`;

const UserAddUtil = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 250px;
  width: 250px;
  height: 320px;
  background-color: #ddd;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.05), 0 0px 1px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  padding: 1rem;
  scroll-snap-align: start;

  div.add-project {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const UserContent = styled.div`
  display: flex;
`;

const UserProjects = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
  grid-template-columns: repeat(6, minmax(250px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 1rem;
  margin-left: 1rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
`;

const UserProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  scroll-snap-align: start;

  &:hover {
    cursor: pointer;
  }

  h2 {
    font-size: 2rem;
  }
`;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleAddForm = () => setShowAddForm(!showAddForm);

  useEffect(() => {
    (async () => {
      const userRes = await axiosWithAuth().get('users/getuserinfo');
      const user = await userRes.data;
      setCurrentUser(user);
      setUserProjects(user.projects);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axiosWithAuth().get('/projects/projects');
      const data = await res.data;
      setProjects(data);
    })();
  }, [projects]);
  return (
    <Wrapper>
      <CSSTransition in={showAddForm} timeout={300} classNames="show-form">
        <AddForm
          projects={projects}
          setProjects={setProjects}
          open={showAddForm}
          close={toggleAddForm}
        />
      </CSSTransition>
      {isAuthenticated ? (
        <>
          <UserSection>
            <h2>
              hello <span>@{currentUser.username}</span>
            </h2>
            <UserContent>
              <UserAddUtil>
                <div className="add-project" onClick={toggleAddForm}>
                  <PlusCircle size="48" />
                  <h3>Add New</h3>
                </div>
              </UserAddUtil>
              <UserProjects>
                {userProjects.map(userProject => (
                  <UserProjectItem
                    onClick={() => setShowEditForm(!showEditForm)}
                    key={userProject.projectId}
                    image={userProject.photoUrl}
                  >
                    <h2>{userProject.projectname}</h2>
                  </UserProjectItem>
                ))}
              </UserProjects>
            </UserContent>
          </UserSection>
        </>
      ) : null}
      <h2 className="discover">Discover</h2>
      <ProjectsFeed
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
        projects={projects}
        setProjects={setProjects}
      />
    </Wrapper>
  );
};

export default Home;
