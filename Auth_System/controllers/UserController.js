import { createUser, signIn as loginUser } from "../models/UserModel.js";

export const register = async (req, res) => {
    
    const { firstName, lastName, dob, address, course, major, status, email, password } = req.body;

    try {
       
        const userProfile = { 
            firstName, 
            lastName, 
            dob, 
            address, 
            course, 
            major, 
            status 
        };
        
        // 3. Pass the profile, email, and password to the model
        const result = await createUser(userProfile, email, password);
        
        res.status(201).json({
            success: true,
            message: "Database insertion successful!",
            // result.adapterResponse contains the data from the Render API
            adapterDetails: result.adapterResponse 
        });
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({ 
            success: false, 
            message: e.message || "Internal Server Error" 
        });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginUser(email, password);
        res.status(200).json({
            success: true,
            message: ["Sign in successful!", token]
        });
    } catch (e) {
        console.log(e);
        res.status(e.statusCode || 500).json({ 
            success: false, 
            message: e.message || "Internal Server Error" 
        });
    }
};