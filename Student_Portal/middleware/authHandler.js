const authHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized: Missing or invalid token' 
        });
    }

    const token = authHeader.split(' ')[1];
    req.token = token; 
    next();
};

export default authHandler; // Changed from module.exports