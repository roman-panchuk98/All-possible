import{S as d,N as f,P as g,a as c,i as u}from"./assets/vendor-CGvOlcVM.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const a={feedbackList:document.querySelector(".feedback-list"),categoriesList:document.querySelector(".furniture-categories"),furnitureGrid:document.querySelector(".furniture-gallery"),furnitureLoadMoreBtn:document.querySelector("#furniture-loadMoreBtn"),popularGoodsList:document.querySelector(".popular-goods-list")};async function w(){try{return(await c.get("https://furniture-store.b.goit.study/api/furnitures?page=1&limit=11&type=popular")).data}catch(e){L(),u.error({title:e.message,position:"topRight"})}}async function v(){const r=(await w()).furnitures.map(({images:i,name:o,color:t,price:s,_id:n})=>(o.length>28&&(o=o.slice(0,28)+"..."),`
      <li class="popular-goods-item swiper-slide" id="${n}">
        <img class="popular-goods-img" src="${i[0]}" alt="${o}">
        <div class="popular-goods-item-desc">
            <h3 class="popular-goods-item-title">${o}</h3>
            <ul class="popular-goods-colors">
                ${t.map(l=>`<input type="checkbox" class="goods-color" style="background-color: ${l}" disabled>`).join("")}
            </ul>
            <p class="popular-goods-price">${s} грн</p>
        </div>
        <button class="popular-goods-more-datails-btn">Детальніше</button>
      </li>
        `)).join("");a.popularGoodsList.innerHTML=r,new d(".swiper",{modules:[f,g],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},grabCursor:!0,breakpoints:{375:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:4,spaceBetween:24}}})}function L(){document.querySelector(".swiper").remove()}v();c.defaults.baseURL="https://furniture-store.b.goit.study/api";function $(){document.querySelector(".swiper").remove()}async function k(e=1){try{return await c.get(`/feedbacks?limit=10&page=${e}`)}catch(r){$(),u.error({title:r.message,position:"topRight"})}}function S(e){const r=Math.floor(e),i=e%1!==0,o=5-r-(i?1:0);let t="";for(let s=0;s<r;s++)t+='<svg class="star star-filled" width="20" height="20"><use href="img/icons.svg#icon-star-filled"></use></svg>';i&&(t+='<svg class="star star-half" width="20" height="20"><use href="img/icons.svg#icon-star-half"></use></svg>');for(let s=0;s<o;s++)t+='<svg class="star star-empty" width="20" height="20"><use href="img/icons.svg#icon-star-empty"></use></svg>';return t}function B(e){const r=e.map(({descr:i,name:o,rate:t})=>`
      <li class="feedback-item swiper-slide">
          <div class="star-container">${S(t)}</div>
          <p class="feedback-descr">${i}</p>
          <p class="feedback-name">${o}</p>
      </li>`).join("");a.feedbackList.insertAdjacentHTML("beforeend",r),new d(".swiper",{modules:[f,g],pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{375:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}})}async function M(){const e=await k();B(e.data.feedbacks)}const m="https://furniture-store.b.goit.study/api/";async function P(){try{const r=(await c.get(`${m}categories`)).data;x(r)}catch{u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function x(e){const r=[{_id:"",name:"Всі товари"},...e].map(({_id:i,name:o})=>`<li><button type="button" class="category-btn${i===""?" active":""}"  data-category="${i}">${o}</button></li>`).join("");a.categoriesList.insertAdjacentHTML("beforeend",r)}let p=1;const b=8;async function y(e,r,i=""){try{const o={limit:e,page:r};i&&(o.category=i);const s=(await c.get(`${m}furnitures`,{params:o})).data;r===1&&(a.furnitureGrid.innerHTML=""),j(s.furnitures),r*e>=s.totalItems?a.furnitureLoadMoreBtn.style.display="none":a.furnitureLoadMoreBtn.style.display="block"}catch{u.error({title:"Помилка",message:"Не вдалося завантажити дані. Спробуйте пізніше",position:"topRight"})}}function j(e){const r=e.map(({_id:i,name:o,images:t,color:s,price:n})=>{const l=s.map(h=>`<span class="color-dot" style="background-color:${h}"></span>`).join("");return`
        <li class="furniture-card">
        <img src="${t[0]}" alt="${o}" class="furniture-img">
        <h3 class="furniture-name">${o}</h3>
        
        <p class="furniture-color"> ${l}</p>
        <p class="furniture-price">${n} грн</p>
        <button class="furniture-btn btn-details" data-id="${i}">Детальніше</button>

        </li>
        
        `}).join("");a.furnitureGrid.insertAdjacentHTML("beforeend",r)}P();y(b,p);function q(e){if(!e.target.classList.contains("category-btn"))return;a.categoriesList.querySelectorAll(".category-btn").forEach(o=>o.classList.remove("active")),e.target.classList.add("active");const i=e.target.dataset.category;p=1,y(b,p,i)}M();a.categoriesList.addEventListener("click",q);
//# sourceMappingURL=index.js.map
