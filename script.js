document.getElementById('stockForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const stockName = document.getElementById('stockName').value;
    const buyDate = document.getElementById('buyDate').value;
    const quantity = document.getElementById('quantity').value;
    const buyPrice = document.getElementById('buyPrice').value;

    addStockToTable(stockName, buyDate, quantity, buyPrice);

    document.getElementById('stockForm').reset();
});

function addStockToTable(stockName, buyDate, quantity, buyPrice) {
    const table = document.getElementById('stockTable');
    const row = table.insertRow();

    const nameCell = row.insertCell(0);
    nameCell.textContent = stockName;

    const buyDateCell = row.insertCell(1);
    buyDateCell.textContent = buyDate;

    const quantityCell = row.insertCell(2);
    quantityCell.textContent = quantity;

    const buyPriceCell = row.insertCell(3);
    buyPriceCell.textContent = buyPrice;

    const sellPriceCell = row.insertCell(4);
    sellPriceCell.innerHTML = '<input type="number" class="sellPrice">';
    
    const sellDateCell = row.insertCell(5);
    sellDateCell.innerHTML = '<input type="date" class="sellDate">';

    const profitCell = row.insertCell(6);
    profitCell.textContent = '';

    const durationCell = row.insertCell(7);
    durationCell.textContent = '';

    const editCell = row.insertCell(8);
    editCell.innerHTML = '<button class="edit-btn" onclick="editStock(this)">Edit</button>';

    sellPriceCell.querySelector('input').addEventListener('input', () => calculateProfit(row));
    sellDateCell.querySelector('input').addEventListener('input', () => calculateProfit(row));
}

function calculateProfit(row) {
    const buyPrice = parseFloat(row.cells[3].textContent);
    const quantity = parseInt(row.cells[2].textContent);
    const sellPrice = parseFloat(row.cells[4].querySelector('input').value);
    const sellDate = new Date(row.cells[5].querySelector('input').value);
    const buyDate = new Date(row.cells[1].textContent);

    if (isNaN(sellPrice) || !sellDate || isNaN(buyPrice) || isNaN(quantity)) {
        row.cells[6].textContent = 'N/A';
        row.cells[7].textContent = 'N/A';
        return;
    }

    const profit = (sellPrice - buyPrice) * quantity;
    row.cells[6].textContent = profit.toFixed(2);

    const duration = Math.round((sellDate - buyDate) / (1000 * 60 * 60 * 24));
    row.cells[7].textContent = `${duration} days`;
}

function editStock(button) {
    const row = button.parentNode.parentNode;
    const nameCell = row.cells[0];
    const buyDateCell = row.cells[1];
    const quantityCell = row.cells[2];
    const buyPriceCell = row.cells[3];

    nameCell.innerHTML = `<input type="text" value="${nameCell.textContent}">`;
    buyDateCell.innerHTML = `<input type="date" value="${buyDateCell.textContent}">`;
    quantityCell.innerHTML = `<input type="number" value="${quantityCell.textContent}">`;
    buyPriceCell.innerHTML = `<input type="number" value="${buyPriceCell.textContent}">`;

    button.textContent = 'Save';
    button.onclick = function() {
        saveStock(row, button);
    };
}

function saveStock(row, button) {
    const nameInput = row.cells[0].querySelector('input');
    const buyDateInput = row.cells[1].querySelector('input');
    const quantityInput = row.cells[2].querySelector('input');
    const buyPriceInput = row.cells[3].querySelector('input');

    row.cells[0].textContent = nameInput.value;
    row.cells[1].textContent = buyDateInput.value;
    row.cells[2].textContent = quantityInput.value;
    row.cells[3].textContent = buyPriceInput.value;

    button.textContent = 'Edit';
    button.onclick = function() {
        editStock(button);
    };

    calculateProfit(row);
}
