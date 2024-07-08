const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        'x-rapidapi-key': '6fbb01cc58msh39421f2fd714f1fp188e24jsne12c639fae51',
    }
}

let coins = [];

const fetchCoins = async () => {
    try {
        const response = await fetch("https://coingecko.p.rapidapi.com/coins/markets?page=1&vs_currency=usd&per_page=100&order=market_cap_desc", options);
        coins = await response.json();
        return coins;
        //console.log(coins);
        //console.log(response)
    } catch (error) {
        console.error("Error while fetching coins", error);
    }
}

window.onload = fetchCoins();
