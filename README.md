# E-Commerce Application

A full-stack e-commerce application built with Spring Boot and React.

## Features

### Backend API
- **User Authentication** - JWT-based login/register system
- **Product Management** - Full CRUD operations for products
- **Category Management** - Product categorization system
- **Image Upload** - Base64 image support for products
- **Search & Filter** - Product search by name and category
- **REST API** - Well-documented RESTful endpoints
- **Database** - PostgreSQL with Liquibase migrations

### Frontend Web App
- **Responsive Design** - Mobile-friendly interface
- **User Dashboard** - Product management interface
- **Authentication** - Secure login/register forms
- **Product Operations** - Add, view, update, delete products
- **Search & Filter** - Real-time product filtering
- **Image Upload** - File to base64 conversion
- **Token Management** - Automatic JWT handling

## Tech Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Database
- **Liquibase** - Database migrations
- **JWT** - Token-based authentication
- **Swagger/OpenAPI** - API documentation
- **Maven** - Build tool

### Frontend
- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling
- **LocalStorage** - Token persistence

## Prerequisites

- **Java 17+**
- **Node.js 16+**
- **PostgreSQL 12+**
- **Maven 3.6+**

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/username/ecom177.git
cd ecom177
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb ecom177

# Update database credentials in src/main/resources/application.properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Backend Setup
```bash
# Run Spring Boot application
mvn spring-boot:run

# Backend will start on http://localhost:8080
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd ecom-frontend

# Install dependencies
npm install

# Start development server
npm start

# Frontend will start on http://localhost:3000
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Product Endpoints (Requires Authentication)
- `GET /api/products` - List all products
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/products/search` - Search products

### Category Endpoints
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### Interactive API Documentation
Visit `http://localhost:8080/swagger-ui/index.html` for complete API documentation.

## Demo Users

### Test Credentials
- **Username:** `testuser`
- **Password:** `123456`

### Sample Categories
- Books
- Electronics

## Usage

### 1. Access Application
Open `http://localhost:3000` in your browser.

### 2. Login/Register
- Use test credentials or create new account
- JWT token automatically managed

### 3. Product Management
- View products in table format
- Search by product name
- Filter by category
- Add new products with images
- Update/delete existing products

### 4. Image Upload
- Supports JPEG, PNG formats
- Automatic base64 conversion
- Image preview in product list

## Project Structure

```
ecom177/
├── src/main/java/com/ecom177/          # Backend source
│   ├── config/                         # Security & JWT config
│   ├── controller/                     # REST controllers
│   ├── dto/                           # Data transfer objects
│   ├── entity/                        # JPA entities
│   ├── repository/                    # Data repositories
│   ├── service/                       # Business logic
│   └── util/                          # Utilities
├── src/main/resources/
│   ├── db/changelog/                  # Liquibase migrations
│   └── application.properties         # Configuration
├── ecom-frontend/                     # Frontend React app
│   ├── public/                        # Static files
│   └── src/
│       ├── components/                # React components
│       └── App.js                     # Main app component
└── README.md
```

## Security Features

- **JWT Authentication** - Stateless token-based auth
- **Password Encryption** - BCrypt hashing
- **CORS Configuration** - Cross-origin resource sharing
- **Input Validation** - Request data validation
- **SQL Injection Protection** - JPA/Hibernate ORM

## Deployment

### Backend Deployment
```bash
# Build JAR file
mvn clean package

# Run JAR
java -jar target/ecom-app-1.0.0.jar
```

### Frontend Deployment
```bash
# Build production files
npm run build

# Serve static files
# Upload build/ folder to web server
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Contact

- **Developer:** Hasan Tatar -wazder
- **Email:** tatarhasan09@gmail.com
- **GitHub:** [@wazder](https://github.com/wazder)
