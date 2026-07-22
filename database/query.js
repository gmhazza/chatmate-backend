const { user, conversation, message } = require('./mongodb');

const createUser = async (name, email, password) => {
    try {
        const results = await user.create({
            name: name,
            email: email,
            password: password
        });
        return results;
    } catch (error) {
        throw error;
    }
};

const findAllUser = async () => {
    try {
        const results = await user.find();
        return results;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createUser, findAllUser
};