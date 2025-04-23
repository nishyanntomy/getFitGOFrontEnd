# 🛠️ Project Setup Instructions

## 📋 Prerequisites

- MySQL Workbench installed and configured
- Python (version 3.8+ recommended)
- Node.js and npm installed (for React JS)

---

## 📦 Installation Steps

### 1. Database Setup

- Navigate to the `database_scripts/` folder.
- Create the necessary database tables and relationships using the SQL scripts provided.

---

### 2. Backend Setup (Flask)

1. Install the required Python packages:

   ```bash
   pip3 install pymysql Flask flask_restful flask_swagger_ui flask_cors cryptography
   ```

2. Configure your database connection:

   - Open the `db.py` file.
   - Update the following lines with your database credentials:

     ```python
     # db.py
     host = "your_host"
     user = "your_username"
     password = "your_password"
     ```

3. Run the backend server:

   ```bash
   python3 main.py
   ```

#### 🔍 Swagger Documentation

Once the Flask server is running, visit:

```
http://127.0.0.1:5000/swagger/
```

to view the API documentation.

---

### 3. Frontend Setup (React)

1. Navigate to your React project directory:

   ```bash
   cd your-react-app/
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

This will launch the application in your default web browser.

---

## ⚙️ Technical Specifications

### 🗄️ Database

- **DBMS:** MySQL Workbench
- **Tables:** 19 total (entities + relationship tables)

### 🔙 Backend

- **Framework:** Flask
- **Language:** Python 3.8

### 🔜 Frontend

- **Framework:** React JS
- **Styling:** Tailwind CSS

### 🛠️ Development Tools

- **Version Control:** GIT
- **IDE:** Visual Studio Code

---

## 🧭 Final User Flow

1. Application starts at the **landing page**.
2. Navigate to the **registration** page.
3. Register as a **trainer** or **client**.
4. Return to the **login** page and log in using your credentials.
5. Upon login, you'll be directed to the **dashboard**.
6. Use the dashboard menu to navigate through the available features.
7. Each menu item routes to its respective functional page.

---

Feel free to customize this README based on your project's structure or add screenshots, deployment links, or team credits!
