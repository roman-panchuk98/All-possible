import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import "./js/header.js";
import './js/popular-goods';
import { getCategories, getFurniture, handlerCategories, handlerMore} from './js/furniture_list';
import './js/feedback';
import refs from './js/refs';
import './js/order-modal.js'
// Furniture-list
refs.categoriesList.addEventListener('click', handlerCategories);
refs.furnitureLoadMoreBtn.addEventListener('click', handlerMore);
getCategories();
getFurniture(8, 1);



