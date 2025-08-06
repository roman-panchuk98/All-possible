


const BaseUrl = "https://furniture-store.b.goit.study/api/";
const categoriesList = document.querySelector("#categories");

const furnitureGrid = document.querySelector("#gallery");
const loadMoreBtn = document.querySelector("#loadMoreBtn");


export async function getCategories() {
    try {
    
    const res = await axios.get(`${BaseUrl}categories`);
    const categories = res.data;
    markUpCategories(categories);
    
    } catch (error) {
        console.log(error);
        
    }
   
    
};

function markUpCategories(categories) {
    categoriesList.innerHTML =
    `<button type="button" class="category-btn active" data-category="">Всі товари</button>` + 
    categories
    .map(
        cat => 
            `<button type="button" class="category-btn" data-category="${cat._id}">${cat.name}
        </button>`
    ).join("");

}




let page = 1;
const limit = 8;
export async function getFurniture(limit, page, category = "") {
    try{
    const params = {
        limit: limit,
        page: page,
        
    };
    if (category) {
        params.category = category
    };
    
    const responce = await axios.get(`${BaseUrl}furnitures` , {params})
    const data = responce.data;
    
    if(page === 1) {
        furnitureGrid.innerHTML = "";

    }
    markUpFurniture(data.furnitures);
     if (page * limit >= data.totalItems) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }


} catch (error) {
    console.log(error);
    
}
}


function markUpFurniture(items) {
    const markUp = items
    .map(item => `
        <div class="furniture-card">
        <img src="${item.images[0]}" alt="${item.name}" class="furniture-img">
        <h3 class="furniture-name">${item.name}</h3>
        
        <p class="furniture-color"> ${item.color}</p>
        <p class="furniture-price">${item.price} грн</p>
        <button class="btn btn-details" data-id="${item._id}">Детальніше</button>

        </div>
        
        `).join("");
        furnitureGrid.insertAdjacentHTML("beforeend", markUp);
}
getCategories();
getFurniture(limit, page);