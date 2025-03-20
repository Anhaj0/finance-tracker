// Wait until page loads fully
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('transaction-form');
    const transactionsList = document.getElementById('transactions-list');

    // Load transactions on page load
    loadTransactions();

    // Handle form submission for adding transactions
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

    // Function to fetch transactions from the backend
    function loadTransactions() {
        fetch('/transactions')
        .then(response => response.json())
        .then(transactions => {
            transactionsList.innerHTML = ''; // Clear list
            transactions.forEach(transaction => {
                const item = document.createElement('li');
                item.innerHTML = `
    <div class="transaction-details">
        ${transaction[1]} | ${transaction[2]} | $${transaction[3]} | ${transaction[4]}
    </div>
    <div class="transaction-actions">
        <button onclick="editTransaction(${transaction[0]}, '${transaction[1]}', '${transaction[2]}', ${transaction[3]}, '${transaction[4]}')">Edit</button>
        <button onclick="deleteTransaction(${transaction[0]})">Delete</button>
    </div>
`;
                transactionsList.appendChild(item);
            });
        });
    }

    // Function to delete a transaction
    window.deleteTransaction = function(transactionId) {
        if (confirm("Are you sure you want to delete this transaction?")) {
            fetch(`/delete_transaction/${transactionId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                loadTransactions();
            });
        }
    };

    // Function to edit a transaction
    window.editTransaction = function(id, type, category, amount, date) {
        document.getElementById('type').value = type;
        document.getElementById('category').value = category;
        document.getElementById('amount').value = amount;
        document.getElementById('date').value = date;

        form.onsubmit = function(event) {
            event.preventDefault();
            fetch(`/update_transaction/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: document.getElementById('type').value,
                    category: document.getElementById('category').value,
                    amount: document.getElementById('amount').value,
                    date: document.getElementById('date').value
                })
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                form.reset();
                loadTransactions();
                form.onsubmit = originalSubmitHandler; // Reset form to add mode
            });
        };
    };
});
