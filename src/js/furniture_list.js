import axiosInstance from './axios-config';
import '../css/furniture-list.css';
import refs from './refs';
import { renderProductDetails } from './furniture-details-modal.js';
let allProducts = [];

refs.categoriesList.addEventListener('click', handlerCategories);
refs.furnitureLoadMoreBtn.addEventListener('click', handlerMore);
getCategories();
// Initialize furniture loading
setTimeout(() => {
  const isDesktop = window.innerWidth >= 768;

  if (isDesktop) {
    getFurnitureForPagination(limit, 1);
  } else {
    getFurniture(limit, 1);
  }
}, 100);

export async function getCategories() {
  try {
    const res = await axiosInstance.get('categories');
    const categories = res.data;
    markUpCategories(categories);
  } catch (error) {
    // Помилка вже оброблена в axios-config
    console.error('Categories loading failed:', error);
  }
}

function markUpCategories(categories) {
  const categoryImages = {
    '': './img/furnitureList/всі товари-min.png',
    '66504a50a1b2c3d4e5f6a7b8': '/img/furnitureList/мякі меблі-min.png',
    '66504a50a1b2c3d4e5f6a7b9':
      '/img/furnitureList/шафи та системи зберігання-min.png',
    '66504a50a1b2c3d4e5f6a7ba': '/img/furnitureList/ліжка та матраци-min.png',
    '66504a50a1b2c3d4e5f6a7bb': '/img/furnitureList/столи-min.png',
    '66504a50a1b2c3d4e5f6a7bc':
      '/img/furnitureList/стільці та табурети-min.png',
    '66504a50a1b2c3d4e5f6a7bd': '/img/furnitureList/Кухні-min.png',
    '66504a50a1b2c3d4e5f6a7be': '/img/furnitureList/меблі для дитячої-min.png',
    '66504a50a1b2c3d4e5f6a7bf': '/img/furnitureList/меблі для офісу-min.png',
    '66504a50a1b2c3d4e5f6a7c0':
      '/img/furnitureList/меблі для передпокою-min.png',
    '66504a50a1b2c3d4e5f6a7c1':
      '/img/furnitureList/меблі для ванної кімнати-min.png',
    '66504a50a1b2c3d4e5f6a7c2':
      '/img/furnitureList/садові та вуличні меблі-min.png',
    '66504a50a1b2c3d4e5f6a7c3': '/img/furnitureList/декор та аксесуари-min.png',
  };
  const markUp = [{ _id: '', name: 'Всі товари' }, ...categories]
    .map(({ _id, name }) => {
      const imageUrl = categoryImages[_id];

      return `
        <li>
        <button type="button"
         class="category-btn${_id === '' ? ' active' : ''}"
          data-category="${_id}"  style="${
        imageUrl
          ? `background-image: url('${imageUrl}');background-size: cover; background-position: center;"`
          : ''
      }">
          
          ${name}
          </button>
          </li>
          `;
    })
    .join('');
  refs.categoriesList.insertAdjacentHTML('beforeend', markUp);
}

let page = 1;
const limit = 8; // Мінімум 8 товарів на сторінку
let totalPages = 1;

export async function getFurniture(limit, page, category = '') {
  try {
    const params = {
      limit: limit,
      page: page,
    };
    if (category) {
      params.category = category;
    }

    const responce = await axiosInstance.get('furnitures', { params });
    const data = responce.data;
    allProducts = data.furnitures;
    totalPages = Math.ceil(data.totalItems / Number(limit));

    if (page === 1) {
      refs.furnitureGrid.innerHTML = '';
    }

    markUpFurniture(allProducts);

    if (page >= totalPages) {
      hideLoadMoreBtn();
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    // Помилка вже оброблена в axios-config
    console.error('Furniture loading failed:', error);
  }
}

function markUpFurniture(items) {
  const markUp = items
    .map(({ _id, name, images, color, price }) => {
      const colorsFurniture = ` <ul class="color-list"> 
        ${color
          .map(
            colorValue =>
              `<li class="color-dot" style="background-color:${colorValue}"></li>`
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
  //обробник кліку по кнопці
  refs.furnitureGrid.addEventListener('click', event => {
    const cardBtn = event.target.closest('.furniture-btn');
    if (!cardBtn) return;

    const productId = cardBtn.dataset.id;
    const selectedProduct = allProducts.find(
      product => product._id === productId
    );

    if (selectedProduct) {
      renderProductDetails([selectedProduct]);
    } else {
      console.error('Product not found by ID');
    }
  });
}

export function handlerCategories(event) {
  if (!event.target.classList.contains('category-btn')) return;
  const buttons = refs.categoriesList.querySelectorAll('.category-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  event.target.classList.add('active');

  const selectCategory = event.target.dataset.category;

  page = 1;

  // Check if we're on desktop (pagination visible) or mobile (load more visible)
  const paginationEl = document.querySelector('.furniture-pagination');
  const isDesktop = window.innerWidth >= 768;
  
  if (isDesktop) {
    getFurnitureForPagination(limit, page, selectCategory);
  } else {
    getFurniture(limit, page, selectCategory);
  }
}

function showLoadMoreBtn() {
  refs.furnitureLoadMoreBtn.classList.remove('visually-hidden');
}
function hideLoadMoreBtn() {
  refs.furnitureLoadMoreBtn.classList.add('visually-hidden');
}

refs.furnitureLoadMoreBtn.addEventListener('click', handlerMore);

// Desktop pagination event listeners
const prevBtn = document.querySelector('#furniture-prevBtn');
const nextBtn = document.querySelector('#furniture-nextBtn');
const paginationNumbers = document.querySelector('#furniture-paginationNumbers');

if (prevBtn) prevBtn.addEventListener('click', handlePrevPage);
if (nextBtn) nextBtn.addEventListener('click', handleNextPage);
if (paginationNumbers) paginationNumbers.addEventListener('click', handlePageNumberClick);

export function handlerMore(event) {
  page += 1;
  const currentCategoryBtn =
    refs.categoriesList.querySelector(`.category-btn.active`);
  const selectedCategory = currentCategoryBtn
    ? currentCategoryBtn.dataset.category
    : '';
  getFurniture(limit, page, selectedCategory);
}

function handlePrevPage() {
  if (page > 1) {
    page -= 1;
    const currentCategoryBtn =
      refs.categoriesList.querySelector(`.category-btn.active`);
    const selectedCategory = currentCategoryBtn
      ? currentCategoryBtn.dataset.category
      : '';
    getFurnitureForPagination(limit, page, selectedCategory);
  }
}

function handleNextPage() {
  if (page < totalPages) {
    page += 1;
    const currentCategoryBtn =
      refs.categoriesList.querySelector(`.category-btn.active`);
    const selectedCategory = currentCategoryBtn
      ? currentCategoryBtn.dataset.category
      : '';
    getFurnitureForPagination(limit, page, selectedCategory);
  }
}

function handlePageNumberClick(event) {
  if (event.target.classList.contains('page-number')) {
    const targetPage = parseInt(event.target.dataset.page);
    if (targetPage !== page) {
      page = targetPage;
      const currentCategoryBtn =
        refs.categoriesList.querySelector(`.category-btn.active`);
      const selectedCategory = currentCategoryBtn
        ? currentCategoryBtn.dataset.category
        : '';
      getFurnitureForPagination(limit, page, selectedCategory);
    }
  }
}

// New function for desktop pagination (replaces content instead of appending)
async function getFurnitureForPagination(limit, page, category = '') {
  try {
    const params = {
      limit: limit,
      page: page,
    };
    if (category) {
      params.category = category;
    }

    const responce = await axiosInstance.get('furnitures', { params });
    const data = responce.data;
    allProducts = data.furnitures;
    totalPages = Math.ceil(data.totalItems / Number(limit));

    // Always replace content for desktop pagination
    refs.furnitureGrid.innerHTML = '';
    markUpFurniture(allProducts);
    
    // Hide "Show more" button on desktop
    hideLoadMoreBtn();
    
    updatePaginationControls();
    
  } catch (error) {
    // Помилка вже оброблена в axios-config
    console.error('Furniture loading failed:', error);
  }
}

function updatePaginationControls() {
  // Update navigation buttons state
  const prevBtn = document.querySelector('#furniture-prevBtn');
  const nextBtn = document.querySelector('#furniture-nextBtn');
  
  if (prevBtn) {
    prevBtn.disabled = page <= 1;
  }
  
  if (nextBtn) {
    nextBtn.disabled = page >= totalPages;
  }
  
  // Update page numbers
  renderPaginationNumbers();
}

function renderPaginationNumbers() {
  const paginationNumbers = document.querySelector('#furniture-paginationNumbers');
  if (!paginationNumbers) return;
  
  let numbersHTML = '';
  
  if (totalPages <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      numbersHTML += `<button class="page-number ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
  } else {
    // Always show first page
    numbersHTML += `<button class="page-number ${1 === page ? 'active' : ''}" data-page="1">1</button>`;
    
    if (page <= 3) {
      // Show 1 2 3 ... last
      for (let i = 2; i <= 3; i++) {
        numbersHTML += `<button class="page-number ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      numbersHTML += `<span class="page-dots">...</span>`;
      numbersHTML += `<button class="page-number" data-page="${totalPages}">${totalPages}</button>`;
    } else if (page >= totalPages - 3) {
      // Show 1 ... last-3 last-2 last-1 last
      numbersHTML += `<span class="page-dots">...</span>`;
      for (let i = totalPages - 3; i <= totalPages; i++) {
        numbersHTML += `<button class="page-number ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
    } else {
      // Show 1 ... page-1 page page+1 ... last
      numbersHTML += `<span class="page-dots">...</span>`;
      for (let i = page - 1; i <= page + 1; i++) {
        numbersHTML += `<button class="page-number ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      numbersHTML += `<span class="page-dots">...</span>`;
      numbersHTML += `<button class="page-number" data-page="${totalPages}">${totalPages}</button>`;
    }
  }
  
  paginationNumbers.innerHTML = numbersHTML;
}
