const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
    },
    categoryImage: { type: String },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    offer: {
        type: Number,
        productPicture: [
            {
                img: { type: String }
            }
        ],
        reviews: [
            {
                userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
                review: String
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, ref: 'user'
        },
        upsatedAt: Date,
    }
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
}, ({ timestamps: true }));
module.exports = mongoose.model('Product', productSchema);