# MessConnect – Smart Cafeteria & Mess Management System

MessConnect is a full-stack web-based cafeteria and mess management system designed to digitize and simplify daily mess operations. The system provides separate functionality for **Admin, Billing Staff, and Users**, allowing secure management of users, food, wallets, billing, refunds, feedback, and reports.

The application is built using **React.js for the frontend, Spring Boot for the backend, and MySQL for database management**, with REST APIs connecting the frontend and backend.

---

## 📸 Project Screenshots

### Login Page
![Login Page](images/login.png)




### Admin Dashboard

**ADD IMAGE HERE**

![Admin Page](images/AdminPage.png)

### User Dashboard

**ADD IMAGE HERE**

<!-- Add your user dashboard screenshot here -->

### Food Management

**ADD IMAGE HERE**

<!-- Add your food management screenshot here -->

### Wallet Management

**ADD IMAGE HERE**

<!-- Add your wallet screenshot here -->

### Billing

**ADD IMAGE HERE**

<!-- Add your billing screenshot here -->

### Transaction History

**ADD IMAGE HERE**

<!-- Add your transaction history screenshot here -->

---

## 🚀 Features

### Authentication & Authorization

* Secure user login using **JWT authentication**
* Role-based access control
* Separate roles for:

  * Admin
  * Billing Staff
  * User
* Protected backend APIs using Spring Security

### User Management

* User registration and management
* Automatic user code generation
* User type management
* User status management
* Secure password handling using BCrypt
* User profile information management

### Wallet Management

* Wallet automatically created for users
* Wallet recharge functionality
* Wallet balance tracking
* Transaction history
* Low-balance threshold
* Refund support
* Wallet-related notifications

### Food Management

* Add and manage food items
* View available food items
* Manage food pricing
* Food availability management

### Billing Management

* Food selection and bill generation
* Automatic wallet deduction
* Bill item management
* Billing Staff authorization
* Transaction recording
* Refund processing

### Feedback Management

* Users can submit feedback
* Feedback management for administrators
* Secured feedback APIs

### Reports & Analytics

* Revenue information
* User spending information
* Meal-related expenses
* Wallet transaction information
* Basic operational reports

---

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router
* Vite

### Backend

* Java
* Spring Boot
* Spring Security
* Hibernate
* JPA
* REST APIs
* JWT

### Database

* MySQL

### Development Tools

* Visual Studio Code
* Spring Tool Suite (STS)
* Postman
* Git
* GitHub

---

## 🏗️ System Architecture

MessConnect follows a **client-server architecture** where the React frontend communicates with the Spring Boot backend through REST APIs.

```text
                  ┌──────────────────────┐
                  │      React.js        │
                  │      Frontend        │
                  └──────────┬───────────┘
                             │
                             │ REST APIs
                             │ Axios
                             ▼
                  ┌──────────────────────┐
                  │     Spring Boot      │
                  │       Backend        │
                  ├──────────────────────┤
                  │ Controllers          │
                  │ Services             │
                  │ Repositories         │
                  │ Security / JWT       │
                  └──────────┬───────────┘
                             │
                             │ Hibernate / JPA
                             ▼
                  ┌──────────────────────┐
                  │        MySQL         │
                  │       Database       │
                  └──────────────────────┘
```

### Architecture Image

**ADD IMAGE HERE**

<!-- Add your system architecture diagram here -->

---

## 🔐 Authentication Flow

MessConnect uses **JWT-based authentication** to secure the application.

1. User enters login credentials.
2. React sends the credentials to the Spring Boot login API.
3. Backend authenticates the user.
4. A JWT token is generated after successful authentication.
5. The frontend stores the token for the current session.
6. The token is sent with protected API requests.
7. Spring Security validates the token.
8. The requested operation is allowed according to the user's role.

**ADD IMAGE HERE**

<!-- Add JWT authentication flow diagram here -->

---

## 👥 User Roles

| Role              | Responsibilities                                                               |
| ----------------- | ------------------------------------------------------------------------------ |
| **Admin**         | Manage users, food, wallet operations, reports, feedback and system operations |
| **Billing Staff** | Generate bills, select food items and process user billing                     |
| **User**          | View wallet, transactions, food, bills, expenses and submit feedback           |

---

## 💰 Wallet & Billing Flow

The wallet and billing modules are integrated to provide controlled meal billing.

```text
User Wallet
     │
     ▼
Select Food
     │
     ▼
Generate Bill
     │
     ▼
Check Wallet Balance
     │
     ▼
Deduct Bill Amount
     │
     ▼
Save Transaction
     │
     ▼
Update Wallet Balance
```

If a refund is required, the refund amount is credited back to the user's wallet and the corresponding transaction is recorded.

**ADD IMAGE HERE**

<!-- Add wallet/billing flow diagram or screenshot here -->

---

## 🗄️ Database Design

The application uses **MySQL** with Hibernate/JPA for database persistence.

Major entities include:

* User
* Wallet
* Wallet History
* Food
* Bill
* Bill Item
* Feedback
* Refund
* Notification

The database follows relational database principles and uses relationships between entities to maintain data consistency.

**ADD IMAGE HERE**

<!-- Add ER diagram/database diagram here -->

---

## 📁 Project Structure

### Backend

```text
src/
└── main/
    └── java/
        └── com.cdac/
            ├── controller/
            ├── service/
            ├── serviceimpl/
            ├── repository/
            ├── entity/
            ├── dto/
            ├── security/
            ├── config/
            ├── enums/
            └── utils/
```

### Frontend

```text
src/
├── components/
├── pages/
├── services/
├── routes/
├── assets/
├── App.jsx
└── main.jsx
```

---

## 🔄 API Communication

The React frontend communicates with the Spring Boot backend through REST APIs using **Axios**.

Example flow:

```text
React Component
       │
       ▼
     Axios
       │
       ▼
REST Controller
       │
       ▼
Service Layer
       │
       ▼
Repository
       │
       ▼
MySQL Database
```

---

## 🧪 API Testing

Backend REST APIs were tested using **Postman**.

Testing included:

* User registration
* Login
* JWT authentication
* Wallet recharge
* Wallet transactions
* Food management
* Bill generation
* Refund operations
* Feedback APIs

**ADD IMAGE HERE**

<!-- Add Postman API screenshots here -->

---

## 🔒 Security

Security features implemented in the application include:

* JWT-based authentication
* Spring Security
* Role-based authorization
* BCrypt password hashing
* Protected REST APIs
* Stateless backend session management
* Authorization based on user roles

---

## ⚙️ How to Run the Project

### Backend Setup

1. Clone the repository.

```bash
git clone <your-repository-url>
```

2. Open the backend project in **Spring Tool Suite / IntelliJ IDEA / Eclipse**.

3. Configure the MySQL database.

4. Update the database configuration in:

```text
application.properties
```

5. Configure the JWT secret.

6. Run the Spring Boot application.

The backend will start on:

```text
http://localhost:8080
```

### Frontend Setup

1. Open the frontend folder.

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 📌 Future Enhancements

* Online payment gateway integration
* Advanced analytics dashboard
* Food wastage analysis
* Meal frequency analytics
* Email/SMS notifications
* Microservices-based architecture
* Cloud deployment
* Automated CI/CD pipeline

---

## 🎯 Project Objectives

* Digitize cafeteria and mess management operations.
* Reduce manual billing and record-keeping.
* Provide secure user authentication and authorization.
* Allow users to track wallet balance and transactions.
* Improve transparency in food billing and expenses.
* Provide administrators with centralized management and reporting.

---

## 👨‍💻 Developer

**Ashutosh Kumar**
**Sahil Kumar Patro**
**Rakesh Kumar**
**Technologies:** Java | Spring Boot | React.js | JavaScript | MySQL | Hibernate/JPA | REST APIs | JWT

---

## 📄 License

This project is developed for educational and academic purposes.
