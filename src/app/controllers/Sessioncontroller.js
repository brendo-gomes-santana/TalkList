const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

class SessionController{
    async store(req,res){
        const { email, passowrd } = req.body;

        //verificando se esse email exite.
        const user = await User.findOne({
            where: {email: email}
        })

        if(!user){
            return res.status(401).json({error: 'usuário não existe!'})
        }

        //verificar se a senha  não bate
        if(!(await user.checkPassword(passowrd))){
            return res.status(401).json({error: 'senha incorreta!'})
 
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email
            },                      //md5 para meu nome
            token: jwt.sign({ id }, authConfig.secret , {
                expiresIn: authConfig.expires,
            })
        })
    }
}

module.exports = new SessionController();