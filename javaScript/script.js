// (todo) Conseguir API de los cocteles

// Coctel (aleatorio)
const getCocktail = async () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const coctailData = await response.json();
        console.log(coctailData);
        getCocktailData(coctailData);
    } catch (error) {
        console.error(`Error in fetching data: ${error}`);
    }
}
getCocktail();

// Conseguir data del coctel
const getCocktailData = (cocktailData) => {
    console.log(cocktailData["drinks"][0]);
    // Va a estar en español porque no sale las instrucciones en algunos cocteles en español
    const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb, strInstructions } = cocktailData["drinks"][0];
    console.log(idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb, strInstructions);

    const ingredientsArray = getIngredients(cocktailData["drinks"][0]);
    console.log(ingredientsArray);
};

const getIngredients = (cocktailData) => {
    const ingredientsArray = Object.keys(cocktailData)
        .filter(key => key.startsWith("strIngredient"))
        .map(key => cocktailData[key]);

    console.log(ingredientsArray);

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