import{S as E,N as w,P as S,a as g,i as u,r as F}from"./assets/vendor-CyeEw-01.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=o(i);fetch(i.href,s)}})();(function(){const e={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtns:document.querySelectorAll("[data-modal-close]"),modal:document.querySelector("[data-modal-mobnav]"),menuLinks:document.querySelectorAll("[data-modal-mobnav] a"),body:document.body};e.openModalBtn&&e.openModalBtn.addEventListener("click",t),e.closeModalBtns.forEach(s=>s.addEventListener("click",o)),e.modal.addEventListener("click",r),e.menuLinks.forEach(s=>s.addEventListener("click",o)),window.addEventListener("keydown",i);function t(){e.modal.classList.add("isopen"),e.body.classList.add("modal-open")}function o(){e.modal.classList.remove("isopen"),e.body.classList.remove("modal-open")}function r(s){s.target.closest(".mob-modal-wrap")||o()}function i(s){(s.key==="Escape"||s.code==="Escape")&&o()}})();document.querySelectorAll(".scroll-to-furniture").forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const o=document.getElementById("furniture");if(o){o.scrollIntoView({behavior:"smooth"});const r=document.querySelector(".header-modal-overlay");r&&r.classList.contains("isopen")&&(r.classList.remove("isopen"),document.body.classList.remove("modal-open"))}})});const a={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list")};async function A(){try{return(await g.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){D(),u.error({title:e.message,position:"topRight"})}}async function T(){const t=(await A()).furnitures.map(({images:o,name:r,color:i,price:s,_id:n})=>(r.length>28&&(r=r.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide" id="${n}">
        <img class="popular-goods-img" src="${o[0]}" alt="${r}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${r}</h3>
            <ul class="popular-goods-colors">
                ${i.map(l=>`<input type="checkbox" class="goods-color" style="background-color: ${l}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${s} грн</p>
        </div>
        <button class="popular-goods-more-datails-btn">Детальніше</button>
      </li>
        `)).join("");a.popularGoodsList.innerHTML=t,new E(".swiper",{modules:[w,S],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}})}function D(){document.querySelector(".swiper").remove()}T();function I(e){a.furnitureGrid.addEventListener("click",t=>{const o=t.target.closest(".furniture-btn");if(!o)return;const r=o.dataset.id,i=e.find(s=>s._id===r);i?j([i]):u.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function j(e){U();const t=document.querySelector(".modal-content"),o=e.map(O).join("");t.innerHTML=o,H(e[0].rate);const r=document.getElementById("main-product-img"),i=document.querySelectorAll(".mini-img"),s=r.src,n=r.alt;i.forEach(c=>{c.addEventListener("mouseover",()=>{r.style.opacity=.5,setTimeout(()=>{r.src=c.src,r.alt=c.alt,r.style.opacity=1},200)}),c.addEventListener("mouseout",()=>{r.style.opacity=.5,setTimeout(()=>{r.src=s,r.alt=n,r.style.opacity=1},200)})}),N(),document.querySelector(".detailis-product").addEventListener("submit",G)}function O({_id:e,images:t,name:o,price:r,rate:i,sizes:s,color:n,description:l,type:c}){return`
    <div class="img-product">
      <img class="large-img" src="${t[0]}" alt="${o}" id="main-product-img"/>
      <div class="small-img">
        <img class="mini-img" src="${t[1]}" alt="${o}" />
        <img class="mini-img" src="${t[2]}" alt="${o}" />
      </div>
    </div>

    <div class="product-wrapper">
      <div class="product-content">
        <h2 class="title-modal-product">${o}</h2>
        <p class="type-product-modal">${c}</p>
        <p class="price">${r} <span class="hrn"></span>грн</p>
        <div class="reting">
          <div class="star-rating">
            
          </div>
        </div>
      </div>

      <form class="detailis-product">
        <p class="select-color">Колір</p>
        <div class="radio-group">
          ${V(n)}
        </div>

        <div class="discription-container">
          <p class="description">${l}</p>
          <p class="size">Розміри:  <span class="size-span">${s}</span></p>
        </div>

        <div class="modal-product-actions">
          <button class="modal-product-btn" type="submit" data-id=${e}>
            Перейти до замовлення
          </button>
        </div>
      </form>
    </div>
  `}function V(e){return e.map((t,o)=>`
    <label class="color-label">
      <input type="radio" name="color" value="${t}" ${o===0?"checked":""} />
      <span class="circle" style="background-color: ${t}"></span>
      <span class="checkmark"></span>
    </label>
  `).join("")}function H(e){let t;e>=3.3&&e<=3.7?t=3.5:e>=3.8&&e<=4.2?t=4:t=Math.round(e*2)/2;const o="./img/icons.svg",r=document.querySelector(".star-rating");if(!r){console.warn("Контейнер .star-rating не знайдено");return}const i=Array.from({length:5},(s,n)=>{const l=n+1;let c="icon-star-empty";return t>=l?c="icon-star-filled":t>=l-.5&&(c="icon-star-half"),`
      <svg class="star" data-index="${l}" width="20" height="20">
        <use href="${o}#${c}" />
      </svg>
    `}).join("");r.innerHTML=i}function G(e){var s;e.preventDefault();const o=document.querySelector(".modal-product-btn").dataset.id,r=(s=e.target.querySelector('input[name="color"]:checked'))==null?void 0:s.value;if(!r){u.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const i={productId:o,color:r};localStorage.setItem("orderData",JSON.stringify(i)),y()}function U(){document.body.classList.add("body--no-scroll"),a.modalDetailisProduct.classList.add("modal--is-open")}function y(){document.body.classList.remove("body--no-scroll"),a.modalDetailisProduct.classList.remove("modal--is-open")}function N(){document.querySelector(".modal-close-btn").addEventListener("click",y),document.addEventListener("keydown",t=>{t.key==="Escape"&&y()}),a.modalDetailisProduct.addEventListener("click",t=>{t.target===a.modalDetailisProduct&&y()})}const q="https://furniture-store.b.goit.study/api/";let L=[];async function z(){try{const t=(await g.get(`${q}categories`)).data;console.log(t),R(t)}catch{u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function R(e){const t={"":"./img/furnitureList/всі товари-min.png","66504a50a1b2c3d4e5f6a7b8":"./img/furnitureList/декор та аксесуари-min.png","66504a50a1b2c3d4e5f6a7b9":"./img/furnitureList/Кухні-min.png","66504a50a1b2c3d4e5f6a7ba":"./img/furnitureList/ліжка та матраци-min.png","66504a50a1b2c3d4e5f6a7bb":"./img/furnitureList/меблі для ванної кімнати-min.png","66504a50a1b2c3d4e5f6a7bc":"./img/furnitureList/меблі для дитячої-min.png","66504a50a1b2c3d4e5f6a7bd":"./img/furnitureList/меблі для офісу-min.png","66504a50a1b2c3d4e5f6a7be":"./img/furnitureList/меблі для передпокою-min.png","66504a50a1b2c3d4e5f6a7bf":"./img/furnitureList/мякі меблі-min.png","66504a50a1b2c3d4e5f6a7c0":"./img/furnitureList/садові та вуличні меблі-min.png","66504a50a1b2c3d4e5f6a7c1":"./img/furnitureList/стільці та табурети-min.png","66504a50a1b2c3d4e5f6a7c2":"./img/furnitureList/столи-min.png","66504a50a1b2c3d4e5f6a7c3":"./img/furnitureList/шафи та системи зберігання-min.png"},o=[{_id:"",name:"Всі товари"},...e].map(({_id:r,name:i})=>{const s=t[r];return`
        <li>
        <button type="button"
         class="category-btn${r===""?" active":""}"
          data-category="${r}"  style="${s?`background-image: url('${s}');background-size: cover; background-position: center;"`:""}">
          
          <span class="category-name">${i}</span>
          </button>
          </li>
          `}).join("");a.categoriesList.insertAdjacentHTML("beforeend",o)}let b=1;const B=8;async function h(e,t,o=""){try{const r={limit:e,page:t};o&&(r.category=o);const s=(await g.get(`${q}furnitures`,{params:r})).data;L=s.furnitures,t===1&&(a.furnitureGrid.innerHTML=""),J(L),I(L),t*e>=s.totalItems?a.furnitureLoadMoreBtn.style.display="none":a.furnitureLoadMoreBtn.style.display="block"}catch{u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function J(e){const t=e.map(({_id:o,name:r,images:i,color:s,price:n})=>{const l=` <ul class="color-list"> 
        ${s.map(c=>`<li class="color-dot" style="background-color:${c}"></li>`).join("")}
        </ul> `;return`
        <li class="furniture-card">
        <img src="${i[0]}" alt="${r}" class="furniture-img">
        <h3 class="furniture-name">${r}</h3>
         ${l}
        <p class="furniture-price">${n} грн</p>
        <button class="furniture-btn btn-details" data-id="${o}">Детальніше</button>

        </li>
        
        `}).join("");a.furnitureGrid.insertAdjacentHTML("beforeend",t)}function K(e){if(!e.target.classList.contains("category-btn"))return;a.categoriesList.querySelectorAll(".category-btn").forEach(r=>r.classList.remove("active")),e.target.classList.add("active");const o=e.target.dataset.category;b=1,h(B,b,o)}a.furnitureLoadMoreBtn.addEventListener("click",M);function M(e){b+=1;const t=a.categoriesList.querySelector(".category-btn.active"),o=t?t.dataset.category:"";h(B,b,o)}g.defaults.baseURL="https://furniture-store.b.goit.study/api";function _(){document.querySelector(".swiper").remove()}async function Q(e=1){try{return(await g.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{_(),u.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function W(){const e=await Q(),t=e.map(({descr:o,name:r,rate:i,_id:s})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${s}" data-rating="${i}"></div>
          <p class="feedback-descr">${o}</p>
          <p class="feedback-name">${r}</p>
      </li>`).join("");a.feedbackList.insertAdjacentHTML("beforeend",t),X(e),Y()}function X(e){e.forEach(({rate:t,_id:o})=>{F({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${o}`)})})}function Y(){new E(".swiper",{modules:[w,S],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}W();const P=document.querySelector(".modal-form"),Z=document.querySelector(".close-form-btn"),f=document.querySelector(".order-modal"),p=document.querySelector(".input-email"),m=document.querySelector(".textarea"),d=document.querySelector(".input-phone"),x=document.querySelector(".plus-elem");P.addEventListener("submit",ee);Z.addEventListener("click",re);f.addEventListener("click",oe);document.addEventListener("keydown",te);function ee(e){e.preventDefault();const t=e.currentTarget.elements.email.value.trim(),o=e.currentTarget.elements.phone.value.trim(),r=e.currentTarget.elements.comment.value.trim(),i=p.parentElement.querySelector(".error-text");!t||t.length>64?(p.classList.add("error-message"),v(p,"Не валідний Email")):(p.classList.remove("error-message"),i&&i.remove());const s=d.parentElement.querySelector(".error-text");o?(d.classList.remove("error-message"),s&&s.remove()):(d.classList.add("error-message"),v(d,"Введіть номер телефону"));const n=m.parentElement.querySelector(".error-text");r.length<5||r.length>256?(m.classList.add("error-message"),v(m,"Введіть коментар довжиною від 5 до 256 символів")):(m.classList.remove("error-message"),n&&n.remove());const l=t&&t.length<=64,c=o,C=r.length>=5&&r.length<=256;l&&c&&C?(u.success({title:"Успіх",message:"Форма успішно відправлена!",position:"topCenter"}),P.reset()):u.error({title:"Помилка",message:"Будь ласка, виправ помилки у формі",position:"topCenter"})}function v(e,t){if(!e.parentElement.querySelector(".error-text")){const r=`<p class="error-text">${t}</p>`;e.insertAdjacentHTML("afterend",r)}}function te(e){e.key==="Escape"&&f.classList.add("visually-hidden")}function re(){f.classList.add("visually-hidden")}function oe(e){e.target===f&&f.classList.add("visually-hidden")}function k(e){e.addEventListener("focus",()=>{e.removeAttribute("placeholder"),e===d&&(x.classList.remove("visually-hidden"),d.style.paddingLeft="20px")})}k(p);k(m);k(d);function $(e,t){e.addEventListener("blur",()=>{e.setAttribute("placeholder",`${t}`),e===d&&e.value.trim().length===0&&(x.classList.add("visually-hidden"),d.style.paddingLeft="12px")})}$(p,"12345ggg@gmail.com");$(m,"Type your message...");$(d,"+38 (099) 123 22 11");a.categoriesList.addEventListener("click",K);a.furnitureLoadMoreBtn.addEventListener("click",M);z();h(8,1);
//# sourceMappingURL=index.js.map
