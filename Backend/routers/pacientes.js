const express = require('express');
const router = express.Router();
const pacientes = {};

router.post('/', (req, res) => {
  const { dui, nombre, apellido, telefono, correo, nacimiento, tipo } = req.body;
  if (pacientes[dui]) return res.status(400).json({ msg: 'Paciente ya registrado' });

  pacientes[dui] = { nombre, apellido, telefono, correo, nacimiento, tipo };
  res.json({ msg: 'Paciente registrado correctamente' });
});

router.get('/:dui', (req, res) => {
  const paciente = pacientes[req.params.dui];
  if (!paciente) return res.status(404).json({ msg: 'No encontrado' });
  res.json(paciente);
});

module.exports = router;
