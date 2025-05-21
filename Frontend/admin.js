document.addEventListener('DOMContentLoaded', async () => {
    const tabla = document.getElementById('tablaCitas');
  
    try {
      const res = await fetch('http://localhost:3000/api/citas');
      const citas = await res.json();
  
      if (Array.isArray(citas)) {
        citas.forEach(cita => {
          const row = document.createElement('tr');
          row.classList.add('border-b');
  
          row.innerHTML = `
            <td class="px-4 py-2">${cita.dui}</td>
            <td class="px-4 py-2">${new Date(cita.fecha).toLocaleString()}</td>
            <td class="px-4 py-2">${cita.medico}</td>
            <td class="px-4 py-2">${cita.especialidad}</td>
          `;
  
          tabla.appendChild(row);
        });
      } else {
        tabla.innerHTML = `<tr><td colspan="4" class="text-center text-red-600 p-4">Error al cargar citas.</td></tr>`;
      }
    } catch (err) {
      console.error(err);
      tabla.innerHTML = `<tr><td colspan="4" class="text-center text-red-600 p-4">No se pudo conectar al servidor.</td></tr>`;
    }
  });
  