import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import './js/popular-goods';
import { feedbackSection } from './js/feedback';
import { handlerCategories } from './js/furniture_list';
import refs from './js/refs';
// import './js/order-modal.js'
feedbackSection();
// Furniture-list
refs.categoriesList.addEventListener('click', handlerCategories);
import './js/faq';
