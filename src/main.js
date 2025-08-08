import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import './js/popular-goods';
import { feedbackSection } from './js/feedback';

import refs from './js/refs';
import { getCategories, getFurniture, handlerCategories, handlerMore} from './js/furniture_list';
// import './js/order-modal.js'
feedbackSection();
// Furniture-list
refs.categoriesList.addEventListener('click', handlerCategories);
refs.furnitureLoadMoreBtn.addEventListener('click', handlerMore);


getCategories();
getFurniture(8, 1);