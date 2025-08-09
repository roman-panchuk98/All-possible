import{i as l,a as p,r as w,S as $,N as O,P as B}from"./assets/vendor-DPbXg51y.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const r={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list"),modalOrderForm:document.querySelector(".modal-form"),modalOrderBackground:document.querySelector(".order-modal"),modalOrderEmail:document.querySelector(".input-email"),modalOrderComment:document.querySelector(".textarea"),modalOrderPhone:document.querySelector(".input-phone"),headerOpenModalBtn:document.querySelector("[data-modal-open]"),headerCloseModalBtns:document.querySelectorAll("[data-modal-close]"),headerModal:document.querySelector("[data-modal-mobnav]"),headerMenuLinks:document.querySelectorAll("[data-modal-mobnav] a"),headerBody:document.body,headerScrollButtons:document.querySelectorAll(".scroll-to-furniture"),headerScrollBtns:document.querySelectorAll(".scroll-to-furniture")};(function(){var n,o,i,d;(n=r.headerOpenModalBtn)==null||n.addEventListener("click",e),(o=r.headerCloseModalBtns)==null||o.forEach(c=>c.addEventListener("click",t)),(i=r.headerModal)==null||i.addEventListener("click",a),(d=r.headerMenuLinks)==null||d.forEach(c=>c.addEventListener("click",t)),window.addEventListener("keydown",s);function e(){var c,u;(c=r.headerModal)==null||c.classList.add("isopen"),(u=r.headerBody)==null||u.classList.add("modal-open")}function t(){var c,u;(c=r.headerModal)==null||c.classList.remove("isopen"),(u=r.headerBody)==null||u.classList.remove("modal-open")}function a(c){c.target.closest(".mob-modal-wrap")||t()}function s(c){(c.key==="Escape"||c.code==="Escape")&&t()}})();var S;(S=r.headerScrollBtns)==null||S.forEach(e=>{e.addEventListener("click",t=>{var s,n;t.preventDefault();const a=document.getElementById("furniture");a&&(a.scrollIntoView({behavior:"smooth"}),(s=r.headerModal)!=null&&s.classList.contains("isopen")&&(r.headerModal.classList.remove("isopen"),(n=r.headerBody)==null||n.classList.remove("modal-open")))})});r.modalOrderForm.addEventListener("submit",A);async function A(e){e.preventDefault();const t=localStorage.getItem("orderData");if(!t){l.error({title:"Помилка",message:"Немає інформації про товар. Оформлення неможливе.",position:"topCenter"});return}const a=JSON.parse(t),s=a.productId,n=a.color;if(!s||!n){l.error({title:"Помилка",message:"Немає даних про товар. Спробуйте додати його ще раз.",position:"topCenter"});return}const o=e.currentTarget.elements.email.value.trim(),i=e.currentTarget.elements.phone.value.replace(/^\+/,""),d=e.currentTarget.elements.comment.value.trim(),c={email:o,phone:i,modelId:s,color:n,comment:d},u=r.modalOrderEmail.parentElement.querySelector(".error-text");!o||o.length>64?(r.modalOrderEmail.classList.add("error-message"),y(r.modalOrderEmail,"Не валідний Email")):(r.modalOrderEmail.classList.remove("error-message"),u&&u.remove());const m=r.modalOrderPhone.parentElement.querySelector(".error-text");i?(r.modalOrderPhone.classList.remove("error-message"),m&&m.remove()):(r.modalOrderPhone.classList.add("error-message"),y(r.modalOrderPhone,"Введіть номер телефону"));const E=r.modalOrderComment.parentElement.querySelector(".error-text");d.length<5||d.length>256?(r.modalOrderComment.classList.add("error-message"),y(r.modalOrderComment,"Введіть коментар довжиною від 5 до 256 символів")):(r.modalOrderComment.classList.remove("error-message"),E&&E.remove());const x=o&&o.length<=64,I=/^380\d{9}$/.test(i),T=d.length>=5&&d.length<=256;x&&I&&T?await R(c)&&(l.success({title:"Успіх",message:"Форма успішно відправлена!",position:"topCenter"}),r.modalOrderForm.reset()):l.error({title:"Помилка",message:"Будь ласка, виправ помилки у формі",position:"topCenter"})}function y(e,t){if(!e.parentElement.querySelector(".error-text")){const s=`<p class="error-text">${t}</p>`;e.insertAdjacentHTML("afterend",s)}}function D(){document.body.classList.add("body--no-scroll"),r.modalOrderBackground.classList.remove("visually-hidden")}function b(){document.body.classList.remove("body--no-scroll"),r.modalOrderBackground.classList.add("visually-hidden"),localStorage.clear()}function F(){document.querySelector(".close-form-btn").addEventListener("click",b),document.addEventListener("keydown",t=>{t.key==="Escape"&&b()}),r.modalOrderBackground.addEventListener("click",t=>{t.target===r.modalOrderBackground&&b()})}F();function L(e){e.addEventListener("focus",()=>{e.removeAttribute("placeholder"),e===r.modalOrderPhone&&(e.value.startsWith("+380")||(e.value="+380"))}),e===r.modalOrderPhone&&e.addEventListener("input",()=>{r.modalOrderPhone.value="+380"+modalOrderPhone.value.replace(/\D/g,"").slice(3)})}L(r.modalOrderEmail);L(r.modalOrderComment);L(r.modalOrderPhone);function v(e,t){e.addEventListener("blur",()=>{e.setAttribute("placeholder",`${t}`)})}v(r.modalOrderEmail,"12345ggg@gmail.com");v(r.modalOrderComment,"Type your message...");v(r.modalOrderPhone,"+38 (099) 123 22 11");const j="https://furniture-store.b.goit.study/api";async function R(e){var t,a;try{return(await p.post(`${j}/orders`,e,{headers:{"Content-Type":"application/json"}})).status===201}catch(s){const n=((a=(t=s.response)==null?void 0:t.data)==null?void 0:a.message)||s.message||"Помилка запиту";return l.error({title:"Помилка",message:n,position:"topCenter"}),!1}}function P(e){N();const t=document.querySelector(".modal-content"),a=e.map(U).join("");t.innerHTML=a,G(e[0].rate);const n=document.querySelector(".star-to-run").getAttribute("href");document.querySelectorAll(".star-value").forEach(m=>{m.style.backgroundImage=`url("${n}")`});const o=document.getElementById("main-product-img"),i=document.querySelectorAll(".mini-img"),d=o.src,c=o.alt;i.forEach(m=>{m.addEventListener("mouseover",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=m.src,o.alt=m.alt,o.style.opacity=1},200)}),m.addEventListener("mouseout",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=d,o.alt=c,o.style.opacity=1},200)})}),z(),document.querySelector(".detailis-product").addEventListener("submit",H)}function U({_id:e,images:t,name:a,price:s,rate:n,sizes:o,color:i,description:d,type:c}){return`
    <div class="img-product">
      <img class="large-img" src="${t[0]}" alt="${a}" id="main-product-img"/>
      <div class="small-img">
        <img class="mini-img" src="${t[1]}" alt="${a}" />
        <img class="mini-img" src="${t[2]}" alt="${a}" />
      </div>
    </div>

    <div class="product-wrapper">
      <div class="product-content">
        <h2 class="title-modal-product">${a}</h2>
        <p class="type-product-modal">${c}</p>
        <p class="price">${s} <span class="hrn"></span>грн</p>
        <div class="reting">
          <div class="modal-rating custom-stars" >
            
          </div>
        </div>
      </div>

      <form class="detailis-product">
        <p class="select-color">Колір</p>
        <div class="radio-group">
          ${V(i)}
        </div>

        <div class="discription-container">
          <p class="description">${d}</p>
          <p class="size">Розміри:  <span class="size-span">${o}</span></p>
        </div>

        <div class="modal-product-actions">
          <button class="modal-product-btn" type="submit" data-id=${e}>
            Перейти до замовлення
          </button>
        </div>
      </form>
    </div>
  `}function V(e){return e.map((t,a)=>`
    <label class="color-label">
      <input type="radio" name="color" value="${t}" ${a===0?"checked":""} />
      <span class="circle" style="background-color: ${t}"></span>
      <span class="checkmark"></span>
    </label>
  `).join("")}function G(e,t=".modal-rating"){const a=document.querySelector(t);if(!a){console.warn(`Контейнер ${t} не знайдено`);return}a.innerHTML="",w({max:5,readOnly:!0,starSize:20,rating:e,element:a,step:.5})}function H(e){var o;e.preventDefault();const a=document.querySelector(".modal-product-btn").dataset.id,s=(o=e.target.querySelector('input[name="color"]:checked'))==null?void 0:o.value;if(!s){l.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const n={productId:a,color:s};localStorage.setItem("orderData",JSON.stringify(n)),g(),D()}function N(){document.body.classList.add("body--no-scroll"),r.modalDetailisProduct.classList.add("modal--is-open")}function g(){document.body.classList.remove("body--no-scroll"),r.modalDetailisProduct.classList.remove("modal--is-open")}function z(){document.querySelector(".modal-close-btn").addEventListener("click",g),document.addEventListener("keydown",t=>{t.key==="Escape"&&g()}),r.modalDetailisProduct.addEventListener("click",t=>{t.target===r.modalDetailisProduct&&g()})}async function J(){try{return(await p.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){W(),l.error({title:e.message,position:"topRight"})}}async function K(){const e=await J(),t=e.furnitures.map(({images:a,name:s,color:n,price:o,_id:i})=>(s.length>28&&(s=s.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide">
        <img class="popular-goods-img" src="${a[0]}" alt="${s}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${s}</h3>
            <ul class="popular-goods-colors">
                ${n.map(d=>`<input type="checkbox" class="goods-color" style="background-color: ${d}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${o} грн</p>
        </div>
        <button class="furniture-btn btn-details" data-id="${i}">Детальніше</button>
      </li>
        `)).join("");r.popularGoodsList.innerHTML=t,new $(".popular-goods-swiper",{modules:[O,B],pagination:{el:".popular-goods-swiper-pagination",clickable:!0},navigation:{nextEl:".popular-goods-swiper-button-next",prevEl:".popular-goods-swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}}),r.popularGoodsList.addEventListener("click",a=>{const s=a.target.closest(".furniture-btn");if(!s)return;const n=s.dataset.id,o=e.furnitures.find(i=>i._id===n);P([o])})}function W(){document.querySelector(".swiper").remove()}K();const q="https://furniture-store.b.goit.study/api/";let h=[];async function _(){try{const t=(await p.get(`${q}categories`)).data;console.log(t),Q(t)}catch{l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function Q(e){const t={"":"./img/furnitureList/всі товари-min.png","66504a50a1b2c3d4e5f6a7b8":"/img/furnitureList/декор та аксесуари-min.png","66504a50a1b2c3d4e5f6a7b9":"/img/furnitureList/Кухні-min.png","66504a50a1b2c3d4e5f6a7ba":"/img/furnitureList/ліжка та матраци-min.png","66504a50a1b2c3d4e5f6a7bb":"/img/furnitureList/меблі для ванної кімнати-min.png","66504a50a1b2c3d4e5f6a7bc":"/img/furnitureList/меблі для дитячої-min.png","66504a50a1b2c3d4e5f6a7bd":"/img/furnitureList/меблі для офісу-min.png","66504a50a1b2c3d4e5f6a7be":"/img/furnitureList/меблі для передпокою-min.png","66504a50a1b2c3d4e5f6a7bf":"/img/furnitureList/мякі меблі-min.png","66504a50a1b2c3d4e5f6a7c0":"/img/furnitureList/садові та вуличні меблі-min.png","66504a50a1b2c3d4e5f6a7c1":"/img/furnitureList/стільці та табурети-min.png","66504a50a1b2c3d4e5f6a7c2":"/img/furnitureList/столи-min.png","66504a50a1b2c3d4e5f6a7c3":"/img/furnitureList/шафи та системи зберігання-min.png"},a=[{_id:"",name:"Всі товари"},...e].map(({_id:s,name:n})=>{const o=t[s];return`
        <li>
        <button type="button"
         class="category-btn${s===""?" active":""}"
          data-category="${s}"  style="${o?`background-image: url('${o}');background-size: cover; background-position: center;"`:""}">
          
          <span class="category-name">${n}</span>
          </button>
          </li>
          `}).join("");r.categoriesList.insertAdjacentHTML("beforeend",a)}let f=1;const M=8;async function k(e,t,a=""){try{const s={limit:e,page:t};a&&(s.category=a);const o=(await p.get(`${q}furnitures`,{params:s})).data;h=o.furnitures,t===1&&(r.furnitureGrid.innerHTML=""),X(h),t*e>=o.totalItems?r.furnitureLoadMoreBtn.style.display="none":r.furnitureLoadMoreBtn.style.display="block"}catch{l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function X(e){const t=e.map(({_id:a,name:s,images:n,color:o,price:i})=>{const d=` <ul class="color-list"> 
        ${o.map(c=>`<li class="color-dot" style="background-color:${c}"></li>`).join("")}
        </ul> `;return`
        <li class="furniture-card">
        <img src="${n[0]}" alt="${s}" class="furniture-img">
        <h3 class="furniture-name">${s}</h3>
         ${d}
        <p class="furniture-price">${i} грн</p>
        <button class="furniture-btn btn-details" data-id="${a}">Детальніше</button>

        </li>
        
        `}).join("");r.furnitureGrid.insertAdjacentHTML("beforeend",t),r.furnitureGrid.addEventListener("click",a=>{const s=a.target.closest(".furniture-btn");if(!s)return;const n=s.dataset.id,o=h.find(i=>i._id===n);o?P([o]):l.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function Y(e){if(!e.target.classList.contains("category-btn"))return;r.categoriesList.querySelectorAll(".category-btn").forEach(s=>s.classList.remove("active")),e.target.classList.add("active");const a=e.target.dataset.category;f=1,k(M,f,a)}r.furnitureLoadMoreBtn.addEventListener("click",C);function C(e){f+=1;const t=r.categoriesList.querySelector(".category-btn.active"),a=t?t.dataset.category:"";k(M,f,a)}p.defaults.baseURL="https://furniture-store.b.goit.study/api";function Z(){document.querySelector(".swiper").remove()}async function ee(e=1){try{return(await p.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{Z(),l.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function te(){const e=await ee(),t=e.map(({descr:n,name:o,rate:i,_id:d})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${d}" data-rating="${i}"></div>
          <p class="feedback-descr">${n}</p>
          <p class="feedback-name">${o}</p>
      </li>`).join("");r.feedbackList.insertAdjacentHTML("beforeend",t),re(e);const s=document.querySelector(".star-to-run").getAttribute("href");document.querySelectorAll(".star-value").forEach(n=>{n.style.backgroundImage=`url("${s}")`}),oe()}function re(e){e.forEach(({rate:t,_id:a})=>{w({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${a}`)})})}function oe(){new $(".feedback-swiper",{modules:[O,B],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}te();r.categoriesList.addEventListener("click",Y);r.furnitureLoadMoreBtn.addEventListener("click",C);_();k(8,1);
//# sourceMappingURL=index.js.map
