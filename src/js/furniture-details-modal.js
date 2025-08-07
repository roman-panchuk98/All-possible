import refs from './js/refs.js';
import iziToast from 'izitoast';




setupProductClickHandler();
export function setupProductClickHandler(allProducts) {
    productList.addEventListener('click', event => {
        const cardBtn = event.target.closest('.card-product-btn');//не знаю яка буде назва кнопки!!!

        if (!cardBtn) return;
        const productId = cardBtn.dataset.id;
        const selectedProduct = allProducts.find(product => product._id === productId);

        if (selectedProduct) {
            renderProductDetails([selectedProduct]);
        } else {
            iziToast.error({
                title: 'Error',
                message: `Продукт не знайдено за ID`,
                position: 'topRight',
            });
        }
    });
}
//сама модака у всій красі
function renderProductDetails(product) {
    openProductDetailis(); //відкривю модалку

    const modalContent = document.querySelector('.modal-content');
    const markup = product.map(({ _id, images, name, price, rate, sizes, color, description, type }) => `
     <div class="img-product">
        <img class="large-img" src="${images[0]}" alt="${name}" />
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
           <svg class="star" data-index="1" width="20" height="20"><use href="./img/icons.svg#icon-star-empty" /></svg>
           <svg class="star" data-index="2" width="20" height="20"><use href="./img/icons.svg#icon-star-empty" /></svg>
           <svg class="star" data-index="3" width="20" height="20"><use href="./img/icons.svg#icon-star-empty" /></svg>
           <svg class="star" data-index="4" width="20" height="20"><use href="./img/icons.svg#icon-star-empty" /></svg>
           <svg class="star" data-index="5" width="20" height="20"><use href="./img/icons.svg#icon-star-empty" /></svg>
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
        `).join('');

    modalContent.innerHTML = markup;
    //відмальовую через інер, щоб кодне відкриття модалки вікривало один( новий ) продукт

    updateStars(product[0].rate);
    console.log(product[0].rate);
    listenerClosseModalProduct();
    //виклик ф. для закриття модалки тільки так щоб він працював коли модалка відкрита
    const form = document.querySelector('.detailis-product');
    form.addEventListener('submit', handleOrderSubmit);

}
//округлення рейтенгу з заміна зірочок
function updateStars(rawRating) {

    let rating;
    if (rawRating >= 3.3 && rawRating <= 3.7) {
        rating = 3.5;
    } else if (rawRating >= 3.8 && rawRating <= 4.2) {
        rating = 4;
    } else {
        rating = Math.round(rawRating * 2) / 2;
    }

    const spritePath = './img/icons.svg';
    const stars = document.querySelectorAll('.star');

    for (let i = 0; i < stars.length; i++) {
        const index = i + 1;
        const useElement = stars[i].querySelector('use');

        if (rating >= index) {
            useElement.setAttribute('href', `${spritePath}#icon-star-full`);
        } else if (rating >= index - 0.5) {
            useElement.setAttribute('href', `${spritePath}#icon-star-half`);
        } else {
            useElement.setAttribute('href', `${spritePath}#icon-star-empty`);
        }
    }
}
//динамічне створення радіокнопок 
function generateColorOptions(colors) {
    return colors.map((color, index) => `
    <label class="color-label">

      <input
        type="radio"
        name="color"
        value="${color}"
        ${index === 0 ? 'checked' : ''}
      />

      <span class="circle" style="background-color: ${color}"></span>
      <span class="checkmark"></span>
    </label>
  `).join('');

}
//додавання класу для відкриття модалки
function openProductDetailis() {
    document.body.classList.add('modal-open');
    refs.modalDetailisProduct.classList.add('modal--is-open');
}
//видалення класу для закриття модалки
function closseProductDatailis() {
    document.body.classList.remove('modal-open');
    refs.modalDetailisProduct.classList.remove('modal--is-open');
}

//функція закриття модалки( впринципі універсальна)
function listenerClosseModalProduct() {
    const closseBtn = document.querySelector('.modal-close-btn');
    closseBtn.addEventListener('click', closseProductDatailis);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closseProductDatailis();
        }
    });

    refs.modalDetailisProduct.addEventListener('click', (event) => {
        if (event.target === modalDetailisProduct) {
            closseProductDatailis();
        }
    });
}

//клік по сабміту в вікні продукту
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
    const orderData = {
        productId,
        color: selectedColor,
    };
    console.log('Дані для замовлення:', orderData);
    closseProductDatailis();
    //відкриття модалки замовлення
    openOrderModal(orderData); // незнаю яка назва)

}