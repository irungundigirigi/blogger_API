const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return res.status(401).send('Access denied!')

    try {
        //verify method returns te token payload
        const payload =jwt.verify(token, process.env.TOKEN_SECRET);
        const userEmail = payload;
        next();
    } catch (err) {
        res.status(400).send(err.message)
    }
}