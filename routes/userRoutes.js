const express = require('express');
const User = require('../models/User');
const router = express.Router();

//fetch all data
router.get('/users', async (req, res) =>{
    try{
        const users = await User.find();
        res.status(200).json({success:true, data:users});
    }catch (error){
        res.status(500).json({success: false, message:'error fetching users', error:error.message});
    }
} )

module.exports = router;