const jwt = require('jsonwebtoken');
const autMiddleware = () =>{
     if (!token) {
        return resizeBy.status(403).send('Token is required for authentication')
    }
    jwt.veriry(token, process.env.JWT_SECRET, (err, decorded) =>{
        if (err){
            return res.status(403).send('invalid token')
        }
        req.userID = decorded.id
        next();
    })
}
module.exports = authMiddleware;