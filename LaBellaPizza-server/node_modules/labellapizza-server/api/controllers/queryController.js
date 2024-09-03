const Query = require('../models/query');

// Add a new query
exports.addQuery = async (req, res) => {
    try {
        const { question } = req.body;
        const userId = req.user.id; // Assuming you have user authentication

        const newQuery = new Query({
            userId,
            question,
        });

        await newQuery.save();
        res.status(201).json(newQuery);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit query' });
    }
};

// Get all queries (for admin)
exports.getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find().populate('userId', 'name email');
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve queries' });
    }
};

// Admin responds to a query
exports.respondToQuery = async (req, res) => {
    try {
        const { response } = req.body;
        const queryId = req.params.id;

        const updatedQuery = await Query.findByIdAndUpdate(queryId, { response }, { new: true });
        res.status(200).json(updatedQuery);
    } catch (error) {
        res.status(500).json({ error: 'Failed to respond to query' });
    }
};

// Delete a query
exports.deleteQuery = async (req, res) => {
    try {
        const queryId = req.params.id;
        await Query.findByIdAndDelete(queryId);
        res.status(200).json({ message: 'Query deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete query' });
    }
};
