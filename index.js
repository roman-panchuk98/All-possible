import{i as l,a as g,r as B,S as M,N as P,P as x}from"./assets/vendor-DPbXg51y.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();(function(){const e={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtns:document.querySelectorAll("[data-modal-close]"),modal:document.querySelector("[data-modal-mobnav]"),menuLinks:document.querySelectorAll("[data-modal-mobnav] a"),body:document.body};e.openModalBtn&&e.openModalBtn.addEventListener("click",t),e.closeModalBtns.forEach(r=>r.addEventListener("click",o)),e.modal.addEventListener("click",s),e.menuLinks.forEach(r=>r.addEventListener("click",o)),window.addEventListener("keydown",n);function t(){e.modal.classList.add("isopen"),e.body.classList.add("modal-open")}function o(){e.modal.classList.remove("isopen"),e.body.classList.remove("modal-open")}function s(r){r.target.closest(".mob-modal-wrap")||o()}function n(r){(r.key==="Escape"||r.code==="Escape")&&o()}})();document.querySelectorAll(".scroll-to-furniture").forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const o=document.getElementById("furniture");if(o){o.scrollIntoView({behavior:"smooth"});const s=document.querySelector(".header-modal-overlay");s&&s.classList.contains("isopen")&&(s.classList.remove("isopen"),document.body.classList.remove("modal-open"))}})});const a={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list")},C=document.querySelector(".modal-form"),b=document.querySelector(".order-modal"),m=document.querySelector(".input-email"),f=document.querySelector(".textarea"),d=document.querySelector(".input-phone");C.addEventListener("submit",R);async function R(e){e.preventDefault();const t=localStorage.getItem("orderData");if(!t){l.error({title:"Помилка",message:"Немає інформації про товар. Оформлення неможливе.",position:"topCenter"});return}const o=JSON.parse(t),s=o.productId,n=o.color;if(!s||!n){l.error({title:"Помилка",message:"Немає даних про товар. Спробуйте додати його ще раз.",position:"topCenter"});return}const r=e.currentTarget.elements.email.value.trim(),i=e.currentTarget.elements.phone.value.replace(/^\+/,""),c=e.currentTarget.elements.comment.value.trim(),p={email:r,phone:i,modelId:s,color:n,comment:c},v=m.parentElement.querySelector(".error-text");!r||r.length>64?(m.classList.add("error-message"),h(m,"Не валідний Email")):(m.classList.remove("error-message"),v&&v.remove());const u=d.parentElement.querySelector(".error-text");i?(d.classList.remove("error-message"),u&&u.remove()):(d.classList.add("error-message"),h(d,"Введіть номер телефону"));const q=f.parentElement.querySelector(".error-text");c.length<5||c.length>256?(f.classList.add("error-message"),h(f,"Введіть коментар довжиною від 5 до 256 символів")):(f.classList.remove("error-message"),q&&q.remove());const F=r&&r.length<=64,O=/^380\d{9}$/.test(i),j=c.length>=5&&c.length<=256;F&&O&&j?await H(p)&&(l.success({title:"Успіх",message:"Форма успішно відправлена!",position:"topCenter"}),C.reset()):l.error({title:"Помилка",message:"Будь ласка, виправ помилки у формі",position:"topCenter"})}function h(e,t){if(!e.parentElement.querySelector(".error-text")){const s=`<p class="error-text">${t}</p>`;e.insertAdjacentHTML("afterend",s)}}function U(){document.body.classList.add("body--no-scroll"),b.classList.remove("visually-hidden")}function k(){document.body.classList.remove("body--no-scroll"),b.classList.add("visually-hidden")}function V(){document.querySelector(".close-form-btn").addEventListener("click",k),document.addEventListener("keydown",t=>{t.key==="Escape"&&k()}),b.addEventListener("click",t=>{t.target===b&&k()})}V();function S(e){e.addEventListener("focus",()=>{e.removeAttribute("placeholder"),e===d&&(e.value.startsWith("+380")||(e.value="+380"))}),e===d&&e.addEventListener("input",()=>{d.value="+380"+d.value.replace(/\D/g,"").slice(3)})}S(m);S(f);S(d);function $(e,t){e.addEventListener("blur",()=>{e.setAttribute("placeholder",`${t}`)})}$(m,"12345ggg@gmail.com");$(f,"Type your message...");$(d,"+38 (099) 123 22 11");const G="https://furniture-store.b.goit.study/api";async function H(e){var t,o;try{return(await g.post(`${G}/orders`,e,{headers:{"Content-Type":"application/json"}})).status===201}catch(s){const n=((o=(t=s.response)==null?void 0:t.data)==null?void 0:o.message)||s.message||"Помилка запиту";return l.error({title:"Помилка",message:n,position:"topCenter"}),!1}}function I(e){W();const t=document.querySelector(".modal-content"),o=e.map(N).join("");t.innerHTML=o,J(e[0].rate);const n=document.querySelector(".star-to-run").getAttribute("href");document.querySelectorAll(".star-value").forEach(u=>{u.style.backgroundImage=`url("${n}")`});const r=document.getElementById("main-product-img"),i=document.querySelectorAll(".mini-img"),c=r.src,p=r.alt;i.forEach(u=>{u.addEventListener("mouseover",()=>{r.style.opacity=.5,setTimeout(()=>{r.src=u.src,r.alt=u.alt,r.style.opacity=1},200)}),u.addEventListener("mouseout",()=>{r.style.opacity=.5,setTimeout(()=>{r.src=c,r.alt=p,r.style.opacity=1},200)})}),_(),document.querySelector(".detailis-product").addEventListener("submit",K)}function N({_id:e,images:t,name:o,price:s,rate:n,sizes:r,color:i,description:c,type:p}){return`
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
        <p class="type-product-modal">${p}</p>
        <p class="price">${s} <span class="hrn"></span>грн</p>
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
          <p class="size">Розміри:  <span class="size-span">${r}</span></p>
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
  `).join("")}function J(e,t=".modal-rating"){const o=document.querySelector(t);if(!o){console.warn(`Контейнер ${t} не знайдено`);return}o.innerHTML="",B({max:5,readOnly:!0,starSize:20,rating:e,element:o,step:.5})}function K(e){var r;e.preventDefault();const o=document.querySelector(".modal-product-btn").dataset.id,s=(r=e.target.querySelector('input[name="color"]:checked'))==null?void 0:r.value;if(!s){l.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const n={productId:o,color:s};localStorage.setItem("orderData",JSON.stringify(n)),y(),U()}function W(){document.body.classList.add("body--no-scroll"),a.modalDetailisProduct.classList.add("modal--is-open")}function y(){document.body.classList.remove("body--no-scroll"),a.modalDetailisProduct.classList.remove("modal--is-open")}function _(){document.querySelector(".modal-close-btn").addEventListener("click",y),document.addEventListener("keydown",t=>{t.key==="Escape"&&y()}),a.modalDetailisProduct.addEventListener("click",t=>{t.target===a.modalDetailisProduct&&y()})}async function Q(){try{return(await g.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){Y(),l.error({title:e.message,position:"topRight"})}}async function X(){const e=await Q(),t=e.furnitures.map(({images:o,name:s,color:n,price:r,_id:i})=>(s.length>28&&(s=s.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide">
        <img class="popular-goods-img" src="${o[0]}" alt="${s}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${s}</h3>
            <ul class="popular-goods-colors">
                ${n.map(c=>`<input type="checkbox" class="goods-color" style="background-color: ${c}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${r} грн</p>
        </div>
        <button class="furniture-btn btn-details" data-id="${i}">Детальніше</button>
      </li>
        `)).join("");a.popularGoodsList.innerHTML=t,new M(".popular-goods-swiper",{modules:[P,x],pagination:{el:".popular-goods-swiper-pagination",clickable:!0},navigation:{nextEl:".popular-goods-swiper-button-next",prevEl:".popular-goods-swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}}),a.popularGoodsList.addEventListener("click",o=>{const s=o.target.closest(".furniture-btn");if(!s)return;const n=s.dataset.id,r=e.furnitures.find(i=>i._id===n);I([r])})}function Y(){document.querySelector(".swiper").remove()}X();const T="https://furniture-store.b.goit.study/api/";let w=[];async function Z(){try{const t=(await g.get(`${T}categories`)).data;console.log(t),ee(t)}catch{l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function ee(e){const t={"":"./img/furnitureList/всі товари-min.png","66504a50a1b2c3d4e5f6a7b8":"/img/furnitureList/декор та аксесуари-min.png","66504a50a1b2c3d4e5f6a7b9":"/img/furnitureList/Кухні-min.png","66504a50a1b2c3d4e5f6a7ba":"/img/furnitureList/ліжка та матраци-min.png","66504a50a1b2c3d4e5f6a7bb":"/img/furnitureList/меблі для ванної кімнати-min.png","66504a50a1b2c3d4e5f6a7bc":"/img/furnitureList/меблі для дитячої-min.png","66504a50a1b2c3d4e5f6a7bd":"/img/furnitureList/меблі для офісу-min.png","66504a50a1b2c3d4e5f6a7be":"/img/furnitureList/меблі для передпокою-min.png","66504a50a1b2c3d4e5f6a7bf":"/img/furnitureList/мякі меблі-min.png","66504a50a1b2c3d4e5f6a7c0":"/img/furnitureList/садові та вуличні меблі-min.png","66504a50a1b2c3d4e5f6a7c1":"/img/furnitureList/стільці та табурети-min.png","66504a50a1b2c3d4e5f6a7c2":"/img/furnitureList/столи-min.png","66504a50a1b2c3d4e5f6a7c3":"/img/furnitureList/шафи та системи зберігання-min.png"},o=[{_id:"",name:"Всі товари"},...e].map(({_id:s,name:n})=>{const r=t[s];return`
        <li>
        <button type="button"
         class="category-btn${s===""?" active":""}"
          data-category="${s}"  style="${r?`background-image: url('${r}');background-size: cover; background-position: center;"`:""}">
          
          <span class="category-name">${n}</span>
          </button>
          </li>
          `}).join("");a.categoriesList.insertAdjacentHTML("beforeend",o)}let L=1;const A=8;async function E(e,t,o=""){try{const s={limit:e,page:t};o&&(s.category=o);const r=(await g.get(`${T}furnitures`,{params:s})).data;w=r.furnitures,t===1&&(a.furnitureGrid.innerHTML=""),te(w),t*e>=r.totalItems?a.furnitureLoadMoreBtn.style.display="none":a.furnitureLoadMoreBtn.style.display="block"}catch{l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function te(e){const t=e.map(({_id:o,name:s,images:n,color:r,price:i})=>{const c=` <ul class="color-list"> 
        ${r.map(p=>`<li class="color-dot" style="background-color:${p}"></li>`).join("")}
        </ul> `;return`
        <li class="furniture-card">
        <img src="${n[0]}" alt="${s}" class="furniture-img">
        <h3 class="furniture-name">${s}</h3>
         ${c}
        <p class="furniture-price">${i} грн</p>
        <button class="furniture-btn btn-details" data-id="${o}">Детальніше</button>

        </li>
        
        `}).join("");a.furnitureGrid.insertAdjacentHTML("beforeend",t),a.furnitureGrid.addEventListener("click",o=>{const s=o.target.closest(".furniture-btn");if(!s)return;const n=s.dataset.id,r=w.find(i=>i._id===n);r?I([r]):l.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function re(e){if(!e.target.classList.contains("category-btn"))return;a.categoriesList.querySelectorAll(".category-btn").forEach(s=>s.classList.remove("active")),e.target.classList.add("active");const o=e.target.dataset.category;L=1,E(A,L,o)}a.furnitureLoadMoreBtn.addEventListener("click",D);function D(e){L+=1;const t=a.categoriesList.querySelector(".category-btn.active"),o=t?t.dataset.category:"";E(A,L,o)}g.defaults.baseURL="https://furniture-store.b.goit.study/api";function oe(){document.querySelector(".swiper").remove()}async function se(e=1){try{return(await g.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{oe(),l.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function ne(){const e=await se(),t=e.map(({descr:n,name:r,rate:i,_id:c})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${c}" data-rating="${i}"></div>
          <p class="feedback-descr">${n}</p>
          <p class="feedback-name">${r}</p>
      </li>`).join("");a.feedbackList.insertAdjacentHTML("beforeend",t),ie(e);const s=document.querySelector(".star-to-run").getAttribute("href");document.querySelectorAll(".star-value").forEach(n=>{n.style.backgroundImage=`url("${s}")`}),ae()}function ie(e){e.forEach(({rate:t,_id:o})=>{B({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${o}`)})})}function ae(){new M(".feedback-swiper",{modules:[P,x],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}ne();a.categoriesList.addEventListener("click",re);a.furnitureLoadMoreBtn.addEventListener("click",D);Z();E(8,1);
//# sourceMappingURL=index.js.map
