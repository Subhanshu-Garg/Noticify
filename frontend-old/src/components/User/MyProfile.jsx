import React from 'react';
import { useSelector } from 'react-redux';

function MyProfile() {

    const { user } = useSelector(state => state.user);
    const name = user.fname + " " + user.lname;
    return (
        <>
            <h1>{"Hello " + name}</h1>
            <p>{user._id}</p>
        </>
    )
}

export default MyProfile;