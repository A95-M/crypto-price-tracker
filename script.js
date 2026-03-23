const container = document.getElementById("crypto-container");

async function fetchCryptoData() {

const response = await fetch(
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1"
);

const data = await response.json();

displayCoins(data);

}

function displayCoins(coins){

container.innerHTML = "";

coins.forEach(coin => {

const card = document.createElement("div");

card.className = "crypto-card";

card.innerHTML = `

<h2>${coin.name}</h2>

<p>$${coin.current_price}</p>

`;

container.appendChild(card);

});

}

fetchCryptoData();