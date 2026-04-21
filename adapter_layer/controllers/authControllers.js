import * as AuthService from "../services/authService.js";

export const registerStudent = async (req, res) => {
   
    const studentProfile = req.body; 
    
    try {
        console.log("Adapter received request on port 4000. Sending to service layer...");
        
    
        const result = await AuthService.registerStudent(studentProfile);
        
        res.status(201).json({
            success: true,
            message: [
                { result: "A new account has been created and successfully forwarded to the legacy system!" },
                result
            ]
        });
    } catch (error) {
        console.error("Adapter Controller Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred while registering the student."
        });
    }
}