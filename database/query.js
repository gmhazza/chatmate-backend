const { user, conversation, message } = require('./mongodb');
const bycrpt = require('bcrypt');


const createUser = async (name, email, password, gender) => {
    try {
        const hash = await bycrpt.hash(password, 10);
        const results = await user.create({
            name: name,
            email: email,
            password: hash,
            gender: gender
        });
        return results;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const results = await user.findOne({ email: email }).select('avatar _id name email password');
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
        const results = await user.findById(_id).select('_id avatar name email gender');
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

const findAllMessagesOfConversation = async (_id) => {
    try {
        const results = await message.find({conversation_id: _id}).select('_id content sender createdAt').lean();
        return results;
    } catch (error) {
        throw error;
    }
};

const CreateNewConversation = async (user_id, title) => {
    try {
        const results = await conversation.create({title: title, user_id: user_id});
        return results;
    } catch (error) {
        throw error;
    }
};

const SendMessage = async (msg, conversation_id, sender) => {
    try {
        const results = await message.create({conversation_id: conversation_id, content: msg, sender: sender});
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

const UpdateConversationTitle = async (conversation_id, title) => {
    try {
        const updatedConversation = await conversation.findOneAndUpdate(
            { _id: conversation_id },
            { $set: { title: title } },
            { new: true, runValidators: true }
        );
        if (!updatedConversation) throw new Error('Conversation not Found');
        return updatedConversation;
    } catch (error) {
        throw error;
    }
};

const DeleteConversation = async (conversation_id) => {
        try {
        const updatedConversation = await conversation.findOneAndDelete({ _id: conversation_id });
        if (!updatedConversation) throw new Error('Conversation not Found');
        await DeleteMessagesByConversationId(conversation_id);
        return updatedConversation;
    } catch (error) {
        throw error;
    }
};

const updateProfile = async (Updatedprofile) => {
    try {
        const hash = await bycrpt.hash(updateProfile.password, 10);
        const result = await user.findOneAndUpdate(
            { _id: updateProfile._id },
            { $set: {
                    name: updateProfile.name,
                    gender: Updatedprofile.gender
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
    } catch (error) {
        throw error;
    }
}

const DeleteMessagesByConversationId = async (conversation_id) => {
    try {
        const result = await message.deleteMany({ conversation_id: conversation_id });
        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createUser, findAllUser, login, findUserByID, deleteUser, findAllConversations, CreateNewConversation, findAllMessagesOfConversation,
    SendMessage, UpdateConversationTitle, DeleteConversation, updateProfile
};