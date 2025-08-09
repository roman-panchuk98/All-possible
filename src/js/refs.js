const refs = {
  // Furniture section
  feedbackList: document.querySelector('.feedback-list'),
  categoriesList: document.querySelector('.furniture-categories'),
  furnitureGrid: document.querySelector('.furniture-gallery'),
  furnitureLoadMoreBtn: document.querySelector('#furniture-loadMoreBtn'),
  modalDetailisProduct: document.querySelector('.modal'),
  popularGoodsList: document.querySelector('.popular-goods-list'),
  modalOrderForm: document.querySelector(".modal-form"),
  modalOrderBackground: document.querySelector(".order-modal"),
  modalOrderEmail: document.querySelector(".input-email"),
  modalOrderComment: document.querySelector(".textarea"),
  modalOrderPhone: document.querySelector(".input-phone"),
// Header modal section
  headerOpenModalBtn: document.querySelector('[data-modal-open]'),
  headerCloseModalBtns: document.querySelectorAll('[data-modal-close]'),
  headerModal: document.querySelector('[data-modal-mobnav]'),
  headerMenuLinks: document.querySelectorAll('[data-modal-mobnav] a'),
  headerBody: document.body,
  headerScrollButtons: document.querySelectorAll('.scroll-to-furniture'),
  headerScrollBtns: document.querySelectorAll('.scroll-to-furniture'),
  };

export default refs;
