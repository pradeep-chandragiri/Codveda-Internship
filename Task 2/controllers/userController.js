import { users } from "../data/data.js";

// Create a new user
export const createUser = (req, res) => {

    try {

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }
        
        const newUser = {
            id: users.length + 1,
            name: name.trim(),
            email: email.trim()
        };
        users.push(newUser);

        res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}

// Get all users
export const getAllUsers = (req, res) => {
    try {

        if(users.length === 0){
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({ success: true, users });
        
    } catch (error) {

        res.status(500).json({ success: false, message: "Server Error", error: error.message });
        
    }
}

// Get user by ID
export const getUserById = (req, res) => {

    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}

// Update user by ID
export const updateUser = (req, res) => {

    try {
        
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { name, email } = req.body;
        const updatedUser = { ...user, name, email };
        users[users.indexOf(user)] = updatedUser;

        res.status(200).json({ success: true, user: updatedUser });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}

// Delete user by ID
export const deleteUser = (req, res) => {

    try {
        
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        users.splice(userIndex, 1);

        res.status(200).json({ success: true, message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}