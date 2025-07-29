const hamburgerElement = document.querySelector("#myButton");
const navElement = document.querySelector("#animateme");

hamburgerElement.addEventListener("click", function () {
  hamburgerElement.classList.toggle("open");
  navElement.classList.toggle("open");
});

document.addEventListener("DOMContentLoaded", () => {
  // Agrega click listeners a los sectores
  document.getElementById("sector1").addEventListener("click", () => {
    window.location.href = "sector.html?sector=1";
  });

  document.getElementById("sector2").addEventListener("click", () => {
    window.location.href = "sector.html?sector=2";
  });

  document.getElementById("sector3").addEventListener("click", () => {
    window.location.href = "sector.html?sector=3";
  });
});
