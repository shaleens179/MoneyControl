# MoneyControl
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Stock Portfolio</h1>
    <form id="stock-form">
        <label for="stock-name">Stock Name:</label>
        <input type="text" id="stock-name" required>
        <label for="buy-price">Buy Price:</label>
        <input type="number" id="buy-price" step="0.01" required>
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" required>
        <label for="buy-date">Buy Date:</label>
        <input type="text" id="buy-date" placeholder="dd-mm-yyyy" required>
        <button type="submit">Add Stock</button>
    </form>
    <table id="stock-table">
        <thead>
            <tr>
                <th>Stock Name</th>
                <th>Buy Price</th>
                <th>Quantity</th>
                <th>Buy Date</th>
                <th>Sell Price</th>
                <th>Sell Date</th>
                <th>Profit/Loss</th>
                <th>Duration</th>
            </tr>
        </thead>
        <tbody>
            <!-- Stock data will be inserted here -->
        </tbody>
    </table>
    <script src="script.js"></script>
</body>
</html>
