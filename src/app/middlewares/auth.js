const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const auth = require('../../config/auth');

module.exports =  async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: 'Token não existe!'
        })
    }

    const [, token] = authHeader.split(' ');

    //sucesso
    try {

        const decoded = await promisify(jwt.verify)(token, auth.secret);
        req.userId = decoded.id;

        return next();

    } catch(err){
        return res.status(401).json({
            error: 'Token invalido!'
        })
    }


}