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
    const favs = readFavorites();
    if(!favs.some(favItem => (favItem.idDrink === item.idDrink))){
        favs.push(item);
        writeFavorites(favs);
    }
}

function removeFavorite(item){
    let favs = readFavorites();
    favs = favs.filter(fav => fav.idDrink !== item.idDrink);
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