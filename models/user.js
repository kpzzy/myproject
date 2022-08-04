const Sequelize = require('sequelize');
const db = require('.');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nickname: {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,
            },
            password: {
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            // comment: {
            //     type : Sequelize.TEXT,
            //     allowNull : true,
            // },
            created_at : {
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName : 'User',
            tableName : 'users',
            paranoid: false,
            charset : 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }


    static associate(db) {
        db.User.hasMany(db.Comment, {foreignKey: 'commenter' , sourceKey: 'id'})
    }
}