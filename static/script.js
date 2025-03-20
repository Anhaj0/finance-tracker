// Wait until page loads fully
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('transaction-form');
    const transactionsList = document.getElementById('transactions-list');

    // Load existing transactions when the page loads
    loadTransactions();

    // Handle form submission
    form.onsubmit = function(event) {
        event.preventDefault();

        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;

        fetch('/add_transaction', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({type, category, amount, date})
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            form.reset(); 
            loadTransactions();
        });
    };

    // Function to fetch transactions from backend
    function loadTransactions() {
        fetch('/transactions')
        .then(response => response.json())
        .then(transactions => {
            transactionsList.innerHTML = ''; // clear list
            transactions.forEach(transaction => {
                const item = document.createElement('li');
                item.textContent = `${transaction[1]} | ${transaction[2]} | ${transaction[3]} | ${transaction[4]}`;
                transactionsList.appendChild(item);
            });
        });
    }
});
