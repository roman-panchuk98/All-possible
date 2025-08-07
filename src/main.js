import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { feedbackSection } from './js/feedback';
import { handlerCategories } from './js/furniture_list';
import refs from './js/refs';
// import './js/order-modal.js'
feedbackSection();
// Furniture-list
refs.categoriesList.addEventListener('click', handlerCategories);

