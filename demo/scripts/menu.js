const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animateme');

hamburgerElement.addEventListener('click', function() {
    hamburgerElement.classList.toggle('open');
    navElement.classList.toggle('open');
});