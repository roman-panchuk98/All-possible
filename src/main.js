import 'modern-normalize/modern-normalize.css';
import './css/styles.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import refs from './js/refs.js';
// import { getFurnitureList, furnitureData } from './Богдан-файл.js';  назви потім відкорегую
import { setupProductClickHandler } from './product-modal-handler.js';

async function init() {
    await getFurnitureList();
    const allProducts = [...furnitureData];

    renderListProduct(allProducts); // рендеримо список (назву теж треба буде підшаманити)
    setupProductClickHandler(allProducts); // модуль модалки
}

init();
