const User = require('../models/User');

class Usercontroller{
    async store(req, res){

        const userExist = await User.findOne({
            where: { email: req.body.email }
        });

        if(userExist){
            return res.status(400).json({
                error: 'usuário já existe.'
            });
        }

        const { id, name, email} = await User.create(req.body)

        return res.json({
            id,
            name,
            email,
        })
    }
}

module.exports = new Usercontroller();