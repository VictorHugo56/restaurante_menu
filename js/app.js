import { initPizza } from './components/pizza.js';
import { initEsfihas } from './components/esfihas.js';
import { initMassas } from './components/massas.js';
import { initSobremesas } from './components/sobremesas.js';
import { initBebidas } from './components/bebidas.js';
import { initCart } from './components/cart.js';
import { initCheckout } from './components/checkout.js';

document.addEventListener('DOMContentLoaded', () => {
  // Navigation buttons to switch sections
  const buttons = document.querySelectorAll('nav button[data-section]');
  const sections = document.querySelectorAll('main .section');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-section');
      sections.forEach(section => {
        if (section.id === target) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });

  // Initialize all components
  // Disabled pizza menu initialization as per user request
  // initPizza();
  initEsfihas();
  initMassas();
  // initSobremesas();
  initBebidas();
  initCart();
  initCheckout();
});
