import{i as d,a as y,r as M,S as P,N as x,P as C}from"./assets/vendor-DPbXg51y.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const a={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),modalDetailisProduct:document.querySelector(".modal"),popularGoodsList:document.querySelector(".popular-goods-list"),headerOpenModalBtn:document.querySelector("[data-modal-open]"),headerCloseModalBtns:document.querySelectorAll("[data-modal-close]"),headerModal:document.querySelector("[data-modal-mobnav]"),headerMenuLinks:document.querySelectorAll("[data-modal-mobnav] a"),headerBody:document.body,headerScrollButtons:document.querySelectorAll(".scroll-to-furniture"),headerScrollBtns:document.querySelectorAll(".scroll-to-furniture")};(function(){var n,r,i,l;(n=a.headerOpenModalBtn)==null||n.addEventListener("click",e),(r=a.headerCloseModalBtns)==null||r.forEach(c=>c.addEventListener("click",t)),(i=a.headerModal)==null||i.addEventListener("click",s),(l=a.headerMenuLinks)==null||l.forEach(c=>c.addEventListener("click",t)),window.addEventListener("keydown",o);function e(){var c,u;(c=a.headerModal)==null||c.classList.add("isopen"),(u=a.headerBody)==null||u.classList.add("modal-open")}function t(){var c,u;(c=a.headerModal)==null||c.classList.remove("isopen"),(u=a.headerBody)==null||u.classList.remove("modal-open")}function s(c){c.target.closest(".mob-modal-wrap")||t()}function o(c){(c.key==="Escape"||c.code==="Escape")&&t()}})();var q;(q=a.headerScrollBtns)==null||q.forEach(e=>{e.addEventListener("click",t=>{var o,n;t.preventDefault();const s=document.getElementById("furniture");s&&(s.scrollIntoView({behavior:"smooth"}),(o=a.headerModal)!=null&&o.classList.contains("isopen")&&(a.headerModal.classList.remove("isopen"),(n=a.headerBody)==null||n.classList.remove("modal-open")))})});const I=document.querySelector(".modal-form"),L=document.querySelector(".order-modal"),g=document.querySelector(".input-email"),f=document.querySelector(".textarea"),p=document.querySelector(".input-phone");I.addEventListener("submit",U);async function U(e){e.preventDefault();const t=localStorage.getItem("orderData");if(!t){d.error({title:"Помилка",message:"Немає інформації про товар. Оформлення неможливе.",position:"topCenter"});return}const s=JSON.parse(t),o=s.productId,n=s.color;if(!o||!n){d.error({title:"Помилка",message:"Немає даних про товар. Спробуйте додати його ще раз.",position:"topCenter"});return}const r=e.currentTarget.elements.email.value.trim(),i=e.currentTarget.elements.phone.value.replace(/^\+/,""),l=e.currentTarget.elements.comment.value.trim(),c={email:r,phone:i,modelId:o,color:n,comment:l},u=g.parentElement.querySelector(".error-text");!r||r.length>64?(g.classList.add("error-message"),h(g,"Не валідний Email")):(g.classList.remove("error-message"),u&&u.remove());const m=p.parentElement.querySelector(".error-text");i?(p.classList.remove("error-message"),m&&m.remove()):(p.classList.add("error-message"),h(p,"Введіть номер телефону"));const B=f.parentElement.querySelector(".error-text");l.length<5||l.length>256?(f.classList.add("error-message"),h(f,"Введіть коментар довжиною від 5 до 256 символів")):(f.classList.remove("error-message"),B&&B.remove());const F=r&&r.length<=64,j=/^380\d{9}$/.test(i),R=l.length>=5&&l.length<=256;F&&j&&R?await N(c)&&(d.success({title:"Успіх",message:"Форма успішно відправлена!",position:"topCenter"}),I.reset()):d.error({title:"Помилка",message:"Будь ласка, виправ помилки у формі",position:"topCenter"})}function h(e,t){if(!e.parentElement.querySelector(".error-text")){const o=`<p class="error-text">${t}</p>`;e.insertAdjacentHTML("afterend",o)}}function V(){document.body.classList.add("body--no-scroll"),L.classList.remove("visually-hidden")}function k(){document.body.classList.remove("body--no-scroll"),L.classList.add("visually-hidden")}function G(){document.querySelector(".close-form-btn").addEventListener("click",k),document.addEventListener("keydown",t=>{t.key==="Escape"&&k()}),L.addEventListener("click",t=>{t.target===L&&k()})}G();function w(e){e.addEventListener("focus",()=>{e.removeAttribute("placeholder"),e===p&&(e.value.startsWith("+380")||(e.value="+380"))}),e===p&&e.addEventListener("input",()=>{p.value="+380"+p.value.replace(/\D/g,"").slice(3)})}w(g);w(f);w(p);function $(e,t){e.addEventListener("blur",()=>{e.setAttribute("placeholder",`${t}`)})}$(g,"12345ggg@gmail.com");$(f,"Type your message...");$(p,"+38 (099) 123 22 11");const H="https://furniture-store.b.goit.study/api";async function N(e){var t,s;try{return(await y.post(`${H}/orders`,e,{headers:{"Content-Type":"application/json"}})).status===201}catch(o){const n=((s=(t=o.response)==null?void 0:t.data)==null?void 0:s.message)||o.message||"Помилка запиту";return d.error({title:"Помилка",message:n,position:"topCenter"}),!1}}function T(e){_();const t=document.querySelector(".modal-content"),s=e.map(z).join("");t.innerHTML=s,K(e[0].rate);const n=document.querySelector(".star-to-run").getAttribute("href");document.querySelectorAll(".star-value").forEach(m=>{m.style.backgroundImage=`url("${n}")`});const r=document.getElementById("main-product-img"),i=document.querySelectorAll(".mini-img"),l=r.src,c=r.alt;i.forEach(m=>{m.addEventListener("mouseover",()=>{r.style.opacity=.5,setTimeout(()=>{r.src=m.src,r.alt=m.alt,r.style.opacity=1},200)}),m.addEventListener("mouseout",()=>{r.style.opacity=.5,setTimeout(()=>{r.src=l,r.alt=c,r.style.opacity=1},200)})}),Q(),document.querySelector(".detailis-product").addEventListener("submit",W)}function z({_id:e,images:t,name:s,price:o,rate:n,sizes:r,color:i,description:l,type:c}){return`
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
          <div class="modal-rating custom-stars" >
            
          </div>
        </div>
      </div>

      <form class="detailis-product">
        <p class="select-color">Колір</p>
        <div class="radio-group">
          ${J(i)}
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
  `}function J(e){return e.map((t,s)=>`
    <label class="color-label">
      <input type="radio" name="color" value="${t}" ${s===0?"checked":""} />
      <span class="circle" style="background-color: ${t}"></span>
      <span class="checkmark"></span>
    </label>
  `).join("")}function K(e,t=".modal-rating"){const s=document.querySelector(t);if(!s){console.warn(`Контейнер ${t} не знайдено`);return}s.innerHTML="",M({max:5,readOnly:!0,starSize:20,rating:e,element:s,step:.5})}function W(e){var r;e.preventDefault();const s=document.querySelector(".modal-product-btn").dataset.id,o=(r=e.target.querySelector('input[name="color"]:checked'))==null?void 0:r.value;if(!o){d.warning({title:"Увага",message:"Оберіть колір перед замовленням",position:"topRight"});return}const n={productId:s,color:o};localStorage.setItem("orderData",JSON.stringify(n)),b(),V()}function _(){document.body.classList.add("body--no-scroll"),a.modalDetailisProduct.classList.add("modal--is-open")}function b(){document.body.classList.remove("body--no-scroll"),a.modalDetailisProduct.classList.remove("modal--is-open")}function Q(){document.querySelector(".modal-close-btn").addEventListener("click",b),document.addEventListener("keydown",t=>{t.key==="Escape"&&b()}),a.modalDetailisProduct.addEventListener("click",t=>{t.target===a.modalDetailisProduct&&b()})}async function X(){try{return(await y.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){Z(),d.error({title:e.message,position:"topRight"})}}async function Y(){const e=await X(),t=e.furnitures.map(({images:s,name:o,color:n,price:r,_id:i})=>(o.length>28&&(o=o.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide">
        <img class="popular-goods-img" src="${s[0]}" alt="${o}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${o}</h3>
            <ul class="popular-goods-colors">
                ${n.map(l=>`<input type="checkbox" class="goods-color" style="background-color: ${l}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${r} грн</p>
        </div>
        <button class="furniture-btn btn-details" data-id="${i}">Детальніше</button>
      </li>
        `)).join("");a.popularGoodsList.innerHTML=t,new P(".popular-goods-swiper",{modules:[x,C],pagination:{el:".popular-goods-swiper-pagination",clickable:!0},navigation:{nextEl:".popular-goods-swiper-button-next",prevEl:".popular-goods-swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}}),a.popularGoodsList.addEventListener("click",s=>{const o=s.target.closest(".furniture-btn");if(!o)return;const n=o.dataset.id,r=e.furnitures.find(i=>i._id===n);T([r])})}function Z(){document.querySelector(".swiper").remove()}Y();const A="https://furniture-store.b.goit.study/api/";let S=[];async function ee(){try{const t=(await y.get(`${A}categories`)).data;console.log(t),te(t)}catch{d.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function te(e){const t={"":"./img/furnitureList/всі товари-min.png","66504a50a1b2c3d4e5f6a7b8":"/img/furnitureList/декор та аксесуари-min.png","66504a50a1b2c3d4e5f6a7b9":"/img/furnitureList/Кухні-min.png","66504a50a1b2c3d4e5f6a7ba":"/img/furnitureList/ліжка та матраци-min.png","66504a50a1b2c3d4e5f6a7bb":"/img/furnitureList/меблі для ванної кімнати-min.png","66504a50a1b2c3d4e5f6a7bc":"/img/furnitureList/меблі для дитячої-min.png","66504a50a1b2c3d4e5f6a7bd":"/img/furnitureList/меблі для офісу-min.png","66504a50a1b2c3d4e5f6a7be":"/img/furnitureList/меблі для передпокою-min.png","66504a50a1b2c3d4e5f6a7bf":"/img/furnitureList/мякі меблі-min.png","66504a50a1b2c3d4e5f6a7c0":"/img/furnitureList/садові та вуличні меблі-min.png","66504a50a1b2c3d4e5f6a7c1":"/img/furnitureList/стільці та табурети-min.png","66504a50a1b2c3d4e5f6a7c2":"/img/furnitureList/столи-min.png","66504a50a1b2c3d4e5f6a7c3":"/img/furnitureList/шафи та системи зберігання-min.png"},s=[{_id:"",name:"Всі товари"},...e].map(({_id:o,name:n})=>{const r=t[o];return`
        <li>
        <button type="button"
         class="category-btn${o===""?" active":""}"
          data-category="${o}"  style="${r?`background-image: url('${r}');background-size: cover; background-position: center;"`:""}">
          
          <span class="category-name">${n}</span>
          </button>
          </li>
          `}).join("");a.categoriesList.insertAdjacentHTML("beforeend",s)}let v=1;const D=8;async function E(e,t,s=""){try{const o={limit:e,page:t};s&&(o.category=s);const r=(await y.get(`${A}furnitures`,{params:o})).data;S=r.furnitures,t===1&&(a.furnitureGrid.innerHTML=""),re(S),t*e>=r.totalItems?a.furnitureLoadMoreBtn.style.display="none":a.furnitureLoadMoreBtn.style.display="block"}catch{d.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function re(e){const t=e.map(({_id:s,name:o,images:n,color:r,price:i})=>{const l=` <ul class="color-list"> 
        ${r.map(c=>`<li class="color-dot" style="background-color:${c}"></li>`).join("")}
        </ul> `;return`
        <li class="furniture-card">
        <img src="${n[0]}" alt="${o}" class="furniture-img">
        <h3 class="furniture-name">${o}</h3>
         ${l}
        <p class="furniture-price">${i} грн</p>
        <button class="furniture-btn btn-details" data-id="${s}">Детальніше</button>

        </li>
        
        `}).join("");a.furnitureGrid.insertAdjacentHTML("beforeend",t),a.furnitureGrid.addEventListener("click",s=>{const o=s.target.closest(".furniture-btn");if(!o)return;const n=o.dataset.id,r=S.find(i=>i._id===n);r?T([r]):d.error({title:"Error",message:"Продукт не знайдено за ID",position:"topRight"})})}function oe(e){if(!e.target.classList.contains("category-btn"))return;a.categoriesList.querySelectorAll(".category-btn").forEach(o=>o.classList.remove("active")),e.target.classList.add("active");const s=e.target.dataset.category;v=1,E(D,v,s)}a.furnitureLoadMoreBtn.addEventListener("click",O);function O(e){v+=1;const t=a.categoriesList.querySelector(".category-btn.active"),s=t?t.dataset.category:"";E(D,v,s)}y.defaults.baseURL="https://furniture-store.b.goit.study/api";function se(){document.querySelector(".swiper").remove()}async function ne(e=1){try{return(await y.get(`/feedbacks?limit=10&page=${e}`)).data.feedbacks}catch{se(),d.error({title:"Помилка",message:"Не вдалось завантажити дані. Спробуйте пізніше",position:"topRight"})}}async function ae(){const e=await ne(),t=e.map(({descr:n,name:r,rate:i,_id:l})=>`
      <li class="feedback-item swiper-slide">
          <div id="rater-${l}" data-rating="${i}"></div>
          <p class="feedback-descr">${n}</p>
          <p class="feedback-name">${r}</p>
      </li>`).join("");a.feedbackList.insertAdjacentHTML("beforeend",t),ie(e);const o=document.querySelector(".star-to-run").getAttribute("href");document.querySelectorAll(".star-value").forEach(n=>{n.style.backgroundImage=`url("${o}")`}),ce()}function ie(e){e.forEach(({rate:t,_id:s})=>{M({max:5,readOnly:!0,rating:t,starSize:20,element:document.querySelector(`#rater-${s}`)})})}function ce(){new P(".feedback-swiper",{modules:[x,C],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}ae();a.categoriesList.addEventListener("click",oe);a.furnitureLoadMoreBtn.addEventListener("click",O);ee();E(8,1);
//# sourceMappingURL=index.js.map
