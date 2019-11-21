import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ByProjectForm from '../components/ByProjectForm';
import styled from 'styled-components';

const ByProjectTitle = styled.div`
    text-align: center;

    .search-bar {
        margin: 5px;
        
        input {
            border: 1px solid black;
            padding: 1px 5px;
        }
    }
`;

const ByProject = () => {

    const [getProject, setGetProject] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios
            .get("https://patrick-diy.herokuapp.com/projects/projects")
            .then(response => {
                console.log(response.data)
                const filter = response.data.filter(user =>
                    user.projectname.toLowerCase().includes(query.toLowerCase()))
                setGetProject(filter)
            })
            .catch(error => console.log(error));
    },[query]);

    const handleInputChange = event => {
        setQuery(event.target.value)
    }

    return (
        <ByProjectTitle>
            <h1>Find A Project</h1>
            <form className="search-bar">
                <input 
                    type="text"
                    onChange={handleInputChange}
                    value={query}
                    name="projectname"
                    placeholder="Search by Project"
                />
            </form>
            <div>
                {getProject.map(user => 
                <ByProjectForm 
                    key={user.projectId} 
                    userName={user.user.username}
                    image={user.photoUrl} 
                    projectName={user.projectname}
                    instructions={user.instructions}
                    likes={user.likes}
                />)}
            </div>
        </ByProjectTitle>
    )
}

export default ByProject