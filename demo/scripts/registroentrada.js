document.addEventListener("DOMContentLoaded", async () => {
  const entradaForm = document.getElementById("entrada-form");
  const entradasFile = "../data/entradas.json"; // Ruta al archivo JSON con las entradas
  const entradaTable = document.getElementById("entradas-body");

  // Cargar entradas desde el archivo JSON
  const data = await getEntradaData(entradasFile);
  data.entradas.forEach((entry) => addEntradaRow(entry));

  // Manejar el envío del formulario
  entradaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const patente = document.getElementById("input-patente").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const dueno = document.getElementById("input-dueno").value.trim();

    if (patente && fecha && hora && dueno) {
      const newEntry = {
        patente,
        fecha_entrada: fecha,
        hora_entrada: hora,
        nombre_dueno: dueno,
      };

      addEntradaRow(newEntry);
      entradaForm.reset();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });

  // Función para cargar el archivo JSON
  async function getEntradaData(file) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error al cargar el JSON:", error);
      return { entradas: [] };
    }
  }

  // Función para agregar una fila a la tabla
  function addEntradaRow(entry) {
    const newRow = entradaTable.insertRow();
    newRow.innerHTML = `
      <td>${entry.patente}</td>
      <td>${entry.fecha_entrada}</td>
      <td>${entry.hora_entrada}</td>
      <td>${entry.nombre_dueno}</td>
    `;
    //<td><button class="remove-btn btn btn-danger btn-sm">Eliminar</button></td>

    newRow.querySelector(".remove-btn").addEventListener("click", () => {
      if (
        confirm(
          `¿Seguro que quieres eliminar la entrada de la patente "${entry.patente}"?`,
        )
      ) {
        newRow.remove();
      }
    });
  }
});
