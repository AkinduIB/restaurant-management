const Carts = require("../models/Carts");

// Get carts using email
const getCartByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await Carts.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Post a cart when add-to-cart button is clicked
const addToCart = async (req, res) => {
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
    try {
        // Check if the item already exists in the user's cart
        console.log("Checking if item exists in cart:", menuItemId, email);
        const exitingCartItem = await Carts.findOne({ menuItemId, email });
        if (exitingCartItem) {
            console.log("Item already exists in cart:", exitingCartItem);
            return res.status(400).json({ message: "Product already exists in the cart!" });
        }

        // Create a new cart item
        console.log("Creating new cart item...");
        const cartItem = await Carts.create({
            menuItemId, name, recipe, image, price, quantity, email
        });
        console.log("Cart item created:", cartItem);
        res.status(201).json(cartItem);

    } catch (error) {
        console.error("Error in addToCart:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Delete a cart item
const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const deletedCart = await Carts.findByIdAndDelete(cartId);
        if (!deletedCart) {
            return res.status(401).json({ message: "Cart Items not found!" });
        }
        res.status(200).json({ message: "Cart Item Deleted Successfully!" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a cart item
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

    try {
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId, { menuItemId, name, recipe, image, price, quantity, email }, {
                new: true, runValidators: true
            }
        );
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart item is not found" });
        }
        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single cart item
const getSingleCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const cartItem = await Carts.findById(cartId);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCartByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart
};
