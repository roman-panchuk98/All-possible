import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/furniture-list.css';
import refs from './refs';
import { renderProductDetails } from './furniture-details-modal.js';

const imagesUrlForCategories = {
  allProductsImg: document.querySelector('.all-products'),
  bathroomFurniture: document.querySelector('.bathroom-furniture'),
  bedsAndMattresses: document.querySelector('.beds-and-mattresses'),
  cabinets: document.querySelector('.cabinets-and-storage-systems'),
  chairsAndStools: document.querySelector('.chairs-and-stools'),
  childrensFurniture: document.querySelector('.childrens-furniture'),
  decorAndAccessories: document.querySelector('.decor-and-accessories'),
  gardenAndOutdoor: document.querySelector('.garden-and-outdoor-furnitur'),
  hallwayFurniture: document.querySelector('.hallway-furniture'),
  kitchens: document.querySelector('.kitchens'),
  officeFurniture: document.querySelector('.office-furniture'),
  tables: document.querySelector('.tables'),
  upholsteredFurniture: document.querySelector('.upholstered-furniture'),
};

let allProducts = [];
const BaseUrl = 'https://furniture-store.b.goit.study/api/';

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

let isInitialLoad = true;
/**типу стан сторінки  а саму:
 * "Це перше завантаження сторінки, ще нічого не клікали, не фільтрували, не пагінували."*/

function renderFurniture() {
  markUpFurniture(allProducts);
  updatePaginationControls();
  setTimeout(() => {
    if (!isInitialLoad) {
      scrollToFurnitureTop();
    }
    isInitialLoad = false;
  }, 300);
}
/**renderFurniture() ф.  в яку перенесені рендер продуктів,
 *  обоновленя стану пагінації і доданий контроли над скролом*/
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
  } finally {
  }
}

function markUpCategories(categories) {
  const categoryImages = {
    '': `${imagesUrlForCategories.allProductsImg.src}`,
    '66504a50a1b2c3d4e5f6a7b8': `${imagesUrlForCategories.upholsteredFurniture.src}`,
    '66504a50a1b2c3d4e5f6a7b9': `${imagesUrlForCategories.cabinets.src}`,
    '66504a50a1b2c3d4e5f6a7ba': `${imagesUrlForCategories.bedsAndMattresses.src}`,
    '66504a50a1b2c3d4e5f6a7bb': `${imagesUrlForCategories.tables.src}`,
    '66504a50a1b2c3d4e5f6a7bc': `${imagesUrlForCategories.chairsAndStools.src}`,
    '66504a50a1b2c3d4e5f6a7bd': `${imagesUrlForCategories.kitchens.src}`,
    '66504a50a1b2c3d4e5f6a7be': `${imagesUrlForCategories.childrensFurniture.src}`,
    '66504a50a1b2c3d4e5f6a7bf': `${imagesUrlForCategories.officeFurniture.src}`,
    '66504a50a1b2c3d4e5f6a7c0': `${imagesUrlForCategories.hallwayFurniture.src}`,
    '66504a50a1b2c3d4e5f6a7c1': `${imagesUrlForCategories.bathroomFurniture.src}`,
    '66504a50a1b2c3d4e5f6a7c2': `${imagesUrlForCategories.gardenAndOutdoor.src}`,
    '66504a50a1b2c3d4e5f6a7c3': `${imagesUrlForCategories.decorAndAccessories.src}`,
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
const limit = 8;
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

    const responce = await axios.get(`${BaseUrl}furnitures`, { params });
    const data = responce.data;
    allProducts = data.furnitures;
    totalPages = Math.ceil(data.totalItems / Number(limit));
    const furnituresAll = data.furnitures;

    if (page === 1) {
      refs.furnitureGrid.innerHTML = '';
      allProducts = furnituresAll;
    } else {
      allProducts = [...allProducts, ...furnituresAll];
    }

    totalPages = Math.ceil(data.totalItems / limit);
    markUpFurniture(furnituresAll);
    showLoadMoreBtn();

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
}

export function handlerCategories(event) {
  if (!event.target.classList.contains('category-btn')) return;
  const buttons = refs.categoriesList.querySelectorAll('.category-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  event.target.classList.add('active');
  const selectCategory = event.target.dataset.category;
  page = 1;

  const paginationEl = document.querySelector('.furniture-pagination');
  const isDesktop = window.innerWidth >= 768;

  if (isDesktop) {
    getFurnitureForPagination(limit, page, selectCategory);
  } else {
    getFurniture(limit, page, selectCategory);
  }
}

function showLoadMoreBtn() {
  refs.furnitureLoadMoreBtn.classList.remove('visually-hidden-moreBtn');
}
function hideLoadMoreBtn() {
  refs.furnitureLoadMoreBtn.classList.add('visually-hidden-moreBtn');
}
refs.furnitureLoadMoreBtn.addEventListener('click', handlerMore);

const prevBtn = document.querySelector('#furniture-prevBtn');
const nextBtn = document.querySelector('#furniture-nextBtn');
const paginationNumbers = document.querySelector(
  '#furniture-paginationNumbers'
);

if (prevBtn) prevBtn.addEventListener('click', handlePrevPage);
if (nextBtn) nextBtn.addEventListener('click', handleNextPage);
if (paginationNumbers)
  paginationNumbers.addEventListener('click', handlePageNumberClick);

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
      localStorage.setItem('currentPage', page);

      const currentCategoryBtn =
        refs.categoriesList.querySelector(`.category-btn.active`);
      const selectedCategory = currentCategoryBtn
        ? currentCategoryBtn.dataset.category
        : '';
      getFurnitureForPagination(limit, page, selectedCategory);
    }
  }
}

async function getFurnitureForPagination(limit, page, category = '') {
  try {
    const params = {
      limit: limit,
      page: page,
    };
    if (category) {
      params.category = category;
    }
    showLoader(); //! тут зявляється лоадер

    const responce = await axios.get(`${BaseUrl}furnitures`, { params });
    const data = responce.data;
    allProducts = data.furnitures;
    totalPages = Math.ceil(data.totalItems / limit);

    refs.furnitureGrid.innerHTML = '';
    hideLoadMoreBtn();

    renderFurniture(); //! тут виклик нової ф. яка рендерить продукти+ обновляє сторінки+котроль скролу
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити дані. Спробуйте пізніше',
      position: 'topRight',
    });
  } finally {
    hideLoader(); //!тут ховаю лоадер
  }
}

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
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити дані. Спробуйте пізніше',
      position: 'topRight',
    });
  }
});

function updatePaginationControls() {
  const prevBtn = document.querySelector('#furniture-prevBtn');
  const nextBtn = document.querySelector('#furniture-nextBtn');

  if (prevBtn) {
    prevBtn.disabled = page <= 1;
  }
  if (nextBtn) {
    nextBtn.disabled = page >= totalPages;
  }
  renderPaginationNumbers();
}

function renderPaginationNumbers() {
  const paginationNumbers = document.querySelector(
    '#furniture-paginationNumbers'
  );
  if (!paginationNumbers) return;

  let numbersHTML = '';
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      numbersHTML += `<button class="page-number ${
        i === page ? 'active' : ''
      }" data-page="${i}">${i}</button>`;
    }
  } else {
    numbersHTML += `<button class="page-number ${
      1 === page ? 'active' : ''
    }" data-page="1">1</button>`;
    if (page <= 3) {
      for (let i = 2; i <= 3; i++) {
        numbersHTML += `<button class="page-number ${
          i === page ? 'active' : ''
        }" data-page="${i}">${i}</button>`;
      }
      numbersHTML += `<span class="page-dots">...</span>`;
      numbersHTML += `<button class="page-number" data-page="${totalPages}">${totalPages}</button>`;
    } else if (page >= totalPages - 3) {
      numbersHTML += `<span class="page-dots">...</span>`;
      for (let i = totalPages - 3; i <= totalPages; i++) {
        numbersHTML += `<button class="page-number ${
          i === page ? 'active' : ''
        }" data-page="${i}">${i}</button>`;
      }
    } else {
      numbersHTML += `<span class="page-dots">...</span>`;
      for (let i = page - 1; i <= page + 1; i++) {
        numbersHTML += `<button class="page-number ${
          i === page ? 'active' : ''
        }" data-page="${i}">${i}</button>`;
      }
      numbersHTML += `<span class="page-dots">...</span>`;
      numbersHTML += `<button class="page-number" data-page="${totalPages}">${totalPages}</button>`;
    }
  }

  paginationNumbers.innerHTML = numbersHTML;
}

function showLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
}

function scrollToFurnitureTop() {
  const section = document.querySelector('.furniture-gallery');
  if (!section) return;
  const offset = 140;
  const top = section.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
}
/**scrollToFurnitureTop() котроль скролу. (p.S. chat gpt+goole) */
