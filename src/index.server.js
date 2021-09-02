const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//routes
const authRoutes = require ('./routes/auth');
const adminRoutes = require ('./routes/admin/auth');


//environment variable or const
env.config();

//mongodb connection cloud
//`mongodb+srv://root:<password>@cluster0.mfxqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.mfxqr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,  
// }).then(() => {
//     console.log('Connection estabislished with MongoDB');
// })
// .catch(error => console.error(error.message));

//local connection
mongoose.connect(`mongodb://127.0.0.1:27017/`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
     
}).then(() => {
    console.log('Connection estabislished with MongoDB');
})
.catch(error => console.error(error.message));


//middleware
app.use(bodyParser());
app.use('/api',authRoutes);
app.use('/api',adminRoutes);



//listen - start server
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT} `);
});