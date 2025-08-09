import{i as d,a as g,r as B,S as M,N as P,P as x}from"./assets/vendor-DPbXg51y.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();(function(){const e={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtns:document.querySelectorAll("[data-modal-close]"),modal:document.querySelector("[data-modal-mobnav]"),menuLinks:document.querySelectorAll("[data-modal-mobnav] a"),body:document.body};e.openModalBtn&&e.openModalBtn.addEventListener("click",t),e.closeModalBtns.forEach(s=>s.addEventListener("click",o)),e.modal.addEventListener("click",r),e.menuLinks.forEach(s=>s.addEventListener("click",o)),window.addEventListener("keydown",n);function t(){e.modal.classList.add("isopen"),e.body.classList.add("modal-open")}function o(){e.modal.classList.remove("isopen"),e.body.classList.remove("modal-open")}function r(s){s.target.closest(".mob-modal-wrap")||o()}function n(s){(s.key==="Escape"||s.code==="Escape")&&o()}})();document.querySelectorAll(".scroll-to-furniture").forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const o=document.getElementById("furniture");if(o){o.scrollIntoView({behavior:"smooth"});const r=document.querySelector(".header-modal-overlay");r&&r.classList.contains("isopen")&&(r.classList.remove("isopen"),document.body.classList.remove("modal-open"))}})});const a={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list")},C=document.querySelector(".modal-form"),y=document.querySelector(".order-modal"),p=document.querySelector(".input-email"),m=document.querySelector(".textarea"),u=document.querySelector(".input-phone");C.addEventListener("submit",V);async function V(e){e.preventDefault();const t=localStorage.getItem("orderData");if(!t){d.error({title:"Помилка",message:"Немає інформації про товар. Оформлення неможливе.",position:"topCenter"});return}const o=JSON.parse(t),r=o.productId,n=o.color;if(!r||!n){d.error({title:"Помилка",message:"Немає даних про товар. Спробуйте додати його ще раз.",position:"topCenter"});return}const s=e.currentTarget.elements.email.value.trim(),i=e.currentTarget.elements.phone.value.replace(/^\+/,""),c=e.currentTarget.elements.comment.value.trim(),l={email:s,phone:i,modelId:r,color:n,comment:c},$=p.parentElement.querySelector(".error-text");!s||s.length>64?(p.classList.add("error-message"),v(p,"Не валідний Email")):(p.classList.remove("error-message"),$&&$.remove());const E=u.parentElement.querySelector(".error-text");i?(u.classList.remove("error-message"),E&&E.remove()):(u.classList.add("error-message"),v(u,"Введіть номер телефону"));const q=m.parentElement.querySelector(".error-text");c.length<5||c.length>256?(m.classList.add("error-message"),v(m,"Введіть коментар довжиною від 5 до 256 символів")):(m.classList.remove("error-message"),q&&q.remove());const A=s&&s.length<=64,O=/^380\d{9}$/.test(i),j=c.length>=5&&c.length<=256;A&&O&&j?await U(l)&&(d.success({title:"Успіх",message:"Форма успішно відправлена!",position:"topCenter"}),C.reset()):d.error({title:"Помилка",message:"Будь ласка, виправ помилки у формі",position:"topCenter"})}function v(e,t){if(!e.parentElement.querySelector(".error-text")){const r=`<p class="error-text">${t}</p>`;e.insertAdjacentHTML("afterend",r)}}function G(){document.body.classList.add("body--no-scroll"),y.classList.remove("visually-hidden")}function L(){document.body.classList.remove("body--no-scroll"),y.classList.add("visually-hidden")}function H(){document.querySelector(".close-form-btn").addEventListener("click",L),document.addEventListener("keydown",t=>{t.key==="Escape"&&L()}),y.addEventListener("click",t=>{t.target===y&&L()})}H();function k(e){e.addEventListener("focus",()=>{e.removeAttribute("placeholder"),e===u&&(e.value.startsWith("+380")||(e.value="+380"))}),e===u&&e.addEventListener("input",()=>{u.value="+380"+u.value.replace(/\D/g,"").slice(3)})}k(p);k(m);k(u);function w(e,t){e.addEventListener("blur",()=>{e.setAttribute("placeholder",`${t}`)})}w(p,"12345ggg@gmail.com");w(m,"Type your message...");w(u,"+38 (099) 123 22 11");const R="https://furniture-store.b.goit.study/api";async function U(e){var t,o;try{return(await g.post(`${R}/orders`,e,{headers:{"Content-Type":"application/json"}})).status===201}catch(r){const n=((o=(t=r.response)==null?void 0:t.data)==null?void 0:o.message)||r.message||"Помилка запиту";return d.error({title:"Помилка",message:n,position:"topCenter"}),!1}}function I(e){W();const t=document.querySelector(".modal-content"),o=e.map(N).join("");t.innerHTML=o,J(e[0].rate),document.querySelectorAll(".star-value").forEach(l=>{l.style.backgroundImage='url("../img/svgviewer-output.svg")'});const r=document.getElementById("main-product-img"),n=document.querySelectorAll(".mini-img"),s=r.src,i=r.alt;n.forEach(l=>{l.addEventListener("mouseover",()=>{r.style.opacity=.5,setTimeout(()=>{r.src=l.src,r.alt=l.alt,r.style.opacity=1},200)}),l.addEventListener("mouseout",()=>{r.style.opacity=.5,setTimeout(()=>{r.src=s,r.alt=i,r.style.opacity=1},200)})}),_(),document.querySelector(".detailis-product").addEventListener("submit",K)}function N({_id:e,images:t,name:o,price:r,rate:n,sizes:s,color:i,description:c,type:l}){return`
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
        <p class="type-product-modal">${l}</p>
        <p class="price">${r} <span class="hrn"></span>грн</p>
        <div class="reting">
          <div class="modal-rating custom-stars" >
            
          </div>
        </div>
      </div>

      <form class="detailis-product">
        <p class="select-color">Колір</p>
        <div class="radio-group">
          ${z(i)}
        </div>

        <div class="discription-container">
          <p class="description">${c}</p>
          <p class="size">Розміри:  <span class="size-span">${s}</span></p>
        </div>

        <div class="modal-product-actions">
          <button class="modal-product-btn" type="submit" data-id=${e}>
            Перейти до замовлення
          </button>
        </div>
      </form>
    </div>
  `}function z(e){return e.map((t,o)=>`
    <label class="color-label">
      <input type="radio" name="color" value="${t}" ${o===0?"checked":""} />
      <span class="circle" style="background-color: ${t}"></span>
      <span class="checkmark"></span>
    </label>
  `).join("")}function J(e,t=".modal-rating"){const o=document.querySelector(t);if(!o){console.warn(`Контейнер ${t} не знайдено`);return}o.innerHTML="",B({max:5,readOnly:!0,starSize:20,rating:e,element:o,step:.5})}function K(e){var s;e.preventDefault();const o=document.querySelector(".modal-product-btn").dataset.id,r=(s=e.target.querySelector('input[name="color"]:checked'))==null?void 0:s.value;if(!r){d.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const n={productId:o,color:r};localStorage.setItem("orderData",JSON.stringify(n)),f(),G()}function W(){document.body.classList.add("body--no-scroll"),a.modalDetailisProduct.classList.add("modal--is-open")}function f(){document.body.classList.remove("body--no-scroll"),a.modalDetailisProduct.classList.remove("modal--is-open")}function _(){document.querySelector(".modal-close-btn").addEventListener("click",f),document.addEventListener("keydown",t=>{t.key==="Escape"&&f()}),a.modalDetailisProduct.addEventListener("click",t=>{t.target===a.modalDetailisProduct&&f()})}async function Q(){try{return(await g.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){Y(),d.error({title:e.message,position:"topRight"})}}async function X(){const e=await Q(),t=e.furnitures.map(({images:o,name:r,color:n,price:s,_id:i})=>(r.length>28&&(r=r.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide">
        <img class="popular-goods-img" src="${o[0]}" alt="${r}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${r}</h3>
            <ul class="popular-goods-colors">
                ${n.map(c=>`<input type="checkbox" class="goods-color" style="background-color: ${c}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${s} грн</p>
        </div>
        <button class="furniture-btn btn-details" data-id="${i}">Детальніше</button>
      </li>
        `)).join("");a.popularGoodsList.innerHTML=t,new M(".popular-goods-swiper",{modules:[P,x],pagination:{el:".popular-goods-swiper-pagination",clickable:!0},navigation:{nextEl:".popular-goods-swiper-button-next",prevEl:".popular-goods-swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}}),a.popularGoodsList.addEventListener("click",o=>{const r=o.target.closest(".furniture-btn");if(!r)return;const n=r.dataset.id,s=e.furnitures.find(i=>i._id===n);I([s])})}function Y(){document.querySelector(".swiper").remove()}X();const D="https://furniture-store.b.goit.study/api/";let h=[];async function Z(){try{const t=(await g.get(`${D}categories`)).data;console.log(t),ee(t)}catch{d.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function ee(e){const t={"":"./img/furnitureList/всі товари-min.png","66504a50a1b2c3d4e5f6a7b8":"/img/furnitureList/декор та аксесуари-min.png","66504a50a1b2c3d4e5f6a7b9":"/img/furnitureList/Кухні-min.png","66504a50a1b2c3d4e5f6a7ba":"/img/furnitureList/ліжка та матраци-min.png","66504a50a1b2c3d4e5f6a7bb":"/img/furnitureList/меблі для ванної кімнати-min.png","66504a50a1b2c3d4e5f6a7bc":"/img/furnitureList/меблі для дитячої-min.png","66504a50a1b2c3d4e5f6a7bd":"/img/furnitureList/меблі для офісу-min.png","66504a50a1b2c3d4e5f6a7be":"/img/furnitureList/меблі для передпокою-min.png","66504a50a1b2c3d4e5f6a7bf":"/img/furnitureList/мякі меблі-min.png","66504a50a1b2c3d4e5f6a7c0":"/img/furnitureList/садові та вуличні меблі-min.png","66504a50a1b2c3d4e5f6a7c1":"/img/furnitureList/стільці та табурети-min.png","66504a50a1b2c3d4e5f6a7c2":"/img/furnitureList/столи-min.png","66504a50a1b2c3d4e5f6a7c3":"/img/furnitureList/шафи та системи зберігання-min.png"},o=[{_id:"",name:"Всі товари"},...e].map(({_id:r,name:n})=>{const s=t[r];return`
        <li>
        <button type="button"
         class="category-btn${r===""?" active":""}"
          data-category="${r}"  style="${s?`background-image: url('${s}');background-size: cover; background-position: center;"`:""}">
          
          <span class="category-name">${n}</span>
          </button>
          </li>
          `}).join("");a.categoriesList.insertAdjacentHTML("beforeend",o)}let b=1;const F=8;async function S(e,t,o=""){try{const r={limit:e,page:t};o&&(r.category=o);const s=(await g.get(`${D}furnitures`,{params:r})).data;h=s.furnitures,t===1&&(a.furnitureGrid.innerHTML=""),te(h),t*e>=s.totalItems?a.furnitureLoadMoreBtn.style.display="none":a.furnitureLoadMoreBtn.style.display="block"}catch{d.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function te(e){const t=e.map(({_id:o,name:r,images:n,color:s,price:i})=>{const c=` <ul class="color-list"> 
        ${s.map(l=>`<li class="color-dot" style="background-color:${l}"></li>`).join("")}
        </ul> `;return`
        <li class="furniture-card">
        <img src="${n[0]}" alt="${r}" class="furniture-img">
        <h3 class="furniture-name">${r}</h3>
         ${c}
        <p class="furniture-price">${i} грн</p>
        <button class="furniture-btn btn-details" data-id="${o}">Детальніше</button>

        </li>
        
        `}).join("");a.furnitureGrid.insertAdjacentHTML("beforeend",t),a.furnitureGrid.addEventListener("click",o=>{const r=o.target.closest(".furniture-btn");if(!r)return;const n=r.dataset.id,s=h.find(i=>i._id===n);s?I([s]):d.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function re(e){if(!e.target.classList.contains("category-btn"))return;a.categoriesList.querySelectorAll(".category-btn").forEach(r=>r.classList.remove("active")),e.target.classList.add("active");const o=e.target.dataset.category;b=1,S(F,b,o)}a.furnitureLoadMoreBtn.addEventListener("click",T);function T(e){b+=1;const t=a.categoriesList.querySelector(".category-btn.active"),o=t?t.dataset.category:"";S(F,b,o)}g.defaults.baseURL="https://furniture-store.b.goit.study/api";function oe(){document.querySelector(".swiper").remove()}async function se(e=1){try{return(await g.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{oe(),d.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function ne(){const e=await se(),t=e.map(({descr:o,name:r,rate:n,_id:s})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${s}" data-rating="${n}"></div>
          <p class="feedback-descr">${o}</p>
          <p class="feedback-name">${r}</p>
      </li>`).join("");a.feedbackList.insertAdjacentHTML("beforeend",t),ie(e),ae()}function ie(e){e.forEach(({rate:t,_id:o})=>{B({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${o}`)})})}function ae(){new M(".feedback-swiper",{modules:[P,x],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}ne();a.categoriesList.addEventListener("click",re);a.furnitureLoadMoreBtn.addEventListener("click",T);Z();S(8,1);
//# sourceMappingURL=index.js.map
