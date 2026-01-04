import React, { useState } from 'react'
import axios from 'axios'

function Form({ currState, showCreate, closeCreate, closeUpdate, fetchUsers, editUserId }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleForm = async (e) => {

        e.preventDefault();

        try {
            
            //Form Handling
            if(!currState){

                //create user
                setName('')
                setEmail('')

                await axios.post('http://localhost:3000/api/users/new', {
                    name,
                    email
                });

                alert('User created successfully!');
                closeCreate();
                fetchUsers();

            }else{

                //update user
                setName(name)
                setEmail(email)
                
                await axios.put(`http://localhost:3000/api/users/update/${editUserId}`, {
                    name,
                    email
                });

                alert('User updated successfully!');
                closeUpdate();
                fetchUsers();

            }

        } catch (error) {
            console.log('Error Occured: ', error.message);
        }

    }

    return (
        <>
            <form onSubmit={ handleForm }>
                <div className="inpBox">
                    <span>Name</span>
                    <div className="inp-bx">
                        <input 
                            type="text" 
                            name="name" 
                            id="new-name"
                            placeholder="Enter your name" 
                            autocomplete="off" 
                            autocorrect="off" 
                            spellcheck="false" 
                            required 
                            value={ name }
                            onChange={ (e) => setName(e.target.value) }
                        />
                    </div>
                </div>
                <div className="inpBox">
                    <span>Email</span>
                    <div className="inp-bx">
                        <input 
                            type="email" 
                            name="email" 
                            id="new-email" 
                            placeholder="Enter your email" 
                            autocomplete="off" 
                            autocorrect="off" 
                            spellcheck="false" 
                            required 
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                        />
                    </div>
                </div>
                <div className="submit-btns">
                    <button type="button" onClick={ showCreate ? () => closeCreate() : () => closeUpdate() }>Cancel</button>
                    <button>{ showCreate ? 'Create' : 'Update' }</button>
                </div>
            </form>
        </>
    )
}

export default Form