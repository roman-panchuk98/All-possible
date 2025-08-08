import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import "./js/header.js";
import './js/popular-goods';
import './js/feedback';
import { handlerCategories } from './js/furniture_list';
import refs from './js/refs';
import './js/order-modal.js'
// Furniture-list
refs.categoriesList.addEventListener('click', handlerCategories);


