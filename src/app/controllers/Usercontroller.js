const User = require('../models/User');
const Yup = require('yup');

class Usercontroller{
    async store(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        });
        //se não passar na verificar
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'falha da validação!'})
        };
        const userExist = await User.findOne({
            where: { email: req.body.email }
        });

        if(userExist){
            return res.status(400).json({
                error: 'usuário já existe.'
            });
        }
        //cadastrando o usuário. Utilizando o Sequelize.
        const { id, name, email} = await User.create(req.body)

        return res.json({
            id,
            name,
            email,
            mensagen:'Usuário criando com sucesso!'
        })
    }

    async update(req,res){
        const schema = Yup.object().shape({
            name: Yup.string(),
            email:Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldpassword', (oldPassword, field) =>
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password, field)=>
                password ? field.required().oneOf([Yup.ref('password')]) : field,            
            )
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'falha na validação!'})
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);
        // se o email for diferente do que ta no banco de dados ele irar alterar
        if(email !== user.email){
            // verificando se já existe o email que a pessoa quer no banco de dados.
            const userExist = await User.findOne({
                where: { email: email }
            });
            if(userExist){
                return res.status(401).json({
                    error: 'email já existe!'
                })
            }
        };
        // se a senha for diferente da senha antiga dele, vai dar error.
        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({
                error: 'senha antiga incorreta!'
            })
        };

        // se passar por toda verificação, ai sim vai update que quer.
        const { id, name } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,

        })
    }
}

module.exports = new Usercontroller();