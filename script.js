document.getElementById('stock-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const stockName = document.getElementById('stock-name').value;
    const buyPrice = parseFloat(document.getElementById('buy-price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const buyDateInput = document.getElementById('buy-date').value;

    // Validate date format (dd-mm-yyyy)
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!datePattern.test(buyDateInput)) {
        alert('Please enter the date in dd-mm-yyyy format.');
        return;
    }

    // Convert dd-mm-yyyy to ISO format (yyyy-mm-dd)
    const [day, month, year] = buyDateInput.split('-');
    const buyDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];

    const newStock = { name: stockName, buyPrice, quantity, buyDate };

    let stocks = JSON.parse(localStorage.getItem('stocks')) || [];
    stocks.push(newStock);
    localStorage.setItem('stocks', JSON.stringify(stocks));

    addStockToTable(newStock);

    document.getElementById('stock-form').reset();
});

async function fetchStocks() {
    const stocks = JSON.parse(localStorage.getItem('stocks')) || [];
    stocks.forEach(addStockToTable);
}

function addStockToTable(stock) {
    const stockTable = document.getElementById('stock-table').getElementsByTagName('tbody')[0];
    const newRow = stockTable.insertRow();

    newRow.insertCell(0).innerText = stock.name;
    newRow.insertCell(1).innerText = stock.buyPrice.toFixed(2);
    newRow.insertCell(2).innerText = stock.quantity;
    newRow.insertCell(3).innerText = formatDate(stock.buyDate);
    newRow.insertCell(4).innerHTML = `<input type="number" step="0.01" class="sell-price" value="${stock.sellPrice || ''}">`;
    newRow.insertCell(5).innerHTML = `<input type="date" class="sell-date" value="${stock.sellDate ? new Date(stock.sellDate).toISOString().split('T')[0] : ''}">`;
    newRow.insertCell(6).innerHTML = `<span class="profit-loss">${calculateProfitLoss(stock)}</span>`;
    newRow.insertCell(7).innerHTML = `<span class="duration">${calculateDuration(stock)}</span>`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function calculateProfitLoss(stock) {
    if (stock.sellPrice && stock.sellDate) {
        return ((stock.sellPrice - stock.buyPrice) * stock.quantity).toFixed(2);
    }
    return '';
}

function calculateDuration(stock) {
    if (stock.sellDate) {
        const buyDate = new Date(stock.buyDate);
        const sellDate = new Date(stock.sellDate);
        return `${Math.floor((sellDate - buyDate) / (1000 * 60 * 60 * 24))} days`;
    }
    return '';
}

fetchStocks();
