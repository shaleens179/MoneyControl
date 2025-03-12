const API_URL = "https://mcontrol-production.up.railway.app/stocks"; // Your Spring Boot API

// Load stocks when the page loads
document.addEventListener("DOMContentLoaded", fetchStocks);

// Handle stock submission
document.getElementById("stockForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const stock = {
        name: document.getElementById("name").value,
        quantity: document.getElementById("quantity").value,
        buyPrice: document.getElementById("buyPrice").value,
        buyDate: document.getElementById("buyDate").value
    };
    

    // Send a POST request to the API
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stock)
    });

    if (response.ok) {
        // After successfully adding the stock, refresh the stock list
        fetchStocks();
        // Reset the form
        document.getElementById("stockForm").reset();
    } else {
        alert("Failed to add stock");
    }
});

// Fetch stocks and display them in the table
async function fetchStocks() {
    const response = await fetch(API_URL);
    const stocks = await response.json();

    const tableBody = document.getElementById("stockTableBody");
    tableBody.innerHTML = ""; // Clear existing table rows

    stocks.forEach(stock => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${stock.name}</td>
            <td>${stock.quantity}</td>
            <td>₹${stock.buyPrice}</td>
            <td>${stock.buyDate}</td>
            <td><input type="number" id="sellPrice-${stock.id}" placeholder="Enter ₹"></td>
            <td><input type="date" id="sellDate-${stock.id}"></td>
            <td id="profitLoss-${stock.id}">-</td>
            <td>
                <button onclick="calculateProfit(${stock.id}, ${stock.buyPrice}, ${stock.quantity})">Calculate</button>
                <button class="delete-btn" onclick="deleteStock(${stock.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Calculate profit/loss
async function calculateProfit(id, buyPrice, quantity) {
    const sellPrice = document.getElementById(`sellPrice-${id}`).value;
    const sellDate = document.getElementById(`sellDate-${id}`).value;

    if (!sellPrice || !sellDate) {
        alert("Enter Sell Price and Date");
        return;
    }

    // Send the PUT request to update the stock with sell price and date
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellPrice: parseFloat(sellPrice), sellDate })
    });

    if (response.ok) {
        const updatedStock = await response.json();
        // Update the profit/loss cell
        document.getElementById(`profitLoss-${id}`).textContent = `₹${updatedStock.profitLoss}`;
    } else {
        alert("Failed to update stock");
    }
}

// Delete stock
async function deleteStock(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (response.ok) {
        // Refresh the stock table after deletion
        fetchStocks();
    } else {
        alert("Failed to delete stock");
    }
}
