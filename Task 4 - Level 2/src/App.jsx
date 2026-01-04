import React, { useEffect, useState } from 'react'
import axios from 'axios';
import User from './components/User.jsx'
import Form from './components/Form.jsx'

function App() {

    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [currState, setCurrState] = useState(false)
    const [users, setUsers] = useState([]);

    const createUser = () => {
        setShowCreate(true)
    }

    const closeCreate = () => {
        setShowCreate(false)
    }

    const updateUser = (userId) => {
        setShowUpdate(true)
        setCurrState(true)
        setEditUserId(userId)
    }

    const closeUpdate = () => {
        setShowUpdate(false)
    }

    const fetchUsers = async () => {

        try {

            const res = await axios.get('http://localhost:3000/api/users/get-all');
            const data = res.data;

            setUsers(data.users);

            console.log(data.users);
            

        } catch (error){
            console.log('Error Occured: ', error.message);
        }

    }

    useEffect(() =>{
        fetchUsers()
    }, [])

    return (
        <>
            <div className="container">

                <div className="web-title">
                    <h2>Codveda Internship - CRUD Operations</h2>
                    <p><span onClick={ () => createUser() } style={{ 'cursor': 'pointer' }}>+ Create New</span></p>
                </div>

                <div className="data-container" id="data-container">
                    {
                        users && (
                            users.map((user) => (
                                <User key={ user.id } user={ user } fetchUsers={ fetchUsers } updateUser = { updateUser } />
                            ))
                        )
                    }
                </div>

            </div>

            {(showCreate || showUpdate) && (
                <div className="create-user">
                    <div className="update-container">
                        <h2>
                            {
                                showCreate 
                                ?
                                    'Create New User'
                                :
                                    'Update'
                            }
                        </h2>
                        <p>
                            {
                                showCreate 
                                ?
                                    'Create new user with name and email.'
                                :
                                    'Update the name and email of the user.'
                            }                            
                        </p>

                        <Form currState={ currState }editUserId={ editUserId } closeCreate={ closeCreate } fetchUsers={ fetchUsers } closeUpdate={ closeUpdate } showCreate={ showCreate } />
                    </div>
                </div>
            )}
        </>
    )
}

export default App