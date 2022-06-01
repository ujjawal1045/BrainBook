const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //incluse aray of ids of all comkment in post schema
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ] 
    
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post; 