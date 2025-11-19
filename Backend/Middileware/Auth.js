const jwt =  require('jsonwebtoken');

const ensureAuth = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized: No token provided' });
    }
    try{
        const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);       
        req.user = decodedToken;
        next();
    }catch(err){
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = {
    ensureAuth
};