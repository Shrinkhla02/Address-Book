# Address Book

Backend Depoyment: https://address-book-backend-10fac46fe1ae.herokuapp.com/

Frontend Deployment: https://address-book-frontend-09af65530880.herokuapp.com/
## Overview

This project provides a comprehensive system for [brief description of what your project does]. It currently manages approximately 1,200 records, which have been indexed for optimal search performance. The backend is built with Node.js, and the frontend utilizes [frontend framework]. Data is stored in a MySQL database deployed on Azure.

## Documentation

- [Class Diagram](./Class-Diagram.md)
- [Architecture](./Architecture.md)
- [Sequence Diagram](./Sequence-diagram.md)

## UI Screenshots
![UI1](https://github.com/user-attachments/assets/650cdfa6-f780-4eba-beab-677169914e36)
![UI2](https://github.com/user-attachments/assets/4ca469c8-6067-4fff-ae22-62d5ea549ca7)
![UI3](https://github.com/user-attachments/assets/a056874a-886e-494e-a410-a5c60c3d01b3)


## Prerequisites

- Node.js (v14.x or higher)
- NPM (v6.x or higher)
- MySQL

## Installation and Setup

### Database Setup

1. The MySQL database is hosted on Azure. You will need to configure your database connection:

   ```
   DB_HOST=your_azure_mysql_host
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=3306
   ```

2. Create a `.env` file in the backend directory with the above configuration.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm run build
   npm start
   ```

4. The API server will be running at `http://localhost:8000` (or your configured port).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API endpoint in `.env`:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. For production build:
   ```bash
   npm run build
   ```

6. The frontend will be accessible at `http://localhost:3000`.

## Enhancement Opportunities

The current system has several areas where improvements can be made:

1. **Data Expansion**: While the current dataset contains approximately 1,200 records, the database and indexing structure support significant scaling.

2. **Authentication System**: Implementing a more robust user authentication and authorization system.



## Troubleshooting

### Common Issues
**Database Connection Errors**:
   - Verify database credentials in your `.env` file
   - Ensure Azure firewall settings allow your IP address
