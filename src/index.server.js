const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require ('./routes/category');
const productRoutes = require ('./routes/product');
const cartRoutes = require ('./routes/cart');

//environment variable or const
env.config();

//mongodb connection cloud
//`mongodb+srv://root:<password>@cluster0.mfxqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.mfxqr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection estabislished with MongoDB');
})
.catch(error => console.error(error.message));

//local connection
// mongoose.connect(`mongodb://127.0.0.1:27017/`,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,

//     }).then(() => {
//         console.log('Connection estabislished with MongoDB');
//     })
//     .catch(error => console.error(error.message));


//middleware
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);


//listen - start server
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT} `);
});
