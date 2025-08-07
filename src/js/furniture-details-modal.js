// 

//  Імпорти
import refs from './refs';
import iziToast from 'izitoast';

//  Основна ініціалізація
export function setupProductClickHandler(allProducts) {
  refs.furnitureGrid.addEventListener('click', event => {
    const cardBtn = event.target.closest('.furniture-btn');
    if (!cardBtn) return;

    const productId = cardBtn.dataset.id;
    const selectedProduct = allProducts.find(product => product._id === productId);

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
}

// Рендер модалки з деталями продукту
function renderProductDetails(product) {
  openProductDetailis();

  const modalContent = document.querySelector('.modal-content');
  const markup = product.map(createProductMarkup).join('');
  modalContent.innerHTML = markup;

  const mainImg = document.getElementById('main-product-img');
  const thumbnails = document.querySelectorAll('.mini-img');

  const originalSrc = mainImg.src;
  const originalAlt = mainImg.alt;

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mouseover', () => {
      mainImg.style.opacity = 0.5;
      setTimeout(() => {
        mainImg.src = thumbnail.src;
        mainImg.alt = thumbnail.alt;
        mainImg.style.opacity = 1;
      }, 200);
    });

    thumbnail.addEventListener('mouseout', () => {
      mainImg.style.opacity = 0.5;
      setTimeout(() => {
        mainImg.src = originalSrc;
        mainImg.alt = originalAlt;
        mainImg.style.opacity = 1;
      }, 200);
    });
  });

  updateStars(product[0].rate);
  listenerClosseModalProduct();

  const form = document.querySelector('.detailis-product');
  form.addEventListener('submit', handleOrderSubmit);
}

//  Генерація HTML для продукту
function createProductMarkup({ _id, images, name, price, rate, sizes, color, description, type }) {
  return `
    <div class="img-product">
      <img class="large-img" src="${images[0]}" alt="${name}" id="main-product-img"/>
      <div class="small-img">
        <img class="mini-img" src="${images[1]}" alt="${name}" />
        <img class="mini-img" src="${images[2]}" alt="${name}" />
      </div>
    </div>

    <div class="product-wrapper">
      <div class="product-content">
        <h2 class="title-modal-product">${name}</h2>
        <p class="type-product-modal">${type}</p>
        <p class="price">${price}\u00A0<span class="hrn"></span>грн</p>
        <div class="reting">
          <div class="star-rating">
            ${generateStars()}
          </div>
        </div>
      </div>

      <form class="detailis-product">
        <p class="select-color">Колір</p>
        <div class="radio-group">
          ${generateColorOptions(color)}
        </div>

        <div class="discription-container">
          <p class="description">${description}</p>
          <p class="size">Розміри:\u00A0 <span class="size-span">${sizes}</span></p>
        </div>

        <div class="modal-product-actions">
          <button class="modal-product-btn" type="submit" data-id=${_id}>
            Перейти до замовлення
          </button>
        </div>
      </form>
    </div>
  `;
}

//  Генерація SVG-зірочок
function generateStars() {
  return Array.from({ length: 5 }, (_, i) => `
    <svg class="star" data-index="${i + 1}" width="20" height="20">
      <use href="./img/icons.svg#icon-star-empty" />
    </svg>
  `).join('');
}

//  Генерація кольорів
function generateColorOptions(colors) {
  return colors.map((color, index) => `
    <label class="color-label">
      <input type="radio" name="color" value="${color}" ${index === 0 ? 'checked' : ''} />
      <span class="circle" style="background-color: ${color}"></span>
      <span class="checkmark"></span>
    </label>
  `).join('');
}

//  Оновлення зірочок за рейтингом
function updateStars(rawRating) {
  let rating;
  if (rawRating >= 3.3 && rawRating <= 3.7) rating = 3.5;
  else if (rawRating >= 3.8 && rawRating <= 4.2) rating = 4;
  else rating = Math.round(rawRating * 2) / 2;

  const stars = document.querySelectorAll('.star');
  const spritePath = './img/icons.svg';

  stars.forEach((star, i) => {
    const index = i + 1;
    const useElement = star.querySelector('use');

    if (rating >= index) {
      useElement.setAttribute('href', `${spritePath}#icon-star-filled`);
    } else if (rating >= index - 0.5) {
      useElement.setAttribute('href', `${spritePath}#icon-star-half`);
    } else {
      useElement.setAttribute('href', `${spritePath}#icon-star-empty`);
    }
  });
}

// Обробка сабміту форми
function handleOrderSubmit(event) {
  event.preventDefault();

  const submitBtn = document.querySelector('.modal-product-btn');
  const productId = submitBtn.dataset.id;
  const selectedColor = event.target.querySelector('input[name="color"]:checked')?.value;

  if (!selectedColor) {
    iziToast.warning({
      title: 'Увага',
      message: 'Оберіть колір перед замовленням',
      position: 'topRight',
    });
    return;
  }

  const orderData = { productId, color: selectedColor };
  console.log('Дані для замовлення:', orderData);

  localStorage.setItem('orderData', JSON.stringify(orderData));
  closseProductDatailis();
  // openOrderModal(); // якщо буде така функція
}

// Відкриття модалки
function openProductDetailis() {
  document.body.classList.add('modal-open');
  refs.modalDetailisProduct.classList.add('modal--is-open');
}

//  Закриття модалки
function closseProductDatailis() {
  document.body.classList.remove('modal-open');
  refs.modalDetailisProduct.classList.remove('modal--is-open');
}

//  Слухачі для закриття модалки
function listenerClosseModalProduct() {
  const closseBtn = document.querySelector('.modal-close-btn');
  closseBtn.addEventListener('click', closseProductDatailis);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closseProductDatailis();
  });

  refs.modalDetailisProduct.addEventListener('click', event => {
    if (event.target === refs.modalDetailisProduct) closseProductDatailis();
  });
}

