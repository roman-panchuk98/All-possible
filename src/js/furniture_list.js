import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/furniture-list.css';
import refs from './refs';
import { setupProductClickHandler } from './furniture-details-modal.js';

const BaseUrl = 'https://furniture-store.b.goit.study/api/';
let allProducts = [];

refs.categoriesList.addEventListener('click', handlerCategories);
refs.furnitureLoadMoreBtn.addEventListener('click', handlerMore);
getCategories();
getFurniture(8, 1);

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

    const categoryImages = {
    '': './img/furnitureList/all-products-min.png', 
    '66504a50a1b2c3d4e5f6a7b8': '/img/furnitureList/upholstered-furniture-min.png',
    '66504a50a1b2c3d4e5f6a7b9': '/img/furnitureList/cabinets-and-storage-systems-min.png',
    '66504a50a1b2c3d4e5f6a7ba': '/img/furnitureList/beds-and-mattresses-min.png',
    '66504a50a1b2c3d4e5f6a7bb': '/img/furnitureList/tables-min.png',
    '66504a50a1b2c3d4e5f6a7bc': '/img/furnitureList/chairs-and-stools-min.png',
    '66504a50a1b2c3d4e5f6a7bd': '/img/furnitureList/kitchens-min.png',
    '66504a50a1b2c3d4e5f6a7be': '/img/furnitureList/children’s-furniture-min.png',
    '66504a50a1b2c3d4e5f6a7bf': '/img/furnitureList/office-furniture-min.png',
    '66504a50a1b2c3d4e5f6a7c0': '/img/furnitureList/hallway-furniture-min.png',
    '66504a50a1b2c3d4e5f6a7c1': '/img/furnitureList/bathroom-furniture-min.png',
    '66504a50a1b2c3d4e5f6a7c2': '/img/furnitureList/garden-and-outdoor-furniture-min.png',
    '66504a50a1b2c3d4e5f6a7c3': '/img/furnitureList/decor-and-accessories-min.png',
  };
  const markUp = [{ _id: '', name: 'Всі товари' }, ...categories]
    .map(

      ({ _id, name }) => {
        const imageUrl = categoryImages[_id];

      return`
        <li>
        <button type="button"
         class="category-btn${
          _id === '' ? ' active' : ''}"
          data-category="${_id}"  style="${imageUrl ? `background-image: url('${imageUrl}');background-size: cover; background-position: center;"` : ''}">
          
          ${name}
          </button>
          </li>
          `
          ;})
    .join('');
  refs.categoriesList.insertAdjacentHTML('beforeend', markUp);
}

let page = 1;
const limit = 8;
let totalPages = 0;



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
    
    totalPages = Math.ceil(data.totalItems / limit);

    if (page === 1) {
      refs.furnitureGrid.innerHTML = '';
      
    }
    
    markUpFurniture(allProducts);
    setupProductClickHandler(allProducts);
    
    if (page >= totalPages) {
      hideLoadMoreBtn();
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити дані. Спробуйте пізніше',
      position: 'topRight',
    });
     hideLoadMoreBtn();
  }
}

function markUpFurniture(items) {
  const markUp = items
    .map(({ _id, name, images, color, price }) => {
      const colorsFurniture =
      ` <ul class="color-list"> 
        ${color.map(
          colorValue => `<li class="color-dot" style="background-color:${colorValue}"></li>`
        )
        .join('')}
        </ul> `;

      return `
        <li class="furniture-card">
        <img src="${images[0]}" alt="${name}" class="furniture-img">
        <h3 class="furniture-name">${name}</h3>
         ${colorsFurniture}
        <p class="furniture-price">${price} грн</p>
        <button class="furniture-btn btn-details" data-id="${_id}">Детальніше</button>

        </li>
        
        `;
    })
    .join('');
  refs.furnitureGrid.insertAdjacentHTML('beforeend', markUp);
}


export function handlerCategories(event) {
  if (!event.target.classList.contains('category-btn')) return;
  const buttons = refs.categoriesList.querySelectorAll('.category-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  event.target.classList.add('active');

  const selectCategory = event.target.dataset.category;

  page = 1;

  getFurniture(limit, page, selectCategory);
}

function showLoadMoreBtn() {
  refs.furnitureLoadMoreBtn.classList.remove('visually-hidden-moreBtn');
}
function hideLoadMoreBtn() {
  refs.furnitureLoadMoreBtn.classList.add('visually-hidden-moreBtn');
}

refs.furnitureLoadMoreBtn.addEventListener("click", handlerMore);

export function handlerMore(event) {
    page +=1;
    const currentCategoryBtn = refs.categoriesList.querySelector(`.category-btn.active`);
    const selectedCategory = currentCategoryBtn ? currentCategoryBtn.dataset.category : "";
    getFurniture(limit, page, selectedCategory);

}

