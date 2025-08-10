import Accordion from 'accordion-js';

document.addEventListener('DOMContentLoaded', () => {
  new Accordion('.accordion-container', {
    duration: 1000,
    showMultiple: false,
    collapse: true,
  });
});
