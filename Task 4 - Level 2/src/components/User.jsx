import React, { useEffect, useState } from 'react'
import axios from 'axios';

function User({ updateUser, user, fetchUsers }) {

    const deleteUser = async () => {
        try {

            await axios.delete(`http://localhost:3000/api/users/delete/${user.id}`);
            fetchUsers();
            
        } catch (error) {
            console.log('Error Occured: ', error.message);
        }
    }

    return (
        <>
            <div className="user-container" style={{ 'cursor': 'pointer' }}>
                <div className="user-details">
                    <div className="user-photo">
                        <div className="cover">
                            <h1>{ user.name?.charAt(0).toUpperCase() }</h1>
                        </div>
                    </div>
                    <div className="user-info">
                        <h3>{ user.name }</h3>
                        <p>{ user.email }</p>
                    </div>
                </div>
                <div className="user-options">
                    <button onClick={ () => updateUser(user.id, user.name, user.email) }>Update</button>
                    <button onClick={ deleteUser }>Delete</button>
                </div>
            </div>
        </>
    )
}

export default User