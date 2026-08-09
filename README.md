# ShopSphere

A Full Stack E-Commerce Platform built using Spring Boot, ReactJS, JWT Authentication, Redux Toolkit, and MySQL.

## Features

### User Features

- User Registration & Login
- JWT Authentication & Authorization
- Browse Products
- Search Products
- Shopping Cart Management
- Update Cart Quantity
- Remove Items from Cart
- Checkout & Place Orders
- View Order History

### Admin Features

- Admin Login
- Add Products
- Update Products
- Delete Products
- Add Categories
- Manage Inventory
- Role-Based Access Control

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Maven

### Frontend

- ReactJS
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

## Security Features

- BCrypt Password Encryption
- JWT Token Authentication
- Role-Based Authorization
- Protected Routes
- Exception Handling

## Prerequisites

Before running the project, make sure the following software is installed:

Java JDK 21
Maven
MySQL Server
Node.js (LTS Version)
Git
VS Code / Eclipse or Spring Tool Suite (STS)

## Installation & Setup

# 1. Clone the Repository

git clone https://github.com/Apurv-Amai/ShopSphere.git
cd ShopSphere

# 2. Backend Setup

Navigate to the backend folder:

cd ecommerce-backend

Open the project in Spring Tool Suite (STS) or Eclipse.

Copy the sample config and update it with your own values:

cd ecommerce-backend
copy src/main/resources/application.properties.example src/main/resources/application.properties

Then edit `src/main/resources/application.properties` and update:

spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=your_password
app.jwt.secret=your_jwt_secret_here

Do not commit `src/main/resources/application.properties` to Git. It is already ignored by `.gitignore`.

Create a MySQL database named:

ecommerce_db

Run the Spring Boot application.

The backend will start at:

http://localhost:8080

# 3. Frontend Setup

Open a new terminal.

Navigate to the frontend folder:

cd ecommerce-frontend

Install all dependencies:

npm install

Start the React application:

npm run dev

The frontend will start at:

http://localhost:5173

# 4. Login Credentials

Admin

Create an admin user directly in the database by updating the user's role to:

ROLE_ADMIN

User

Register a new account using the Register page.

# API Base URL

http://localhost:8080
