document.addEventListener("DOMContentLoaded", async () => {
  const salidaForm = document.getElementById("salida-form");
  const salidasFile = "../data/salidas.json";
  const salidaTable = document.getElementById("salidas-body");

  // Cargar salidas desde JSON
  const data = await getSalidaData(salidasFile);
  if (Array.isArray(data.salidas)) {
    data.salidas.forEach((salida) => addSalidaRow(salida));
  } else {
    console.warn("No se encontraron salidas en el archivo JSON.");
  }

  salidaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const patente = document
      .getElementById("input-patente-salida")
      .value.trim();
    const fecha = document.getElementById("fecha-salida").value;
    const hora = document.getElementById("hora-salida").value;

    if (patente && fecha && hora) {
      const newSalida = {
        patente,
        fecha_salida: fecha,
        hora_salida: hora,
      };

      addSalidaRow(newSalida);
      salidaForm.reset();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });

  async function getSalidaData(file) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error al cargar el JSON:", error);
      return { salidas: [] };
    }
  }

  function addSalidaRow(salida) {
    const newRow = salidaTable.insertRow();
    newRow.innerHTML = `
      <td>${salida.patente}</td>
      <td>${salida.fecha_salida}</td>
      <td>${salida.hora_salida}</td>
      <td><button class="remove-btn btn btn-danger btn-sm">Eliminar</button></td>
    `;

    newRow.querySelector(".remove-btn").addEventListener("click", () => {
      if (
        confirm(
          `¿Seguro que quieres eliminar la salida de la patente "${salida.patente}"?`,
        )
      ) {
        newRow.remove();
      }
    });
  }
});
