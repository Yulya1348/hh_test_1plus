const SERVER_URLS = [
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1',
    'https://fanated.com/coingecko_markets.json',
    'https://fanated.com/coingecko/mock'
];

async function getData(urls) {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Fetch error for ${url}:', error);
        }
    }
    throw new Error('Все ресурсы не отвечают');
}

async function displayCryptoData() {
    try {
        const data = await getData(SERVER_URLS);
        const tableBody = document.querySelector("#crypto-table tbody");

        data.forEach(coin => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = coin.id;
            row.appendChild(idCell);

            const symbolCell = document.createElement('td');
            symbolCell.textContent = coin.symbol;
            row.appendChild(symbolCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = coin.name;
            row.appendChild(nameCell);

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Fetch error:', error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Error: ${error.message}';
    }
}

displayCryptoData();