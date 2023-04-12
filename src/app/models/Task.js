const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Task extends Model {
    static init(sequelize){
        super.init(
            {
                task: Sequelize.STRING,
                check: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        return this;
    
    }

    static associate(models){
            // belongsto que dizer ('pertence á') no caso, pertence á usuário
        this.belongsTo(models.User, {  
            foreignKey: 'user_id', 
            as: 'user'
            // apelido 
        })
    }

}

module.exports = Task;