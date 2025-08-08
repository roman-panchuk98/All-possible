import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/furniture-list.css';
import refs from './refs';
import { setupProductClickHandler } from './furniture-details-modal.js';

const BaseUrl = 'https://furniture-store.b.goit.study/api/';
let allProducts = [];

export async function getCategories() {
  try {
    const res = await axios.get(`${BaseUrl}categories`);
    const categories = res.data;
    markUpCategories(categories);
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити дані. Спробуйте пізніше',
      position: 'topRight',
    });
  }
}

function markUpCategories(categories) {
  const markUp = [{ _id: '', name: 'Всі товари' }, ...categories]
    .map(
      ({ _id, name }) =>
        `<li><button type="button" class="category-btn${_id === '' ? ' active' : ''
        }"  data-category="${_id}">${name}</button></li>`
    )
    .join('');
  refs.categoriesList.insertAdjacentHTML('beforeend', markUp);
}

let page = 1;
const limit = 8;
export async function getFurniture(limit, page, category = '') {
  try {
    const params = {
      limit: limit,
      page: page,
    };
    if (category) {
      params.category = category;
    }

    const responce = await axios.get(`${BaseUrl}furnitures`, { params });
    const data = responce.data;
    allProducts = data.furnitures;
    if (page === 1) {
      refs.furnitureGrid.innerHTML = '';
    }
    markUpFurniture(allProducts);
    setupProductClickHandler(allProducts);
    if (page * limit >= data.totalItems) {
      refs.furnitureLoadMoreBtn.style.display = 'none';
    } else {
      refs.furnitureLoadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити дані. Спробуйте пізніше',
      position: 'topRight',
    });
  }
}

function markUpFurniture(items) {
  const markUp = items
    .map(({ _id, name, images, color, price }) => {
      const colorsFurniture = color
        .map(
          c => `<span class="color-dot" style="background-color:${c}"></span>`
        )
        .join('');

      return `
        <li class="furniture-card">
        <img src="${images[0]}" alt="${name}" class="furniture-img">
        <h3 class="furniture-name">${name}</h3>
        
        <p class="furniture-color"> ${colorsFurniture}</p>
        <p class="furniture-price">${price} грн</p>
        <button class="furniture-btn btn-details" data-id="${_id}">Детальніше</button>

        </li>
        
        `;
    })
    .join('');
  refs.furnitureGrid.insertAdjacentHTML('beforeend', markUp);
}
getCategories();
getFurniture(limit, page);

export function handlerCategories(event) {
  if (!event.target.classList.contains('category-btn')) return;
  const buttons = refs.categoriesList.querySelectorAll('.category-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  event.target.classList.add('active');

  const selectCategory = event.target.dataset.category;

  page = 1;

  getFurniture(limit, page, selectCategory);
}
