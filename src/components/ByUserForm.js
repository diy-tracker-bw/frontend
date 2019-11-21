import React from 'react';
import styled from 'styled-components';

const ByUserFormCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: mandatory;

    h1 {
        font-size: 2.5rem;
        align-self: center;
        margin-bottom: 1rem;
        color: indianred;
    }
`;

const UserContent = styled.div`
    display: flex;
    justify-content: center;
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
    min-height: 200px;
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

const ByUserForm = (props) => {
    return (
        <ByUserFormCard>
            <UserContent>               
                <UserProjectItem>
                    <h1>{props.userName}</h1>
                    <h2>{props.projectName}</h2>
                    <p>Likes: {props.likes}</p>
                    <img src={props.image} alt="user image" />
                </UserProjectItem>           
            </UserContent>
        </ByUserFormCard>
    )
}

export default ByUserForm