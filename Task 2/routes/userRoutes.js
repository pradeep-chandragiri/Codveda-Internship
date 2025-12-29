import express from 'express';

const userRoutes = express.Router();

import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';


// Route to create a new user
userRoutes.post('/users/new', createUser);

// Route to get all users
userRoutes.get('/users/get-all', getAllUsers);

// Route to get user by ID
userRoutes.get('/users/get/:id', getUserById);

// Route to update user by ID
userRoutes.put('/users/update/:id', updateUser);

// Route to delete user by ID
userRoutes.delete('/users/delete/:id', deleteUser);

export default userRoutes;