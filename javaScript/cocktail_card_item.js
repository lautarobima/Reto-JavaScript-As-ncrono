function cocktailCard(cocktailInfo, favorite = false){
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb, strInstructions } = cocktailInfo;
    const cocktailIngredientsArray = getIngredients(cocktailInfo)

    const innerHtml =`
<div class="itemContainer">
    <!-- ID. es donde va el id, mientras que el CockTail es donde va el nombre-->
    <div>
        <div class="headerContainer" id="${idDrink}">
            <h2>${idDrink}. ${strDrink}</h2>
            <button class="favoriteButton">★</button>
        </div>
        <img src="${strDrinkThumb}" alt="${strDrink} image">
    </div>
    <div class="descriptCont">
        <p>${strAlcoholic}</p>
        <p>${strCategory}</p>
        <p>${cocktailIngredientsArray.join(", ")}</p>
        <p>${strInstructions}</p>
    </div>
</div>
    `;

    const node = document.createElement("div");

    node.innerHTML = innerHtml;

    const btn = node.querySelector(".favoriteButton");
    btn.addEventListener("click", () => {
        if (favorite){
            removeFavorite(cocktailInfo);
        }
        else{
            addFavorite(cocktailInfo);
        }
        //refreshFavorites();
        refreshFavoritesNew();
    })
    return node;
}


window.addEventListener(
    "load",
    async ()=>{
        const catalogContainer = document.getElementById("catalogContainer");
        //refreshFavorites();
        refreshFavoritesNew();
        catalogContainer.appendChild(cocktailCard(await getCocktail()));
        catalogContainer.appendChild(cocktailCard(await getCocktail()));
        catalogContainer.appendChild(cocktailCard(await getCocktail()));
        catalogContainer.appendChild(cocktailCard(await getCocktail()));

    }
) 