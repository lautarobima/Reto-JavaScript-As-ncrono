// (todo) Conseguir API de los cocteles

// Coctel (aleatorio)

const getCoctail = async () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const coctailData = await response.json();
        console.log(coctailData);
    } catch (error) {
        console.error(`Error in fetching data: ${error}`);
    }
}
getCoctail();