const { getMessaging } = require('firebase-admin/messaging');
const pacientes = require('../routes/pacientes').pacientes;
const citas = require('../routes/citas').citas;

function enviarAlertas() {
  const ahora = new Date();

  Object.entries(citas).forEach(([dui, cita]) => {
    const fechaCita = new Date(cita.fecha);
    const diffHoras = Math.abs((fechaCita - ahora) / (1000 * 60 * 60));

    if (diffHoras > 23 && diffHoras < 25) {
      console.log(`Enviar alerta: cita mañana para paciente ${dui}`);
      // Aquí puedes usar Firebase Admin para enviar notificación
    }

    const paciente = pacientes[dui];
    if (paciente && (paciente.tipo === 'medicamento_permanente' || paciente.tipo === 'pensionado')) {
      // Simular alerta periódica de medicamento
      console.log(`Enviar recordatorio de medicamento a paciente ${dui}`);
    }
  });
}

module.exports = { enviarAlertas };
