import axios from 'axios';
import refs from './refs';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderProductDetails } from './furniture-details-modal';
import { removeSlider } from './feedback';

async function getPopularGoods() {
  try {
    const response = await axios.get(
      `https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular`
    );
    return response.data;
  } catch (error) {
    removeSlider();
    iziToast.error({
      title: error.message,
      position: 'topRight',
    });
  }
}

async function renderPopularGoods() {
  const response = await getPopularGoods();
  const markup = response.furnitures
    .map(({ images, name, color, price, _id }) => {
      if (name.length > 28) {
        name = name.slice(0, 28) + '...';
      }
      return `
      <li class="popular-goods-item swiper-slide">
        <img class="popular-goods-img" src="${images[0]}" alt="${name}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${name}</h3>
            <ul class="popular-goods-colors">
                ${color
                  .map(
                    goodsColor =>
                      `<input type="checkbox" class="goods-color" style="background-color: ${goodsColor}" disabled>`
                  )
                  .join('')}
            </ul>
            <p class="popular-goods-price">${price} грн</p>
        </div>
        <button class="furniture-btn btn-details" data-id="${_id}">Детальніше</button>
      </li>
        `;
    })
    .join('');
  refs.popularGoodsList.innerHTML = markup;

  new Swiper('.popular-goods-swiper', {
    modules: [Navigation, Pagination],
    pagination: {
      el: '.popular-goods-swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.popular-goods-swiper-button-next',
      prevEl: '.popular-goods-swiper-button-prev',
    },
    grabCursor: true,
    breakpoints: {
      375: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
    on: {
      init: function () {
        document
          .querySelector('.swiper-navigation')
          ?.classList.remove('slider-controls-hidden');
      },
    },
  });

  refs.popularGoodsList.addEventListener('click', event => {
    const cardBtn = event.target.closest('.furniture-btn');
    if (!cardBtn) return;
    const currentProductId = cardBtn.dataset.id;
    const selectedProduct = response.furnitures.find(
      product => product._id === currentProductId
    );
    renderProductDetails([selectedProduct]);
  });
}

renderPopularGoods();
