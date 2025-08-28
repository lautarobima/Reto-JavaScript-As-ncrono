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
};