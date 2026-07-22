const { user, conversation, message } = require('./mongodb');
const bycrpt = require('bcrypt');


const createUser = async (name, email, password) => {
    try {
        const hash = await bycrpt.hash(password, 10);
        const results = await user.create({
            name: name,
            email: email,
            password: hash
        });
        return results;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const results = await user.findOne({ email: email }).select('name email password');
        if(!results) throw new Error('Incorrect Email');
        if(bycrpt.compare(password, results.password)) return results;
        else throw new Error('Incorrect Password');
        
    } catch (error) {
        throw error;
    }
};

const findAllUser = async () => {
    try {
        const results = await user.find().select('_id name email');
        return results;
    } catch (error) {
        throw error;
    }
};

const findUserByID = async (_id) => {
    try {
        const results = await user.findById(_id).select('_id name email');
        return results;
    } catch (error) {
        throw error;
    }
};

const findAllConversations = async (_id) => {
    try {
        const results = await conversation.find({user_id: _id}).select('_id title createdAt');
        return results;
    } catch (error) {
        throw error;
    }
};

const findAllMessagesOfConversation = async (coversation_id) => {
    try {
        const results = await message.find({coversation_id: coversation_id}).select('_id content sender createdAt');
        return results;
    } catch (error) {
        throw error;
    }
};

const createNewConversation = async (title, user_id) => {
    try {
        const results = await conversation.create({title: title, user_id: user_id});
        return results;
    } catch (error) {
        throw error;
    }
};

const sendMessage = async (message, conversation_id, sender) => {
    try {
        const results = await message.create({conversation_id: conversation_id, content: message, sender: sender});
        return results;
    } catch (error) {
        throw error;
    }
};

const updateConversationTitle = async (conversation_id, title) => {
    try {
        const results = await conversation.findByIdAndUpdate(coversation_id, {
                title: title
            },
            {
                new: true
            }
        );
        return results;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (_id) => {
    try {
        const results = await user.findByIdAndDelete(_id);
        if (!results) throw new Error('User not Found');
        return results;
    } catch (error) {
        throw error;
    }
};

const deleteConversation = async (conversation_id) => {
    try {
        const results = await conversation.findByIdAndDelete(conversation_id);
        if (!results) throw new Error('Conversation not Found');
        return results;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createUser, findAllUser, login, findUserByID, deleteUser, findAllConversations
};