const Sequelize = require("sequelize");
const User = require('./user');
const Comment = require('./comment');
const Guitar = require('./guitars');
const Like = require('./like');

const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;
db.Guitar = Guitar;
db.Like = Like;

User.init(sequelize);
Comment.init(sequelize);
Guitar.init(sequelize);
Like.init(sequelize);


module.exports = db;