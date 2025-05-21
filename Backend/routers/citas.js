const express = require('express');
const router = express.Router();
const citas = {};

router.post('/', (req, res) => {
  const { dui, fecha, medico, especialidad } = req.body;
  const nueva = new Date(fecha);
  const anterior = citas[dui] ? new Date(citas[dui].fecha) : null;
  const dias = anterior ? Math.abs((nueva - anterior) / (1000 * 60 * 60 * 24)) : null;

  if (anterior && dias < 7) return res.status(400).json({ msg: 'Ya tiene cita esta semana' });

  citas[dui] = { fecha, medico, especialidad };
  res.json({ msg: 'Cita reservada' });
});

router.get('/:dui', (req, res) => {
  const cita = citas[req.params.dui];
  if (!cita) return res.status(404).json({ msg: 'No tiene cita' });
  res.json(cita);
});

module.exports = router;
