const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderedDate: { type: Date, default: Date.now },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    orderStatus: { type: String, required: true, enum: ['pending', 'shipped', 'delivered', 'cancelled'] },
    total: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);