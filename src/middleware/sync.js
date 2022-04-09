const Post = require("../database/models/Post");
const User = require("../database/models/user");

const sync = () => {
    Post.sync({alter: true});
    User.sync({alter: true});
}

module.exports = sync;
