const mongoose = require('mongoose');

//post schema

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    PostImg:{
        type: [String],
        required: true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Mf-KvZ0OBtNxAhDiOgUA4Yoi5G9zyZpqCg&s"
    },
    category:{String ,
    type: [String],
    } ,

    likes: {
        type: Number,
        default: 0
    },
    postdate: {
        type: Date,
        default: Date.now
    }
}, Timestamps = true);

module.exports = mongoose.model('Post', PostSchema);