import React from 'react';


const ByUserForm = (props) => {
    return (
        <div>
            <h1>{props.userName}</h1>
            <h2>{props.projectName}</h2>
            <p>{props.instructions}</p>
            <p>Likes: {props.likes}</p>
            <img src={props.image} alt="user image" />
        </div>
    )
}

export default ByUserForm