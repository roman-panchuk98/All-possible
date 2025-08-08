import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

new Accordion('.accordion-container', {
  triggerClass: 'accordion-btn-question',
  panelClass: 'accordion-show-answer',
});
