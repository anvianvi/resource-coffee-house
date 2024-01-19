function toggleBurger() {
  document.getElementById('burger-menu-icon').classList.toggle('open');
  document.body.classList.toggle('burger-open')
  document.getElementById('burger-menu').classList.toggle('is-active')
}

document.getElementById('burger-menu-icon').addEventListener('click', toggleBurger);
document.getElementById('burger-go-menu-button').addEventListener('click', toggleBurger);
document.querySelectorAll('.burger-menu-navigation a').forEach(link => {
  link.addEventListener('click', toggleBurger);
});

window.addEventListener('resize', function () {
  if (window.innerWidth >= 769) {
    document.getElementById('burger-menu-icon').classList.remove('open');
    document.body.classList.remove('burger-open')
    document.getElementById('burger-menu').classList.remove('is-active')
  }
});