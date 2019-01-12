const UserModel = require("./user.model");

class UserDAL {
    constructor(context = {}) {
        this.context = context;
        this.select = "-password -createdAt -updatedAt";
    }
}

UserDAL.prototype.createUser = function createUser(data) {
    const newUser = new UserModel(data);

    return newUser.save();
};

UserDAL.prototype.getUser = function getUser(options = {}) {
    const { select = this.select } = options;

    return UserModel.findOne(this.context)
        .select(select)
        .lean()
        .exec();
};

module.exports = UserDAL;
