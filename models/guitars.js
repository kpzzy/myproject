const Sequelize = require('sequelize');

module.exports = class Guitar extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            
            Comment: {
                type: Sequelize.STRING(100),
                allowNull : false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull : true,
                defaultValue : Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps: false,
            modelName: "Guitar",
            tableName: "guitarss",
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Guitar.belongsTo(db.User, {foreignKey: 'commenter', sourceKey:'id'});
    }
};