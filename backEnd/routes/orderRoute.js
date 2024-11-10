import express from 'express'
import { placeOrder,placeOrderRazorpay,placeOrderStrip,updateStatus,userOrders,allOrders,verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/auth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStrip)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// user Feature

orderRouter.post('/userorders',authUser,userOrders)

// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;