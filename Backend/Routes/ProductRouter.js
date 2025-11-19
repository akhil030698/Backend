const express = require('express');
const { ensureAuth } = require('../Middileware/Auth');
const app = express();
const router = express.Router();

router.get('/',ensureAuth, (req, res) => {
    res.status(200).json([
        { id: 1, name: 'TV', price: 5000 },
        { id: 2, name: 'Smart TV', price: 10000 },
        { id: 3, name: 'Mobile', price: 25000 }
    ]);
});

module.exports = router;