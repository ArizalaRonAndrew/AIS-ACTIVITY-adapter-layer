import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (userProfile, email, password) => {
  // --- VALIDATION BLOCK --- //

  // 1. Check for basic auth requirements
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    const error = new Error("Email and password are required.");
    error.statusCode = 400;
    throw error;
  }

  // 2. Dynamically check for missing profile fields
  const requiredFields = ['firstName', 'lastName', 'dob', 'address', 'course', 'major'];
  const missingFields = requiredFields.filter(field => !userProfile[field] || String(userProfile[field]).trim() === "");

  if (missingFields.length > 0) {
    const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
    error.statusCode = 400;
    throw error;
  }

  // 3. Validate specific formats
  if (!validator.isEmail(email)) {
    const error = new Error("Invalid email format.");
    error.statusCode = 400;
    throw error;
  }

  if (!validator.isStrongPassword(password)) {
    const error = new TypeError("Password is not strong enough.");
    error.statusCode = 400;
    throw error;
  }

  // --- DATABASE & API BLOCK --- //

  // Check if email already exists
  const [user] = await pool.query("SELECT email FROM users WHERE email = ?", [email]);

  if (user.length === 1) {
    const error = new Error(`The email ${email} is already in use.`);
    error.statusCode = 400;
    throw error;
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // External API Call to your ADAPTER LAYER
  // NOTE: Ensure '/auth/register' matches the exact route in your adapter_layer app!
  const response = await fetch(`http://localhost:4000/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userProfile)
  });

  // THIS IS THE FIX: Stop the process if the Adapter fails!
  if (!response.ok) {
    const errorText = await response.text();
    const error = new Error(`Adapter Layer Failed: ${response.status} - ${errorText}`);
    error.statusCode = 500;
    throw error; 
  }

  // Insert new user into the database ONLY if the adapter succeeded
  const [newUser] = await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword]
  );

  return newUser;
};

export const signIn = async (email, password) => {
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    const error = new Error("Email and password are required.");
    error.statusCode = 400;
    throw error;
  }

  const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

  if (user.length === 0) {
    const error = new Error(`An account with this email: ${email} does not exist.`);
    error.statusCode = 400;
    throw error;
  }

  if (!bcrypt.compareSync(password, user[0].password)) {
    const error = new Error("Invalid password.");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user[0].id }, process.env.SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const getUsers = async (id) => {
  if (isNaN(parseInt(id))) {
    throw new Error("Invalid user ID.");  
  }

  const [user] = await pool.query("SELECT * FROM users WHERE userID = ?", [id]);
  return user;
};