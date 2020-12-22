const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('Hola Mundo ruta de prueba');
});

module.exports = router;