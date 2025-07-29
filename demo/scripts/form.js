const btn = document.getElementById("submit-btn"); //Captura el boton.

//Función que al momento de hacer click, confirme si el nombre de usuario es en efecto el que tenemos o si no, prende una alerta. Si es el nombre y contraseña correcta, dirigue hacia el mapa.
btn.addEventListener("click", () => {
  const userName = document.getElementById("input-user").value;
  const password = document.getElementById("input-password").value;

  if (userName === "admin" && password === "1234") {
    window.location.href = "map.html";
  } else {
    alert("Contraseña o Usuario Invalidos");
  }
});

