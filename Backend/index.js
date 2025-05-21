const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { enviarAlertas } = require('./utils/alertas');

const pacientesRouter = require('./routes/pacientes');
const citasRouter = require('./routes/citas');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/pacientes', pacientesRouter);
app.use('/api/citas', citasRouter);

// Ejecutar alertas cada hora
cron.schedule('0 * * * *', enviarAlertas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
