import{S as w,N as E,P as S,a as g,i as u,r as C}from"./assets/vendor-CyeEw-01.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();(function(){const e={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtns:document.querySelectorAll("[data-modal-close]"),modal:document.querySelector("[data-modal-mobnav]"),menuLinks:document.querySelectorAll("[data-modal-mobnav] a"),body:document.body};e.openModalBtn&&e.openModalBtn.addEventListener("click",t),e.closeModalBtns.forEach(r=>r.addEventListener("click",s)),e.modal.addEventListener("click",o),e.menuLinks.forEach(r=>r.addEventListener("click",s)),window.addEventListener("keydown",i);function t(){e.modal.classList.add("isopen"),e.body.classList.add("modal-open")}function s(){e.modal.classList.remove("isopen"),e.body.classList.remove("modal-open")}function o(r){r.target.closest(".mob-modal-wrap")||s()}function i(r){(r.key==="Escape"||r.code==="Escape")&&s()}})();document.querySelectorAll(".scroll-to-furniture").forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const s=document.getElementById("furniture");if(s){s.scrollIntoView({behavior:"smooth"});const o=document.querySelector(".header-modal-overlay");o&&o.classList.contains("isopen")&&(o.classList.remove("isopen"),document.body.classList.remove("modal-open"))}})});const c={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list")};async function F(){try{return(await g.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){T(),u.error({title:e.message,position:"topRight"})}}async function A(){const t=(await F()).furnitures.map(({images:s,name:o,color:i,price:r,_id:n})=>(o.length>28&&(o=o.slice(0,28)+"..."),`
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
        `)).join("");c.popularGoodsList.innerHTML=t,new w(".swiper",{modules:[E,S],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}})}function T(){document.querySelector(".swiper").remove()}A();g.defaults.baseURL="https://furniture-store.b.goit.study/api";function D(){document.querySelector(".swiper").remove()}async function j(e=1){try{return(await g.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{D(),u.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function I(){const e=await j(),t=e.map(({descr:s,name:o,rate:i,_id:r})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${r}" data-rating="${i}"></div>
          <p class="feedback-descr">${s}</p>
          <p class="feedback-name">${o}</p>
      </li>`).join("");c.feedbackList.insertAdjacentHTML("beforeend",t),O(e),V()}function O(e){e.forEach(({rate:t,_id:s})=>{C({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${s}`)})})}function V(){new w(".swiper",{modules:[E,S],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}I();function H(e){c.furnitureGrid.addEventListener("click",t=>{const s=t.target.closest(".furniture-btn");if(!s)return;const o=s.dataset.id,i=e.find(r=>r._id===o);i?G([i]):u.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function G(e){_();const t=document.querySelector(".modal-content"),s=e.map(N).join("");t.innerHTML=s,z(e[0].rate);const o=document.getElementById("main-product-img"),i=document.querySelectorAll(".mini-img"),r=o.src,n=o.alt;i.forEach(a=>{a.addEventListener("mouseover",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=a.src,o.alt=a.alt,o.style.opacity=1},200)}),a.addEventListener("mouseout",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=r,o.alt=n,o.style.opacity=1},200)})}),J(),document.querySelector(".detailis-product").addEventListener("submit",R)}function N({_id:e,images:t,name:s,price:o,rate:i,sizes:r,color:n,description:l,type:a}){return`
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
        <p class="type-product-modal">${a}</p>
        <p class="price">${o} <span class="hrn"></span>грн</p>
        <div class="reting">
          <div class="star-rating">
            
          </div>
        </div>
      </div>

      <form class="detailis-product">
        <p class="select-color">Колір</p>
        <div class="radio-group">
          ${U(n)}
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
  `}function U(e){return e.map((t,s)=>`
    <label class="color-label">
      <input type="radio" name="color" value="${t}" ${s===0?"checked":""} />
      <span class="circle" style="background-color: ${t}"></span>
      <span class="checkmark"></span>
    </label>
  `).join("")}function z(e){let t;e>=3.3&&e<=3.7?t=3.5:e>=3.8&&e<=4.2?t=4:t=Math.round(e*2)/2;const s="./img/icons.svg",o=document.querySelector(".star-rating");if(!o){console.warn("Контейнер .star-rating не знайдено");return}const i=Array.from({length:5},(r,n)=>{const l=n+1;let a="icon-star-empty";return t>=l?a="icon-star-filled":t>=l-.5&&(a="icon-star-half"),`
      <svg class="star" data-index="${l}" width="20" height="20">
        <use href="${s}#${a}" />
      </svg>
    `}).join("");o.innerHTML=i}function R(e){var r;e.preventDefault();const s=document.querySelector(".modal-product-btn").dataset.id,o=(r=e.target.querySelector('input[name="color"]:checked'))==null?void 0:r.value;if(!o){u.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const i={productId:s,color:o};localStorage.setItem("orderData",JSON.stringify(i)),y()}function _(){document.body.classList.add("body--no-scroll"),c.modalDetailisProduct.classList.add("modal--is-open")}function y(){document.body.classList.remove("body--no-scroll"),c.modalDetailisProduct.classList.remove("modal--is-open")}function J(){document.querySelector(".modal-close-btn").addEventListener("click",y),document.addEventListener("keydown",t=>{t.key==="Escape"&&y()}),c.modalDetailisProduct.addEventListener("click",t=>{t.target===c.modalDetailisProduct&&y()})}const $="https://furniture-store.b.goit.study/api/";let v=[];async function K(){try{const t=(await g.get(`${$}categories`)).data;Q(t)}catch{u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function Q(e){const t=[{_id:"",name:"Всі товари"},...e].map(({_id:s,name:o})=>`<li><button type="button" class="category-btn${s===""?" active":""}"  data-category="${s}">${o}</button></li>`).join("");c.categoriesList.insertAdjacentHTML("beforeend",t)}let L=1;const q=8;async function B(e,t,s=""){try{const o={limit:e,page:t};s&&(o.category=s);const r=(await g.get(`${$}furnitures`,{params:o})).data;v=r.furnitures,t===1&&(c.furnitureGrid.innerHTML=""),W(v),H(v),t*e>=r.totalItems?c.furnitureLoadMoreBtn.style.display="none":c.furnitureLoadMoreBtn.style.display="block"}catch{u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function W(e){const t=e.map(({_id:s,name:o,images:i,color:r,price:n})=>{const l=r.map(a=>`<span class="color-dot" style="background-color:${a}"></span>`).join("");return`
        <li class="furniture-card">
        <img src="${i[0]}" alt="${o}" class="furniture-img">
        <h3 class="furniture-name">${o}</h3>
        
        <p class="furniture-color"> ${l}</p>
        <p class="furniture-price">${n} грн</p>
        <button class="furniture-btn btn-details" data-id="${s}">Детальніше</button>

        </li>
        
        `}).join("");c.furnitureGrid.insertAdjacentHTML("beforeend",t)}K();B(q,L);function X(e){if(!e.target.classList.contains("category-btn"))return;c.categoriesList.querySelectorAll(".category-btn").forEach(o=>o.classList.remove("active")),e.target.classList.add("active");const s=e.target.dataset.category;L=1,B(q,L,s)}const P=document.querySelector(".modal-form"),Y=document.querySelector(".close-form-btn"),f=document.querySelector(".order-modal"),p=document.querySelector(".input-email"),m=document.querySelector(".textarea"),d=document.querySelector(".input-phone"),M=document.querySelector(".plus-elem");P.addEventListener("submit",Z);Y.addEventListener("click",te);f.addEventListener("click",oe);document.addEventListener("keydown",ee);function Z(e){e.preventDefault();const t=e.currentTarget.elements.email.value.trim(),s=e.currentTarget.elements.phone.value.trim(),o=e.currentTarget.elements.comment.value.trim(),i=p.parentElement.querySelector(".error-text");!t||t.length>64?(p.classList.add("error-message"),b(p,"Не валідний Email")):(p.classList.remove("error-message"),i&&i.remove());const r=d.parentElement.querySelector(".error-text");s?(d.classList.remove("error-message"),r&&r.remove()):(d.classList.add("error-message"),b(d,"Введіть номер телефону"));const n=m.parentElement.querySelector(".error-text");o.length<5||o.length>256?(m.classList.add("error-message"),b(m,"Введіть коментар довжиною від 5 до 256 символів")):(m.classList.remove("error-message"),n&&n.remove());const l=t&&t.length<=64,a=s,x=o.length>=5&&o.length<=256;l&&a&&x?(u.success({title:"Успіх",message:"Форма успішно відправлена!",position:"topCenter"}),P.reset()):u.error({title:"Помилка",message:"Будь ласка, виправ помилки у формі",position:"topCenter"})}function b(e,t){if(!e.parentElement.querySelector(".error-text")){const o=`<p class="error-text">${t}</p>`;e.insertAdjacentHTML("afterend",o)}}function ee(e){e.key==="Escape"&&f.classList.add("visually-hidden")}function te(){f.classList.add("visually-hidden")}function oe(e){e.target===f&&f.classList.add("visually-hidden")}function h(e){e.addEventListener("focus",()=>{e.removeAttribute("placeholder"),e===d&&(M.classList.remove("visually-hidden"),d.style.paddingLeft="20px")})}h(p);h(m);h(d);function k(e,t){e.addEventListener("blur",()=>{e.setAttribute("placeholder",`${t}`),e===d&&e.value.trim().length===0&&(M.classList.add("visually-hidden"),d.style.paddingLeft="12px")})}k(p,"12345ggg@gmail.com");k(m,"Type your message...");k(d,"+38 (099) 123 22 11");c.categoriesList.addEventListener("click",X);
//# sourceMappingURL=index.js.map
