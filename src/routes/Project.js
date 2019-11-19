import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosWithAuth from '../utils/axiosWithAuth';
import ProjectDetails from '../components/ProjectDetails';

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    (async () => {
      const res = await axiosWithAuth().get(`/projects/project/${id}`);
      const data = await res.data;
      setProject(data);
    })();
  }, []);
  return (
    <div>
      <ProjectDetails project={project} />
    </div>
  );
};

export default Project;
