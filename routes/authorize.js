const jwt = require('jsonwebtoken');
const jwt_decode = require ("jwt-decode");

module.exports = async(req, res, next) => {
    const token =await req.cookies.access_token;
    //const payload = jwt_decode(token);
    //await console.log(payload);

    if(!token) return res.status(401).send('Access denied!')

    try {
        //verify method returns te token payload
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        res.status(400).send(err.message)
    }
}