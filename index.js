import{i as l,a as m,r as O,S as B,N as M,P}from"./assets/vendor-DPbXg51y.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();const r={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list"),modalOrderForm:document.querySelector(".modal-form"),modalOrderBackground:document.querySelector(".order-modal"),modalOrderEmail:document.querySelector(".input-email"),modalOrderComment:document.querySelector(".textarea"),modalOrderPhone:document.querySelector(".input-phone"),headerOpenModalBtn:document.querySelector("[data-modal-open]"),headerCloseModalBtns:document.querySelectorAll("[data-modal-close]"),headerModal:document.querySelector("[data-modal-mobnav]"),headerMenuLinks:document.querySelectorAll("[data-modal-mobnav] a"),headerBody:document.body,headerScrollButtons:document.querySelectorAll(".scroll-to-furniture"),headerScrollBtns:document.querySelectorAll(".scroll-to-furniture")};(function(){var a,n,i,c;(a=r.headerOpenModalBtn)==null||a.addEventListener("click",e),(n=r.headerCloseModalBtns)==null||n.forEach(d=>d.addEventListener("click",t)),(i=r.headerModal)==null||i.addEventListener("click",o),(c=r.headerMenuLinks)==null||c.forEach(d=>d.addEventListener("click",t)),window.addEventListener("keydown",s);function e(){var d,u;(d=r.headerModal)==null||d.classList.add("isopen"),(u=r.headerBody)==null||u.classList.add("modal-open")}function t(){var d,u;(d=r.headerModal)==null||d.classList.remove("isopen"),(u=r.headerBody)==null||u.classList.remove("modal-open")}function o(d){d.target.closest(".mob-modal-wrap")||t()}function s(d){(d.key==="Escape"||d.code==="Escape")&&t()}})();var w;(w=r.headerScrollBtns)==null||w.forEach(e=>{e.addEventListener("click",t=>{var s,a;t.preventDefault();const o=document.getElementById("furniture");o&&(o.scrollIntoView({behavior:"smooth"}),(s=r.headerModal)!=null&&s.classList.contains("isopen")&&(r.headerModal.classList.remove("isopen"),(a=r.headerBody)==null||a.classList.remove("modal-open")))})});r.modalOrderForm.addEventListener("submit",F);async function F(e){e.preventDefault();const t=localStorage.getItem("orderData");if(!t){l.error({title:"Помилка",message:"Немає інформації про товар. Оформлення неможливе.",position:"topCenter"});return}const o=JSON.parse(t),s=o.productId,a=o.color;if(!s||!a){l.error({title:"Помилка",message:"Немає даних про товар. Спробуйте додати його ще раз.",position:"topCenter"});return}const n=e.currentTarget.elements.email.value.trim(),i=e.currentTarget.elements.phone.value.replace(/^\+/,""),c=e.currentTarget.elements.comment.value.trim(),d={email:n,phone:i,modelId:s,color:a,comment:c},u=r.modalOrderEmail.parentElement.querySelector(".error-text");!n||n.length>64?(r.modalOrderEmail.classList.add("error-message"),f(r.modalOrderEmail,"Не валідний Email")):(r.modalOrderEmail.classList.remove("error-message"),u&&u.remove());const k=r.modalOrderPhone.parentElement.querySelector(".error-text");i?(r.modalOrderPhone.classList.remove("error-message"),k&&k.remove()):(r.modalOrderPhone.classList.add("error-message"),f(r.modalOrderPhone,"Введіть номер телефону"));const S=r.modalOrderComment.parentElement.querySelector(".error-text");c.length<5||c.length>256?(r.modalOrderComment.classList.add("error-message"),f(r.modalOrderComment,"Введіть коментар довжиною від 5 до 256 символів")):(r.modalOrderComment.classList.remove("error-message"),S&&S.remove());const A=n&&n.length<=64,D=/^380\d{9}$/.test(i),T=c.length>=5&&c.length<=256;A&&D&&T?await V(d)&&(l.success({title:"Успіх",message:"Форма успішно відправлена!",position:"topCenter"}),r.modalOrderForm.reset()):l.error({title:"Помилка",message:"Будь ласка, виправ помилки у формі",position:"topCenter"})}function f(e,t){if(!e.parentElement.querySelector(".error-text")){const s=`<p class="error-text">${t}</p>`;e.insertAdjacentHTML("afterend",s)}}function j(){document.body.classList.add("body--no-scroll"),r.modalOrderBackground.classList.remove("visually-hidden")}function y(){document.body.classList.remove("body--no-scroll"),r.modalOrderBackground.classList.add("visually-hidden"),localStorage.clear()}function R(){document.querySelector(".close-form-btn").addEventListener("click",y),document.addEventListener("keydown",t=>{t.key==="Escape"&&y()}),r.modalOrderBackground.addEventListener("click",t=>{t.target===r.modalOrderBackground&&y()})}R();function h(e){e.addEventListener("focus",()=>{e.removeAttribute("placeholder"),e===r.modalOrderPhone&&(e.value.startsWith("+380")||(e.value="+380"))}),e===r.modalOrderPhone&&e.addEventListener("input",()=>{r.modalOrderPhone.value="+380"+r.modalOrderPhone.value.replace(/\D/g,"").slice(3)})}h(r.modalOrderEmail);h(r.modalOrderComment);h(r.modalOrderPhone);function L(e,t){e.addEventListener("blur",()=>{e.setAttribute("placeholder",`${t}`)})}L(r.modalOrderEmail,"12345ggg@gmail.com");L(r.modalOrderComment,"Type your message...");L(r.modalOrderPhone,"+38 (099) 123 22 11");const U="https://furniture-store.b.goit.study/api";async function V(e){var t,o;try{return(await m.post(`${U}/orders`,e,{headers:{"Content-Type":"application/json"}})).status===201}catch(s){const a=((o=(t=s.response)==null?void 0:t.data)==null?void 0:o.message)||s.message||"Помилка запиту";return l.error({title:"Помилка",message:a,position:"topCenter"}),!1}}const E=document.querySelector(".modal-content"),G=document.querySelector(".star-to-run"),H=G.getAttribute("src");function q(e){W();const t=e.map(N).join("");E.innerHTML=t,J(e[0]),E.querySelectorAll(".star-value").forEach(c=>{c.style.backgroundImage=`url("${H}")`});const o=document.getElementById("main-product-img"),s=document.querySelectorAll(".mini-img"),a=o.src,n=o.alt;s.forEach(c=>{c.addEventListener("mouseover",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=c.src,o.alt=c.alt,o.style.opacity=1},200)}),c.addEventListener("mouseout",()=>{o.style.opacity=.5,setTimeout(()=>{o.src=a,o.alt=n,o.style.opacity=1},200)})}),Q(),document.querySelector(".detailis-product").addEventListener("submit",K)}function N({_id:e,images:t,name:o,price:s,rate:a,sizes:n,color:i,description:c,type:d}){return`
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
        <p class="type-product-modal">${d}</p>
        <p class="price">${s} <span class="hrn"></span>грн</p>
        <div id="rater-modal-${e}" data-rating-modal="${a}"></div>
      </div>

      <form class="detailis-product">
        <p class="select-color">Колір</p>
        <div class="radio-group">
          ${z(i)}
        </div>

        <div class="discription-container">
          <p class="description">${c}</p>
          <p class="size">Розміри:  <span class="size-span">${n}</span></p>
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
  `).join("")}function J({rate:e,_id:t}){O({max:5,readOnly:!0,rating:e,starSize:20,element:document.querySelector(`#rater-modal-${t}`)})}function K(e){var n;e.preventDefault();const o=document.querySelector(".modal-product-btn").dataset.id,s=(n=e.target.querySelector('input[name="color"]:checked'))==null?void 0:n.value;if(!s){l.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const a={productId:o,color:s};localStorage.setItem("orderData",JSON.stringify(a)),p(),j()}function W(){document.body.classList.add("body--no-scroll"),r.modalDetailisProduct.classList.add("modal--is-open")}function p(){document.body.classList.remove("body--no-scroll"),r.modalDetailisProduct.classList.remove("modal--is-open")}function Q(){document.querySelector(".modal-close-btn").addEventListener("click",p),document.addEventListener("keydown",t=>{t.key==="Escape"&&p()}),r.modalDetailisProduct.addEventListener("click",t=>{t.target===r.modalDetailisProduct&&p()})}async function X(){try{return(await m.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){Z(),l.error({title:e.message,position:"topRight"})}}async function Y(){const e=await X(),t=e.furnitures.map(({images:o,name:s,color:a,price:n,_id:i})=>(s.length>28&&(s=s.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide">
        <img class="popular-goods-img" src="${o[0]}" alt="${s}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${s}</h3>
            <ul class="popular-goods-colors">
                ${a.map(c=>`<input type="checkbox" class="goods-color" style="background-color: ${c}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${n} грн</p>
        </div>
        <button class="furniture-btn btn-details" data-id="${i}">Детальніше</button>
      </li>
        `)).join("");r.popularGoodsList.innerHTML=t,new B(".popular-goods-swiper",{modules:[M,P],pagination:{el:".popular-goods-swiper-pagination",clickable:!0},navigation:{nextEl:".popular-goods-swiper-button-next",prevEl:".popular-goods-swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}}),r.popularGoodsList.addEventListener("click",o=>{const s=o.target.closest(".furniture-btn");if(!s)return;const a=s.dataset.id,n=e.furnitures.find(i=>i._id===a);q([n])})}function Z(){document.querySelector(".swiper").remove()}Y();m.defaults.baseURL="https://furniture-store.b.goit.study/api";const _=document.querySelector(".star-to-run"),ee=_.getAttribute("src"),te=document.querySelector(".feedback");function re(){document.querySelector(".swiper").remove()}async function oe(e=1){try{return(await m.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{re(),l.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function se(){const e=await oe(),t=e.map(({descr:o,name:s,rate:a,_id:n})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${n}" data-rating="${a}"></div>
          <p class="feedback-descr">${o}</p>
          <p class="feedback-name">${s}</p>
      </li>`).join("");r.feedbackList.insertAdjacentHTML("beforeend",t),ae(e),te.querySelectorAll(".star-value").forEach(o=>{o.style.backgroundImage=`url("${ee}")`}),ne()}function ae(e){e.forEach(({rate:t,_id:o})=>{O({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${o}`)})})}function ne(){new B(".feedback-swiper",{modules:[M,P],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}se();let b=[];const C="https://furniture-store.b.goit.study/api/";r.categoriesList.addEventListener("click",le);r.furnitureLoadMoreBtn.addEventListener("click",I);ie();v(8,1);async function ie(){try{const t=(await m.get(`${C}categories`)).data;ce(t)}catch{l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function ce(e){const t={"":"/img/about-us/peoples-desktop-min.jpg","66504a50a1b2c3d4e5f6a7b8":"/img/furnitureList/мякі меблі-min.png","66504a50a1b2c3d4e5f6a7b9":"/img/furnitureList/шафи та системи зберігання-min.png","66504a50a1b2c3d4e5f6a7ba":"/img/furnitureList/ліжка та матраци-min.png","66504a50a1b2c3d4e5f6a7bb":"/img/furnitureList/столи-min.png","66504a50a1b2c3d4e5f6a7bc":"/img/furnitureList/стільці та табурети-min.png","66504a50a1b2c3d4e5f6a7bd":"/img/furnitureList/Кухні-min.png","66504a50a1b2c3d4e5f6a7be":"/img/furnitureList/меблі для дитячої-min.png","66504a50a1b2c3d4e5f6a7bf":"/img/furnitureList/меблі для офісу-min.png","66504a50a1b2c3d4e5f6a7c0":"/img/furnitureList/меблі для передпокою-min.png","66504a50a1b2c3d4e5f6a7c1":"/img/furnitureList/меблі для ванної кімнати-min.png","66504a50a1b2c3d4e5f6a7c2":"/img/furnitureList/садові та вуличні меблі-min.png","66504a50a1b2c3d4e5f6a7c3":"/img/furnitureList/декор та аксесуари-min.png"},o=[{_id:"",name:"Всі товари"},...e].map(({_id:s,name:a})=>{const n=t[s];return`
        <li>
        <button type="button"
         class="category-btn${s===""?" active":""}"
          data-category="${s}"  style="${n?`background-image: url('${n}');background-size: cover; background-position: center;"`:""}">
          
          ${a}
          </button>
          </li>
          `}).join("");r.categoriesList.insertAdjacentHTML("beforeend",o)}let g=1;const x=8;let $=1;async function v(e,t,o=""){try{const s={limit:e,page:t};o&&(s.category=o);const n=(await m.get(`${C}furnitures`,{params:s})).data;b=n.furnitures,$=Math.ceil(n.totalItems/Number(e)),t===1&&(r.furnitureGrid.innerHTML=""),de(b),t>=$?me():ue()}catch{l.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function de(e){const t=e.map(({_id:o,name:s,images:a,color:n,price:i})=>{const c=` <ul class="color-list"> 
        ${n.map(d=>`<li class="color-dot" style="background-color:${d}"></li>`).join("")}
        </ul> `;return`
        <li class="furniture-card">
        <img src="${a[0]}" alt="${s}" class="furniture-img">
        <h3 class="furniture-name">${s}</h3>
         ${c}
        <p class="furniture-price">${i} грн</p>
        <button class="furniture-btn btn-details" data-id="${o}">Детальніше</button>

        </li>
        
        `}).join("");r.furnitureGrid.insertAdjacentHTML("beforeend",t),r.furnitureGrid.addEventListener("click",o=>{const s=o.target.closest(".furniture-btn");if(!s)return;const a=s.dataset.id,n=b.find(i=>i._id===a);n?q([n]):l.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function le(e){if(!e.target.classList.contains("category-btn"))return;r.categoriesList.querySelectorAll(".category-btn").forEach(s=>s.classList.remove("active")),e.target.classList.add("active");const o=e.target.dataset.category;g=1,v(x,g,o)}function ue(){r.furnitureLoadMoreBtn.classList.remove("visually-hidden")}function me(){r.furnitureLoadMoreBtn.classList.add("visually-hidden")}r.furnitureLoadMoreBtn.addEventListener("click",I);function I(e){g+=1;const t=r.categoriesList.querySelector(".category-btn.active"),o=t?t.dataset.category:"";v(x,g,o)}
//# sourceMappingURL=index.js.map
