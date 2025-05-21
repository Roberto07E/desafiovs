import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  const [pacientes, setPacientes] = useState({});
  const [citas, setCitas] = useState({});
  const [formPaciente, setFormPaciente] = useState({
    dui: '', nombre: '', apellido: '', telefono: '', correo: '', nacimiento: '', tipo: ''
  });
  const [formCita, setFormCita] = useState({
    dui: '', fecha: '', medico: '', especialidad: ''
  });

  const validarDUI = (dui) => /^\d{8}-\d$/.test(dui);

  const registrarPaciente = () => {
    const { dui, nombre, apellido, telefono, correo, nacimiento, tipo } = formPaciente;
    if (!validarDUI(dui)) {
      Alert.alert('Error', 'Formato de DUI inválido. Usa 00000000-0');
      return;
    }
    if (pacientes[dui]) {
      Alert.alert('Ya registrado', 'Este paciente ya está en el sistema.');
      return;
    }
    const nuevo = { nombre, apellido, telefono, correo, nacimiento, tipo };
    setPacientes({ ...pacientes, [dui]: nuevo });
    Alert.alert('Éxito', 'Paciente registrado correctamente');
    setFormPaciente({ dui: '', nombre: '', apellido: '', telefono: '', correo: '', nacimiento: '', tipo: '' });
  };

  const reservarCita = () => {
    const { dui, fecha, medico, especialidad } = formCita;
    if (!pacientes[dui]) {
      Alert.alert('No registrado', 'Este paciente no está en el sistema.');
      return;
    }
    const nuevaFecha = new Date(fecha);
    const anterior = citas[dui] ? new Date(citas[dui].fecha) : null;
    const dias = anterior ? Math.abs((nuevaFecha - anterior) / (1000 * 60 * 60 * 24)) : null;

    if (anterior && dias < 7) {
      Alert.alert('Error', 'Este paciente ya tiene una cita esta semana.');
      return;
    }

    setCitas({ ...citas, [dui]: { fecha, medico, especialidad } });
    Alert.alert('Éxito', 'Cita reservada correctamente');
    setFormCita({ dui: '', fecha: '', medico: '', especialidad: '' });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registro de Pacientes</Text>

      {['dui', 'nombre', 'apellido', 'telefono', 'correo', 'nacimiento', 'tipo'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formPaciente[field]}
          onChangeText={(text) => setFormPaciente({ ...formPaciente, [field]: text })}
        />
      ))}
      <Button title="Registrar Paciente" onPress={registrarPaciente} color="#1D4ED8" />

      <Text style={styles.title}>Reservar Cita</Text>
      {['dui', 'fecha', 'medico', 'especialidad'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formCita[field]}
          onChangeText={(text) => setFormCita({ ...formCita, [field]: text })}
        />
      ))}
      <Button title="Reservar Cita" onPress={reservarCita} color="#059669" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    marginBottom: 12,
  },
});
