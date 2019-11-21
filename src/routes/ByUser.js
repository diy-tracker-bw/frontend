import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ByUserForm from '../components/ByUserForm';
import styled from 'styled-components';

const ByUserTitle = styled.div`
    text-align: center;

    .search-bar {
        margin: 5px;
        
        input {
            border: 1px solid black;
            padding: 1px 5px;
        }
    }
`;

const ByUser = () => {

    const [getUser, setGetUser] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios
            .get("https://patrick-diy.herokuapp.com/projects/projects")
            .then(response => {
                // console.log(response.data)
                const filter = response.data.filter(user =>
                    user.user.username.toLowerCase().includes(query.toLowerCase()))
                setGetUser(filter)
            })
            .catch(error => console.log(error));
    },[query]);

    const handleInputChange = event => {
        setQuery(event.target.value)
    }

    return (
        <ByUserTitle>
            <h1>Find Your Project</h1>
            <form className="search-bar">
                <input 
                    type="text"
                    onChange={handleInputChange}
                    value={query}
                    name="username"
                    placeholder="Search by Username"
                />
            </form>
            <div>
                {getUser.map(user => 
                <ByUserForm 
                    key={user.projectId} 
                    userName={user.user.username}
                    image={user.photoUrl} 
                    projectName={user.projectname}
                    instructions={user.instructions}
                    likes={user.likes}
                />)}
            </div>
        </ByUserTitle>
    )
}

export default ByUser