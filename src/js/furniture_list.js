import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/furniture-list.css';
import refs from './refs';
import { renderProductDetails } from './furniture-details-modal.js';

const imagesUrlForCategories = {
  allProducts: document.querySelector('.all-products'),
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
    '': `${imagesUrlForCategories.allProducts.src}`,
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

    const furnituresAll = data.furnitures; //нова змінна. потрібна

    //дещо змінена частка контенту при зміні категорії
    if (page === 1) {
      refs.furnitureGrid.innerHTML = '';
      allProducts = furnituresAll;
    } else {
      allProducts = [...allProducts, ...furnituresAll]; // тут я записую уже існуючий пакет даних + новий пекет коли "page+1"
    }

    totalPages = Math.ceil(data.totalItems / limit); //прибрав перетворення числа в число бо воно мені не давало нормально вклюситися  втій код
    markUpFurniture(furnituresAll); // рендер першого пекету даних

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
      // додаю aria-label на кнопку М.Н
      return `
        <li class="furniture-card">
        <img src="${images[0]}" alt="${name}" class="furniture-img">
        <h3 class="furniture-name">${name}</h3>
         ${colorsFurniture}
        <p class="furniture-price">${price} грн</p>
                <button class="furniture-btn btn-details" data-id="${_id}" aria-label="Open detailed information window for this product">Детальніше</button>  

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

refs.furnitureLoadMoreBtn.addEventListener('click', handlerMore);

export function handlerMore(event) {
  page += 1;
  const currentCategoryBtn =
    refs.categoriesList.querySelector(`.category-btn.active`);
  const selectedCategory = currentCategoryBtn
    ? currentCategoryBtn.dataset.category
    : '';
  getFurniture(limit, page, selectedCategory);
}
//обробник кліку по кнопці   переїхав в глобальку видимість
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
      title: 'Error',
      message: 'Продукт не знайдено за ID',
      position: 'topRight',
    });
  }
});
