const express = require('express');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');
const router = express.Router();

router.get('/', async (req, res) => {
    if(req.isAuthenticated()){
        res.render('desktop');
    } else {
        res.render('index');
    }
});

module.exports = router;
