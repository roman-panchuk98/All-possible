import{S as g,N as y,P as b,a as u,i as d,r as k}from"./assets/vendor-CyeEw-01.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();(function(){const e={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtns:document.querySelectorAll("[data-modal-close]"),modal:document.querySelector("[data-modal-mobnav]"),menuLinks:document.querySelectorAll("[data-modal-mobnav] a"),body:document.body};e.openModalBtn&&e.openModalBtn.addEventListener("click",t),e.closeModalBtns.forEach(r=>r.addEventListener("click",s)),e.modal.addEventListener("click",o),e.menuLinks.forEach(r=>r.addEventListener("click",s)),window.addEventListener("keydown",i);function t(){e.modal.classList.add("isopen"),e.body.classList.add("modal-open")}function s(){e.modal.classList.remove("isopen"),e.body.classList.remove("modal-open")}function o(r){r.target.closest(".mob-modal-wrap")||s()}function i(r){(r.key==="Escape"||r.code==="Escape")&&s()}})();document.querySelectorAll(".scroll-to-furniture").forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const s=document.getElementById("furniture");if(s){s.scrollIntoView({behavior:"smooth"});const o=document.querySelector(".header-modal-overlay");o&&o.classList.contains("isopen")&&(o.classList.remove("isopen"),document.body.classList.remove("modal-open"))}})});const a={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list")};async function w(){try{return(await u.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){S(),d.error({title:e.message,position:"topRight"})}}async function $(){const t=(await w()).furnitures.map(({images:s,name:o,color:i,price:r,_id:n})=>(o.length>28&&(o=o.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide" id="${n}">
        <img class="popular-goods-img" src="${s[0]}" alt="${o}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${o}</h3>
            <ul class="popular-goods-colors">
                ${i.map(l=>`<input type="checkbox" class="goods-color" style="background-color: ${l}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${r} грн</p>
        </div>
        <button class="popular-goods-more-datails-btn">Детальніше</button>
      </li>
        `)).join("");a.popularGoodsList.innerHTML=t,new g(".swiper",{modules:[y,b],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}})}function S(){document.querySelector(".swiper").remove()}$();u.defaults.baseURL="https://furniture-store.b.goit.study/api";function E(){document.querySelector(".swiper").remove()}async function B(e=1){try{return(await u.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{E(),d.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function P(){const e=await B(),t=e.map(({descr:s,name:o,rate:i,_id:r})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${r}" data-rating="${i}"></div>
          <p class="feedback-descr">${s}</p>
          <p class="feedback-name">${o}</p>
      </li>`).join("");a.feedbackList.insertAdjacentHTML("beforeend",t),M(e),q()}function M(e){e.forEach(({rate:t,_id:s})=>{k({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${s}`)})})}function q(){new g(".swiper",{modules:[y,b],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}P();function x(e){a.furnitureGrid.addEventListener("click",t=>{const s=t.target.closest(".furniture-btn");if(!s)return;const o=s.dataset.id,i=e.find(r=>r._id===o);i?A([i]):d.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function A(e){T();const t=document.querySelector(".modal-content"),s=e.map(C).join("");t.innerHTML=s,j(e[0].rate);const o=document.getElementById("main-product-img"),i=document.querySelectorAll(".mini-img"),r=o.src,n=o.alt;i.forEach(c=>{c.addEventListener("mouseover",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=c.src,o.alt=c.alt,o.style.opacity=1},200)}),c.addEventListener("mouseout",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=r,o.alt=n,o.style.opacity=1},200)})}),O(),document.querySelector(".detailis-product").addEventListener("submit",I)}function C({_id:e,images:t,name:s,price:o,rate:i,sizes:r,color:n,description:l,type:c}){return`
    <div class="img-product">
      <img class="large-img" src="${t[0]}" alt="${s}" id="main-product-img"/>
      <div class="small-img">
        <img class="mini-img" src="${t[1]}" alt="${s}" />
        <img class="mini-img" src="${t[2]}" alt="${s}" />
      </div>
    </div>

    <div class="product-wrapper">
      <div class="product-content">
        <h2 class="title-modal-product">${s}</h2>
        <p class="type-product-modal">${c}</p>
        <p class="price">${o} <span class="hrn"></span>грн</p>
        <div class="reting">
          <div class="star-rating">
            
          </div>
        </div>
      </div>

      <form class="detailis-product">
        <p class="select-color">Колір</p>
        <div class="radio-group">
          ${D(n)}
        </div>

        <div class="discription-container">
          <p class="description">${l}</p>
          <p class="size">Розміри:  <span class="size-span">${r}</span></p>
        </div>

        <div class="modal-product-actions">
          <button class="modal-product-btn" type="submit" data-id=${e}>
            Перейти до замовлення
          </button>
        </div>
      </form>
    </div>
  `}function D(e){return e.map((t,s)=>`
    <label class="color-label">
      <input type="radio" name="color" value="${t}" ${s===0?"checked":""} />
      <span class="circle" style="background-color: ${t}"></span>
      <span class="checkmark"></span>
    </label>
  `).join("")}function j(e){let t;e>=3.3&&e<=3.7?t=3.5:e>=3.8&&e<=4.2?t=4:t=Math.round(e*2)/2;const s="./img/icons.svg",o=document.querySelector(".star-rating");if(!o){console.warn("Контейнер .star-rating не знайдено");return}const i=Array.from({length:5},(r,n)=>{const l=n+1;let c="icon-star-empty";return t>=l?c="icon-star-filled":t>=l-.5&&(c="icon-star-half"),`
      <svg class="star" data-index="${l}" width="20" height="20">
        <use href="${s}#${c}" />
      </svg>
    `}).join("");o.innerHTML=i}function I(e){var r;e.preventDefault();const s=document.querySelector(".modal-product-btn").dataset.id,o=(r=e.target.querySelector('input[name="color"]:checked'))==null?void 0:r.value;if(!o){d.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const i={productId:s,color:o};localStorage.setItem("orderData",JSON.stringify(i)),p()}function T(){document.body.classList.add("body--no-scroll"),a.modalDetailisProduct.classList.add("modal--is-open")}function p(){document.body.classList.remove("body--no-scroll"),a.modalDetailisProduct.classList.remove("modal--is-open")}function O(){document.querySelector(".modal-close-btn").addEventListener("click",p),document.addEventListener("keydown",t=>{t.key==="Escape"&&p()}),a.modalDetailisProduct.addEventListener("click",t=>{t.target===a.modalDetailisProduct&&p()})}const v="https://furniture-store.b.goit.study/api/";let m=[];async function F(){try{const t=(await u.get(`${v}categories`)).data;G(t)}catch{d.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function G(e){const t=[{_id:"",name:"Всі товари"},...e].map(({_id:s,name:o})=>`<li><button type="button" class="category-btn${s===""?" active":""}"  data-category="${s}">${o}</button></li>`).join("");a.categoriesList.insertAdjacentHTML("beforeend",t)}let f=1;const L=8;async function h(e,t,s=""){try{const o={limit:e,page:t};s&&(o.category=s);const r=(await u.get(`${v}furnitures`,{params:o})).data;m=r.furnitures,t===1&&(a.furnitureGrid.innerHTML=""),H(m),x(m),t*e>=r.totalItems?a.furnitureLoadMoreBtn.style.display="none":a.furnitureLoadMoreBtn.style.display="block"}catch{d.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function H(e){const t=e.map(({_id:s,name:o,images:i,color:r,price:n})=>{const l=r.map(c=>`<span class="color-dot" style="background-color:${c}"></span>`).join("");return`
        <li class="furniture-card">
        <img src="${i[0]}" alt="${o}" class="furniture-img">
        <h3 class="furniture-name">${o}</h3>
        
        <p class="furniture-color"> ${l}</p>
        <p class="furniture-price">${n} грн</p>
        <button class="furniture-btn btn-details" data-id="${s}">Детальніше</button>

        </li>
        
        `}).join("");a.furnitureGrid.insertAdjacentHTML("beforeend",t)}F();h(L,f);function V(e){if(!e.target.classList.contains("category-btn"))return;a.categoriesList.querySelectorAll(".category-btn").forEach(o=>o.classList.remove("active")),e.target.classList.add("active");const s=e.target.dataset.category;f=1,h(L,f,s)}a.categoriesList.addEventListener("click",V);
//# sourceMappingURL=index.js.map
