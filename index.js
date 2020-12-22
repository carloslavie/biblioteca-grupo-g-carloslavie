const express = require('express');
const conexion = require('./src/db/conexion');

const app = express();
const port = 3000;

app.use(express.json());
app.use(require('./src/routes'));
app.use(require('./src/routes/persona'));
app.use(require('./src/routes/categoria'));
app.use(require('./src/routes/libro'));


app.listen(port, () => {
    console.log(`estoy escuchando en el puerto ${port}`);
})
