// Event for Nav-Menu responsive

const navToggle = document.querySelector('.NavToggle');
const navMenu = document.querySelector('.nav-menu');

/********** BAR NAVEGATION ************/

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('nav-menu_visible');

// Event for area-label open and close menu

if (navMenu.classList.contains('nav-menu_visible')){
  navToggle.setAttribute('aria-label', 'Close menu');
}else {
  navToggle.setAttribute('aria-label', 'Open menu')
}
});