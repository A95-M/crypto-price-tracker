const container = document.getElementById("crypto-container");

let coinsData = [];

async function fetchCryptoData() {

try {

container.innerHTML = "Loading...";

const response = await fetch(
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1"
);

const data = await response.json();

coinsData = data;

displayCoins(data);

}

catch(error){

container.innerHTML = "Failed to load data";

console.error(error);

}

}

function displayCoins(coins){

container.innerHTML = "";

coins.forEach(coin => {

const card = document.createElement("div");

card.className = "crypto-card";

const change = coin.price_change_percentage_24h;

const changeClass = change >= 0 ?
"positive" : "negative";

card.innerHTML = `

<img src="${coin.image}" width="50">

<h2>${coin.name}</h2>

<p>$${coin.current_price}</p>

<p class="${changeClass}">
${change.toFixed(2)}%
</p>

`;

container.appendChild(card);

});

}

fetchCryptoData();

setInterval(fetchCryptoData, 60000);

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function(){

const value = this.value.toLowerCase();

const filtered = coinsData.filter(coin =>
coin.name.toLowerCase().includes(value)
);

displayCoins(filtered);

});