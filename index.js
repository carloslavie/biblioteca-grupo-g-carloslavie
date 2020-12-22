const express = require('express');
const mysql = require('mysql');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`estoy escuchando en el puerto ${port}`);
})
