import{i as u,a as f,S as w,N as E,P as q,r as A}from"./assets/vendor-CyeEw-01.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();(function(){const e={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtns:document.querySelectorAll("[data-modal-close]"),modal:document.querySelector("[data-modal-mobnav]"),menuLinks:document.querySelectorAll("[data-modal-mobnav] a"),body:document.body};e.openModalBtn&&e.openModalBtn.addEventListener("click",t),e.closeModalBtns.forEach(s=>s.addEventListener("click",r)),e.modal.addEventListener("click",o),e.menuLinks.forEach(s=>s.addEventListener("click",r)),window.addEventListener("keydown",n);function t(){e.modal.classList.add("isopen"),e.body.classList.add("modal-open")}function r(){e.modal.classList.remove("isopen"),e.body.classList.remove("modal-open")}function o(s){s.target.closest(".mob-modal-wrap")||r()}function n(s){(s.key==="Escape"||s.code==="Escape")&&r()}})();document.querySelectorAll(".scroll-to-furniture").forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const r=document.getElementById("furniture");if(r){r.scrollIntoView({behavior:"smooth"});const o=document.querySelector(".header-modal-overlay");o&&o.classList.contains("isopen")&&(o.classList.remove("isopen"),document.body.classList.remove("modal-open"))}})});const a={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list")},B=document.querySelector(".modal-form"),y=document.querySelector(".order-modal"),p=document.querySelector(".input-email"),m=document.querySelector(".textarea"),d=document.querySelector(".input-phone"),M=document.querySelector(".plus-elem"),O=localStorage.getItem("orderData"),P=JSON.parse(O),j=P.productId,H=P.color;B.addEventListener("submit",V);function V(e){e.preventDefault();const t=e.currentTarget.elements.email.value.trim(),r=e.currentTarget.elements.phone.value.trim(),o=e.currentTarget.elements.comment.value.trim(),n={email:t,phone:r,modelId:j,color:H,comment:o};console.log(n);const s=p.parentElement.querySelector(".error-text");!t||t.length>64?(p.classList.add("error-message"),L(p,"Не валідний Email")):(p.classList.remove("error-message"),s&&s.remove());const i=d.parentElement.querySelector(".error-text");r?(d.classList.remove("error-message"),i&&i.remove()):(d.classList.add("error-message"),L(d,"Введіть номер телефону"));const l=m.parentElement.querySelector(".error-text");o.length<5||o.length>256?(m.classList.add("error-message"),L(m,"Введіть коментар довжиною від 5 до 256 символів")):(m.classList.remove("error-message"),l&&l.remove());const c=t&&t.length<=64,F=r,T=o.length>=5&&o.length<=256;c&&F&&T?(u.success({title:"Успіх",message:"Форма успішно відправлена!",position:"topCenter"}),z(n),B.reset()):u.error({title:"Помилка",message:"Будь ласка, виправ помилки у формі",position:"topCenter"})}function L(e,t){if(!e.parentElement.querySelector(".error-text")){const o=`<p class="error-text">${t}</p>`;e.insertAdjacentHTML("afterend",o)}}function G(){document.body.classList.add("body--no-scroll"),y.classList.remove("visually-hidden")}function v(){document.body.classList.remove("body--no-scroll"),y.classList.add("visually-hidden")}function U(){document.querySelector(".close-form-btn").addEventListener("click",v),document.addEventListener("keydown",t=>{t.key==="Escape"&&v()}),y.addEventListener("click",t=>{t.target===y&&v()})}U();function k(e){e.addEventListener("focus",()=>{e.removeAttribute("placeholder"),e===d&&(M.classList.remove("visually-hidden"),d.style.paddingLeft="20px")})}k(p);k(m);k(d);function $(e,t){e.addEventListener("blur",()=>{e.setAttribute("placeholder",`${t}`),e===d&&e.value.trim().length===0&&(M.classList.add("visually-hidden"),d.style.paddingLeft="12px")})}$(p,"12345ggg@gmail.com");$(m,"Type your message...");$(d,"+38 (099) 123 22 11");const N="https://furniture-store.b.goit.study/api";async function z(e){try{const t=await f.post(`${N}/orders`,e,{headers:{"Content-Type":"application/json"}});return console.log("Замовлення відправлено:",t.data),t}catch(t){u.error({title:t.message,position:"topCenter"})}}function R(e){a.furnitureGrid.addEventListener("click",t=>{const r=t.target.closest(".furniture-btn");if(!r)return;const o=r.dataset.id,n=e.find(s=>s._id===o);n?x([n]):u.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function x(e){W();const t=document.querySelector(".modal-content"),r=e.map(J).join("");t.innerHTML=r,K(e[0].rate);const o=document.getElementById("main-product-img"),n=document.querySelectorAll(".mini-img"),s=o.src,i=o.alt;n.forEach(c=>{c.addEventListener("mouseover",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=c.src,o.alt=c.alt,o.style.opacity=1},200)}),c.addEventListener("mouseout",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=s,o.alt=i,o.style.opacity=1},200)})}),X(),document.querySelector(".detailis-product").addEventListener("submit",Q)}function J({_id:e,images:t,name:r,price:o,rate:n,sizes:s,color:i,description:l,type:c}){return`
    <div class="img-product">
      <img class="large-img" src="${t[0]}" alt="${r}" id="main-product-img"/>
      <div class="small-img">
        <img class="mini-img" src="${t[1]}" alt="${r}" />
        <img class="mini-img" src="${t[2]}" alt="${r}" />
      </div>
    </div>

    <div class="product-wrapper">
      <div class="product-content">
        <h2 class="title-modal-product">${r}</h2>
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
          ${_(i)}
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
  `}function _(e){return e.map((t,r)=>`
    <label class="color-label">
      <input type="radio" name="color" value="${t}" ${r===0?"checked":""} />
      <span class="circle" style="background-color: ${t}"></span>
      <span class="checkmark"></span>
    </label>
  `).join("")}function K(e){let t;e>=3.3&&e<=3.7?t=3.5:e>=3.8&&e<=4.2?t=4:t=Math.round(e*2)/2;const r="./img/icons.svg",o=document.querySelector(".star-rating");if(!o){console.warn("Контейнер .star-rating не знайдено");return}const n=Array.from({length:5},(s,i)=>{const l=i+1;let c="icon-star-empty";return t>=l?c="icon-star-filled":t>=l-.5&&(c="icon-star-half"),`
      <svg class="star" data-index="${l}" width="20" height="20">
        <use href="${r}#${c}" />
      </svg>
    `}).join("");o.innerHTML=n}function Q(e){var s;e.preventDefault();const r=document.querySelector(".modal-product-btn").dataset.id,o=(s=e.target.querySelector('input[name="color"]:checked'))==null?void 0:s.value;if(!o){u.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const n={productId:r,color:o};localStorage.setItem("orderData",JSON.stringify(n)),g(),G()}function W(){document.body.classList.add("body--no-scroll"),a.modalDetailisProduct.classList.add("modal--is-open")}function g(){document.body.classList.remove("body--no-scroll"),a.modalDetailisProduct.classList.remove("modal--is-open")}function X(){document.querySelector(".modal-close-btn").addEventListener("click",g),document.addEventListener("keydown",t=>{t.key==="Escape"&&g()}),a.modalDetailisProduct.addEventListener("click",t=>{t.target===a.modalDetailisProduct&&g()})}async function Y(){try{return(await f.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){ee(),u.error({title:e.message,position:"topRight"})}}async function Z(){const e=await Y(),t=e.furnitures.map(({images:r,name:o,color:n,price:s,_id:i})=>(o.length>28&&(o=o.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide">
        <img class="popular-goods-img" src="${r[0]}" alt="${o}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${o}</h3>
            <ul class="popular-goods-colors">
                ${n.map(l=>`<input type="checkbox" class="goods-color" style="background-color: ${l}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${s} грн</p>
        </div>
        <button class="furniture-btn btn-details" data-id="${i}">Детальніше</button>
      </li>
        `)).join("");a.popularGoodsList.innerHTML=t,new w(".popular-goods-swiper",{modules:[E,q],pagination:{el:".popular-goods-swiper-pagination",clickable:!0},navigation:{nextEl:".popular-goods-swiper-button-next",prevEl:".popular-goods-swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}}),a.popularGoodsList.addEventListener("click",r=>{const o=r.target.closest(".furniture-btn");if(!o)return;const n=o.dataset.id,s=e.furnitures.find(i=>i._id===n);x([s])})}function ee(){document.querySelector(".swiper").remove()}Z();const C="https://furniture-store.b.goit.study/api/";let h=[];async function te(){try{const t=(await f.get(`${C}categories`)).data;console.log(t),oe(t)}catch{u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function oe(e){const t={"":"./img/furnitureList/всі товари-min.png","66504a50a1b2c3d4e5f6a7b8":"/img/furnitureList/декор та аксесуари-min.png","66504a50a1b2c3d4e5f6a7b9":"/img/furnitureList/Кухні-min.png","66504a50a1b2c3d4e5f6a7ba":"/img/furnitureList/ліжка та матраци-min.png","66504a50a1b2c3d4e5f6a7bb":"/img/furnitureList/меблі для ванної кімнати-min.png","66504a50a1b2c3d4e5f6a7bc":"/img/furnitureList/меблі для дитячої-min.png","66504a50a1b2c3d4e5f6a7bd":"/img/furnitureList/меблі для офісу-min.png","66504a50a1b2c3d4e5f6a7be":"/img/furnitureList/меблі для передпокою-min.png","66504a50a1b2c3d4e5f6a7bf":"/img/furnitureList/мякі меблі-min.png","66504a50a1b2c3d4e5f6a7c0":"/img/furnitureList/садові та вуличні меблі-min.png","66504a50a1b2c3d4e5f6a7c1":"/img/furnitureList/стільці та табурети-min.png","66504a50a1b2c3d4e5f6a7c2":"/img/furnitureList/столи-min.png","66504a50a1b2c3d4e5f6a7c3":"/img/furnitureList/шафи та системи зберігання-min.png"},r=[{_id:"",name:"Всі товари"},...e].map(({_id:o,name:n})=>{const s=t[o];return`
        <li>
        <button type="button"
         class="category-btn${o===""?" active":""}"
          data-category="${o}"  style="${s?`background-image: url('${s}');background-size: cover; background-position: center;"`:""}">
          
          <span class="category-name">${n}</span>
          </button>
          </li>
          `}).join("");a.categoriesList.insertAdjacentHTML("beforeend",r)}let b=1;const I=8;async function S(e,t,r=""){try{const o={limit:e,page:t};r&&(o.category=r);const s=(await f.get(`${C}furnitures`,{params:o})).data;h=s.furnitures,t===1&&(a.furnitureGrid.innerHTML=""),re(h),R(h),t*e>=s.totalItems?a.furnitureLoadMoreBtn.style.display="none":a.furnitureLoadMoreBtn.style.display="block"}catch{u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function re(e){const t=e.map(({_id:r,name:o,images:n,color:s,price:i})=>{const l=` <ul class="color-list"> 
        ${s.map(c=>`<li class="color-dot" style="background-color:${c}"></li>`).join("")}
        </ul> `;return`
        <li class="furniture-card">
        <img src="${n[0]}" alt="${o}" class="furniture-img">
        <h3 class="furniture-name">${o}</h3>
         ${l}
        <p class="furniture-price">${i} грн</p>
        <button class="furniture-btn btn-details" data-id="${r}">Детальніше</button>

        </li>
        
        `}).join("");a.furnitureGrid.insertAdjacentHTML("beforeend",t)}function se(e){if(!e.target.classList.contains("category-btn"))return;a.categoriesList.querySelectorAll(".category-btn").forEach(o=>o.classList.remove("active")),e.target.classList.add("active");const r=e.target.dataset.category;b=1,S(I,b,r)}a.furnitureLoadMoreBtn.addEventListener("click",D);function D(e){b+=1;const t=a.categoriesList.querySelector(".category-btn.active"),r=t?t.dataset.category:"";S(I,b,r)}f.defaults.baseURL="https://furniture-store.b.goit.study/api";function ne(){document.querySelector(".swiper").remove()}async function ie(e=1){try{return(await f.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{ne(),u.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function ae(){const e=await ie(),t=e.map(({descr:r,name:o,rate:n,_id:s})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${s}" data-rating="${n}"></div>
          <p class="feedback-descr">${r}</p>
          <p class="feedback-name">${o}</p>
      </li>`).join("");a.feedbackList.insertAdjacentHTML("beforeend",t),ce(e),le()}function ce(e){e.forEach(({rate:t,_id:r})=>{A({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${r}`)})})}function le(){new w(".feedback-swiper",{modules:[E,q],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}ae();a.categoriesList.addEventListener("click",se);a.furnitureLoadMoreBtn.addEventListener("click",D);te();S(8,1);
//# sourceMappingURL=index.js.map
