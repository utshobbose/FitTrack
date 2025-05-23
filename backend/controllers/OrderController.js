const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

// Create a new order
    const createOrder = async (req, res) => {
    try {
        const { products, userId } = req.body;

        // console.log("Received order data:", products);
        // console.log("User ID:", userId);

        if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
        }

        let totalAmount = 0;
        for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
        }
        totalAmount += product.price * item.quantity;
        }

        const order = new Order({
        products,
        totalAmount,
        userId, 
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error("Error while creating order:", error);
        res.status(500).json({ message: "Server error while creating order." });
    }
    };


// Get all orders for the authenticated user
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.headers.userId }).populate("products.productId", "name price");
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching orders." });
    }
};

// Get a specific order by ID for the authenticated user
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findOne({ _id: id, userId: req.headers.id }).populate("products.productId", "name price");

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching the order." });
    }
};

// Delete an order by ID for the authenticated user
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findOneAndDelete({ _id: id, userId: req.headers.id });

        if (!order) {
            return res.status(404).json({ message: "Order not found or not authorized to delete." });
        }

        res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while deleting the order." });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
};
