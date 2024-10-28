const express = require('express');
const mongoose = require('mongoose') // importing mongoose
const cors = require('cors');
//import routes
const postsRoute = require('./routes/postroutes');
//import user routes
const userRoute = require('./routes/userRoutes');
require('dotenv').config();
// CONECT TO MONGODB
const dbUrl =process.env.MONGODB_URL ;




mongoose.connect(dbUrl).then(() => {
    console.log(`connected to mongoose`);
    const app = express();
    port = 5455;

    //adding middle ware
    app.use(express.json());
    app.use(cors());

    //connect routers
    app.use('/api', postsRoute);
    app.use('/api', userRoute);


    app.get('/', (req, res) =>{
        res.send('<h1>Hello World</h1>');
    });

    app.listen(port, () => {
        console.log(`😍😎 app listening to zino at http://localhost:${port}`)
    })

}).catch((error) => {
    console.log(`failed to connect to mongodb`, error);
});






