const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');
// const authMiddleware = require('../middlewares/auth.js');
const passport = require('passport')

// Protect the route with JWT authentication middleware
router.post('/tasks', passport.authenticate('jwt', { session: false }), taskController.addTask);
// the callback method is used for debugging
router.get('/tasks',  (req, res, next) => {
    // console.log('Request Headers:', req.headers);
    next();
}, passport.authenticate('jwt', { session: false }), taskController.getTask);
router.delete('/tasks/:taskId', passport.authenticate('jwt', { session: false }), taskController.deleteTask);
router.patch('/tasks/:taskId', passport.authenticate('jwt', { session: false }), taskController.updateTask);

module.exports = router;
