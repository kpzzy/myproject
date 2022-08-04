const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            
            like: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull : false,
            },
        },{
            sequelize,
            timestamps: false,
            modelName: "Like",
            tableName: "likes",
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Like.belongsTo(db.User, {foreignKey: 'Like', sourceKey:'id'});
    }
};