from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Create the database and the transactions table
def create_database():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            category TEXT,
            amount REAL,
            date TEXT
        )
    ''')
    connection.commit()
    connection.close()

# Home page route
@app.route('/')
def home():
    return render_template('index.html')

# Route for adding a new transaction
@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    transaction = request.get_json()
    
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()

    cursor.execute('''
        INSERT INTO transactions (type, category, amount, date)
        VALUES (?, ?, ?, ?)
    ''', (transaction['type'], transaction['category'], transaction['amount'], transaction['date']))

    connection.commit()
    connection.close()

    return jsonify({'message': 'Transaction added successfully'})

# Route to fetch all transactions
@app.route('/transactions')
def get_transactions():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM transactions')
    transactions = cursor.fetchall()

    connection.close()

    return jsonify(transactions)

# Route to delete a transaction
@app.route('/delete_transaction/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    
    cursor.execute('DELETE FROM transactions WHERE id = ?', (transaction_id,))
    connection.commit()
    connection.close()
    
    return jsonify({'message': 'Transaction deleted successfully'})

# Route to update a transaction
@app.route('/update_transaction/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    updated_data = request.get_json()
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    
    cursor.execute('''
        UPDATE transactions
        SET type = ?, category = ?, amount = ?, date = ?
        WHERE id = ?
    ''', (updated_data['type'], updated_data['category'], updated_data['amount'], updated_data['date'], transaction_id))
    
    connection.commit()
    connection.close()
    
    return jsonify({'message': 'Transaction updated successfully'})

# Main program start
if __name__ == '__main__':
    create_database()  # Create database on first run
    app.run(debug=True)
