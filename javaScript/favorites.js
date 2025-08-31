const FAV_KEY = 'favorites';

function readFavorites(){
    const raw = localStorage.getItem(FAV_KEY);
    if(raw){
        return JSON.parse(raw);
    }
    return [];
}

function writeFavorites(favorites){
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
}

function addFavorite(item){
    /*const favs = readFavorites();
    if(!favs.some(favItem => (favItem.idDrink === item.idDrink))){
        favs.push(item);
        writeFavorites(favs);
    }*/
    //console.log(item);
    const favs = readFavorites();
    const { idDrink, strDrink } = item;
    const newItem = {
        id: idDrink,
        name: strDrink
    };
    favs.push(newItem);
    writeFavorites(favs);

}

function removeFavorite(item){
    /*
    let favs = readFavorites();
    favs = favs.filter(fav => fav.idDrink !== item.idDrink);
    writeFavorites(favs);*/
    let favs = readFavorites();
    favs = favs.filter(fav => fav.id !== item.id);
    writeFavorites(favs);
}

function refreshFavorites(){
    const favoriteContainer = document.getElementById("favoriteContainer");
    const favoritesData = readFavorites();
    favoriteContainer.innerHTML = '';
    favoritesData.forEach((fav) => {
        favoriteContainer.appendChild(cocktailCard(fav, true));
    });
}

const refreshFavoritesNew = () => {
    const favoriteContainer = document.getElementById("favoriteContainer");
    const favoritesData = readFavorites();
    favoriteContainer.innerHTML = '';
    favoritesData.forEach((fav) => {
        favoriteContainer.appendChild(cocktailCardFavorites(fav, true))
    });
};

const getFavorites = () => {
    const favoritesData = readFavorites();
    console.log(favoritesData);
};
getFavorites();

const getFavoriteCard = async (id) => {
    const catalogContainer = document.getElementById("catalogContainer");
    console.log(id);
    //catalogContainer.appendChild(cocktailCard(getCocktailById(id)));
    catalogContainer.appendChild(cocktailCard(await getCocktailById(id)));
};

const cocktailCardFavorites = (item, favorite = false) => {
    const innerHtml =`
    <div class="favItemContainer">
        <!-- ID. es donde va el id, mientras que el CockTail es donde va el nombre-->
        <div class="headerContainer" id="${item.id}">
            <h2>${item.id}. ${item.name}</h2>
            <button class="favoriteButton">★</button>
            <button class="get-to-catalog-button" onclick="getFavoriteCard(${item.id})">⬇︎</button>
        </div>
    </div>`
    const node = document.createElement("div");
    node.innerHTML = innerHtml;
    const btn = node.querySelector(".favoriteButton");
    btn.addEventListener("click", () => {
        if (favorite){
            removeFavorite(item);
        }
        else{
            addFavorite(item);
        }
        refreshFavoritesNew();
    })
    return node;
};