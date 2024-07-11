const shimmerContainer = document.getElementsByClassName("shimmer-container")[0];

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        'x-rapidapi-key': '6fbb01cc58msh39421f2fd714f1fp188e24jsne12c639fae51',
    }
}

let coins = [];
let itemsPerPage = 15;
let currentPage = 1;

// Step 1 => Fetching the data from the API
const fetchCoins = async () => {
    try {
        const response = await fetch("https://coingecko.p.rapidapi.com/coins/markets?page=1&vs_currency=usd&per_page=100&order=market_cap_desc", options);
        const coinsData = await response.json();
        return coinsData;
        //console.log(coins);
        //console.log(response)
    } catch (error) {
        console.error("Error while fetching coins", error);
    }
};

const handleFavClick = (coinId) => {
    
}

const getCoinsToDisplay = (coins, pageno) => {

}

// Show Shimmer => 
const showShimmer = () => {
    shimmerContainer.style.display = "flex";
}

// Hide Shimmere => 
const hideShimmer = () => {
    shimmerContainer.style.display = "none"
}

// Step 2 => display the data on the page

const displayCoins = (coins) => {
    const tableBody = document.getElementById("crypto-table-body");
    tableBody.innerHTML = "";
    coins.forEach((coin, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index}</td>
            <td><img src="${coin.image}" alt="${coin.name}" width="24" height="24"/></td>
            <td>${coin.name}</td>
            <td>$ ${coin.current_price}</td>
            <td>${coin.total_volume}</td>
            <td>$ ${coin.market_cap}</td>
            <td><i class="fa-solid fa-star favourite-icon" data-id="${coin.id}"></i></td>
        `;
        row.getElementsByClassName("favourite-icon").addEventListener('click', (event) => {
            event.stopPropogation();
            handleFavClick(coin.id);
        })
        tableBody.appendChild(row);
    }) 
}
document.addEventListener("DOMContentLoaded", async () => {
    try {
        showShimmer();
        coins = await fetchCoins();
        displayCoins(getCoinsToDisplay(coins, currentPage));
        hideShimmer();
    } catch (error) {
        console.log(error);
        hideShimmer();
    }
    // coins = await fetchCoins();
    // console.log(coins);
    // displayCoins(coins)
})
