const catalogContainer = document.getElementById("catalogContainer");
const addCocktail = document.getElementById("add-cocktail");
// Conseguir API de los cocteles

// Coctel (aleatorio)
const getCocktail = async () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    // Progress bar
    

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const cocktailData = await response.json();
        return cocktailData["drinks"][0];
    } catch (error) {
        console.error(`Error in fetching data: ${error}`);
    }
}

const getCocktailRandom = async () => {
    /*
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const cocktailData = await response.json();
        console.log(cocktailData);
        presentCocktail(cocktailData, getIngredients(cocktailData["drinks"][0]));
        //getCocktailData(coctailData);
    } catch (error) {
        console.error(`Error in fetching data: ${error}`);
    }*/
    const cocktailData = await getCocktail();
    //console.log(cocktailData)
    catalogContainer.appendChild(cocktailCard(cocktailData));
};

const getCocktailData = (cocktailData) => {
    // Va a estar en español porque no sale las instrucciones en algunos cocteles en español
    // CUIDADO QUE EN OCACIONES strDrink devuelve 410 Gone, es decir que el coctel ya no existe, muy raro, pero me paso
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb, strInstructions } = cocktailData["drinks"][0];

    const ingredientsArray = getIngredients(cocktailData["drinks"][0]);

    presentCocktail(cocktailData, ingredientsArray);
};

const getIngredients = (cocktailData) => {
    const ingredientsArray = Object.keys(cocktailData)
        .filter(key => key.startsWith("strIngredient"))
        .map(key => cocktailData[key]);

    // Esto es un crimen de guerra pero los breaks funcionan raro en JS entonces toco asi
    let searchNull = true;
    let i = 0;
    while (searchNull) {
        if (ingredientsArray[i] >= ingredientsArray.length || ingredientsArray[i] == null) {
            searchNull = false;
        } else {
            i += 1;
        }
    }

    return ingredientsArray.splice(0, i);
};

// Mostrar la informacion en una presentacion bonita (cambiar despues con sus respectivos elementos de documento)
const presentCocktail = (cocktailData, cocktailIngredientsArray) => {
    // Se que se ve muy raro hacer la exactama misma cosa aqui, pero uno nunca sabe, tal vez lo necesitemos en un futuro
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb, strInstructions } = cocktailData["drinks"][0];

    // Esto se cambia despues con alguna mejor presentacion o algo asi
    /*
    console.log(`ID: ${idDrink}`);
    console.log(`Alcohol: ${strAlcoholic}`);
    console.log(`Categoria: ${strCategory}`);
    console.log(`Nombre: ${strDrink}`);
    console.log(`Imagen: ${strDrinkThumb}`);
    // Toca hacer esto distinto cuando llegue el HTML
    console.log(`Ingredientes: ${cocktailIngredientsArray.toString()}`);
    console.log(`Instrucciones:\n\t${strInstructions}`);
    catalogContainer.innerHTML += `
<div class="itemContainer">
    <!-- ID. es donde va el id, mientras que el CockTail es donde va el nombre-->
    <div class="headerContainer">
        <h2>${idDrink}. ${strDrink}</h2>
        <button class="favoriteButton">★</button>
    </div>
    <img src="${strDrinkThumb}" alt="${strDrink} image">
    <p>${strAlcoholic}</p>
    <p>${strCategory}</p>
    <p>${cocktailIngredientsArray.join(", ")}</p>
    <p>${strInstructions}</p>
</div>`
};

//addCocktail.addEventListener("click", getCocktailRandom);
addCocktail.addEventListener("click", getCocktailRandom);