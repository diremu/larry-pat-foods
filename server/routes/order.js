const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {
    createOrder,
    getUserOrders,
    getOrder,
    updateOrder,
    deleteOrder
} = require('../controller/orderController')

const router = express.Router()

// Create a new order
router.post('/:userId/:cartId/:shippingAddressId', requireAuth, createOrder); 

// Get all orders for a user
router.get('/get-user-orders/:userId', requireAuth, getUserOrders); 

// Get a single order by ID
router.get('/get-order/:orderId', requireAuth, getOrder); 

// Update an order by ID
router.patch('/update-order/:orderId', requireAuth, updateOrder); 

// Delete an order by ID
router.delete('/delete-order/:orderId', requireAuth, deleteOrder); 

module.exports = router