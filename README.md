# Personal Finance Tracker

#### Video Demo:
<Insert YouTube URL here>

#### GitHub Repository:
https://github.com/Anhaj0/finance-tracker

#### Description:

I built this simple, user-friendly web app to help people keep track of their money easily. It lets you record your daily income and expenses, so you can quickly see how you're spending your money and manage your budget better.

### Why I Made This

I wanted to create something useful that would make managing finances less complicated. Tracking money with pen and paper or complicated apps can be tiresome, so I aimed for something straightforward and effective.

### What the App Can Do

- **Easy Data Entry:** Quickly add income or expenses by entering the type, category, amount, and date.
- **Real-time Updates:** Immediately see new transactions listed as soon as you add them.
- **Keeps Your Data Safe:** All your transactions are saved securely in a simple database.
- **Clear Transaction History:** Easily see all past transactions neatly displayed in one place.

### Technologies Used

- **Flask (Python):** Runs the server, processes data, and connects with the database.
- **SQLite:** A lightweight, easy-to-use database to store transaction data.
- **HTML/CSS:** To structure and style the webpage, making it clean and easy to use.
- **JavaScript:** To handle real-time updates and interactions without needing to refresh the page.

### Project Structure

- **app.py:**
  - Starts the Flask server.
  - Handles homepage and transactions.
  - Manages database connections and operations.

- **templates/index.html:**
  - Main webpage with the form to add new transactions.
  - Shows your list of transactions.

- **static/style.css:**
  - Makes the webpage easy to read and visually appealing.

- **static/script.js:**
  - Sends new transaction data to the server.
  - Retrieves and displays your transactions without reloading the page.

- **database.db:**
  - Stores all transaction data securely.

### Why These Technologies?

Flask is straightforward and easy to work with, ideal for small, practical apps like this. SQLite was chosen because it's fast, reliable, and doesn't need complicated setup. Using plain HTML, CSS, and JavaScript keeps the app simple, lightweight, and user-friendly.

### Challenges Faced

I needed the app to update immediately after adding transactions without refreshing the page. JavaScript’s fetch API easily solved this problem by getting data from Flask behind the scenes.

Managing the database effectively was another important part. Using Flask’s easy database handling allowed me to keep data safe without much trouble.

### Ideas for Future

- **Graphs and Charts:** Add visuals like graphs or charts to better understand spending patterns.
- **User Login:** Allow multiple people to securely manage their finances separately.
- **Budget Alerts:** Users can set budgets and receive notifications if they overspend.

Working on this project helped me learn practical skills in building web apps and using databases. It’s simple but powerful enough to be expanded in many exciting ways.
