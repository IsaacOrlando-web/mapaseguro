document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded and parsed");

  const fileJson = "data/patentes.json"; //archivo json
  const seccion = document.querySelector(".patentes"); // Sección donde se mostrarán las tarjetas
  const sectorSection = document.getElementById("sector-number"); //El lugar donde mostrará en que setor está

  const params = new URLSearchParams(window.location.search); // Obtener los parámetros de la URL
  const sectorParam = parseInt(params.get("sector")); // Obtener el sector del parámetro de la URL
  sectorSection.textContent = sectorParam;

  const data = await getBusinessData(fileJson); // Cargar los datos del archivo JSON
  const filteredCards = sectorParam
    ? data.patentes.filter((item) => item.sector === sectorParam)
    : data.patentes;

  displayCards(filteredCards);
});

async function getBusinessData(file) {
  // Función para cargar el archivo JSON
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error loading JSON:", error);
    return { patentes: [] }; // Devuelve un array vacío en caso de error
  }
}

function displayCards(cards) {
  // Función para mostrar las tarjetas en la sección
  const seccion = document.querySelector(".patentes");
  seccion.innerHTML = ""; // Limpiar la sección antes de agregar nuevas tarjetas

  if (cards.length === 0) {
    // Si no hay tarjetas, mostrar un mensaje
    seccion.innerHTML = "<p>No vehicles found for this sector.</p>";
    return;
  }

  cards.forEach((cardData) => {
    // Crear una tarjeta para cada vehículo
    const card = document.createElement("section");
    card.classList.add("card");


    card.innerHTML = `
      <h2>${cardData.modelo}</h2>
      <p><strong>Patente:</strong> ${cardData.numero_patente}</p>
      <p><strong>Dueño:</strong> ${cardData.dueño}</p>
      <p><strong>Dirección:</strong> ${cardData.direccion}</p>
      <p><strong>Sector:</strong> ${cardData.sector}</p>
      <button class="remove-btn"><img src="images/trush-square-svgrepo-com.svg" width="100"></button>
    `; // Agregar contenido a la tarjeta

    card.querySelector('.remove-btn').addEventListener('click', () => {
        console.log(cardData.numero_patente);
        alert(`¿Seguro que quiere Eliminar "${cardData.numero_patente}" de las patentes?`)
        card.remove();
        console.log(cards);
    });

    seccion.appendChild(card);
  });
}

