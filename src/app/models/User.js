const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model{
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password:Sequelize.VIRTUAL,
                password_hast: Sequelize.STRING,
            },
            {
                sequelize, 
            }
        );
        //antes de salvar as informações no banco de dados, irá
        //chamar essa função.              pegando o usuário
        this.addHook('beforeSave', async (user)=> {
            //vai verificar se p usuário mandou senha, se sim
            if(user.password){
                //vai mudar para uma senha pp
                user.password_hast = await bcrypt.hash(user.password, 8) 
            }
        });
        return this;
    }

    checkPassword(passowrd){
        //fazer a comparação entre as senhas
        return bcrypt.compare(passowrd, this.password_hast);
    }
}

module.exports = User;