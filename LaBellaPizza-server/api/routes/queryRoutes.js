const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

// Route to add a new query
router.post('/query', queryController.addQuery);

router.get('/queries',  queryController.getAllQueries);

router.put('/query/:id/respond',  queryController.respondToQuery);

router.delete('/query/:id',  queryController.deleteQuery);

module.exports = router;
