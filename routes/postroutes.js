const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//fetch all post endpoint
router.get('/posts', async (req, res) => {

    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({
            sucess: false, message: 'error fetching posts',
            error: err.message
        });
    }
})


//create a new user endpoint
router.post('/create-post', async (req, res) => {
    //destructure the request body
    const { title, content, description, category, tags, PostImg } = req.body;
    //create a new post
    try {
        const newPost = new Post({
            title,
            body: content,
            description,
            category,
            tags,
            PostImg
        })
        //saving and storing to database
        const savedPost = await newPost.save();
        res.status(200).json({ sucess: true, data: savedPost });
    } catch (error) {
        res.json({msg:'error creating data', error:error.msg})
    }
});

//fetch single data 
router.get('/getone/:id', async (req, res)=> {
      //destructuring
      const {id} = req.params;
      try {
        const singlePost = await Post.findById(id)

        if (!singlePost) {
            return res.status(500).json({
                success:false, message: 'post not found'
            })
        }
      } catch (error) {
        res.json({message:error})
      }
});

//update existing post
router.put('/update/:PostID', async (req, res)=>{
      //extract postID
      const {PostID} = req.params;
      //destructuring
      const { title, description, content, category, PostImg} = req.body;
      try {
        const updatePost = await Post.findByIdAndUpdate(PostID, {
            title,
            description,
            body: content,
            category,
            PostImg
        }, {new:true });
        if(!updatePost) {
            res.status(400).json({success:false, message:'invalid input of param'})
        }

        res.status(200).json({success:true, data: updatePost})

      } catch (error) {
        res.json({message:'error'})
      }
});

// delete post 

router.delete('/deletepost/:PostID', async (req, res)=>{
    const {PostID} = req.params;
    try {
        const delPost = await Post.findByIdAndDelete(PostID)
        if (!delPost){
            res.status(500).json({success: false, message:'invalid id'})
        }

        res.status(200).json({success: true, message:'your post has been deleted successfully'})
    } catch (error) {
        res.json({msg:error})
    }
})

module.exports = router;