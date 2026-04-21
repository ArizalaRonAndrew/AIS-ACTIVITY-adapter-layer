import { createUser, signIn as loginUser } from "../models/UserModel.js";

export const register = async (req, res) => {
  // 1. Extract the newly required fields from the request body
  const { firstName, lastName, dob, address, course, major, email, password } = req.body;

  try {
    // 2. Package the profile-specific fields to send to the external API
    const userProfile = { firstName, lastName, dob, address, course, major };
    
    // 3. Call the model function
    const user = await createUser(userProfile, email, password);
    
    res.status(201).json({
      success: true,
      message: [
        { result: "A new account has been created!" },
      ]
    });
  } catch (e) {
    console.log(e);
    res.status(e.statusCode || 500).json({ success: false, message: e.message || "Internal Server Error" });
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
    res.status(e.statusCode || 500).json({ success: false, message: e.message || "Internal Server Error" });
  }
};