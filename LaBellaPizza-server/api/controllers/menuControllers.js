const Menu = require("../models/Menu");

const getAllMenuItems = async (req, res) => {
    try {
        const menus = await Menu.find({});
        if (!menus.length) {
            return res.status(404).json({ message: "No menu items found" });
        }
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMenuItems,
};
