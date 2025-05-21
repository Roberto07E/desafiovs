const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./firebase-admin');

app.use(cors());
app.use(express.json());

// Rutas externas
const pacientesRoutes = require('./routes/pacientes');
const citasRoutes = require('./routes/citas');

app.use('/api/pacientes', pacientesRoutes);
app.use('/api/citas', citasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
