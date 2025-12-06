# PreviewCloud

A simple full-stack application with React frontend, Node.js/Express backend, and PostgreSQL database.

## Project Structure

```
previewcloud/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
└── docker-compose.yml # Docker orchestration file
```

## Features

- **Frontend**: React app displaying "Hello World" on the homepage
- **Backend**: Express server with `/hello` route
- **Database**: PostgreSQL database with connection setup

## Prerequisites

- Docker and Docker Compose installed on your system

## Getting Started

### Using Docker Compose (Recommended)

1. Clone or navigate to the project directory:
```bash
cd previewcloud
```

2. Start all services:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Backend Hello Route: http://localhost:5000/hello
   - Health Check: http://localhost:5000/health

### Running Services Individually

#### Frontend (Development)
```bash
cd frontend
npm install
npm start
```

#### Backend (Development)
```bash
cd backend
npm install
npm run dev
```

#### PostgreSQL
The PostgreSQL database runs automatically with docker-compose. For standalone use:
```bash
docker run --name previewcloud-postgres \
  -e POSTGRES_DB=previewcloud \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15-alpine
```

## API Endpoints

- `GET /hello` - Returns a hello message
- `GET /health` - Health check endpoint with database status

## Docker Services

- **postgres**: PostgreSQL 15 database
- **backend**: Node.js/Express API server
- **frontend**: React application served via Nginx

## Environment Variables

Backend environment variables (set in docker-compose.yml):
- `PORT`: Server port (default: 5000)
- `DB_HOST`: Database host (default: postgres)
- `DB_PORT`: Database port (default: 5432)
- `DB_NAME`: Database name (default: previewcloud)
- `DB_USER`: Database user (default: postgres)
- `DB_PASSWORD`: Database password (default: postgres)

## Stopping Services

```bash
docker-compose down
```

To remove volumes (database data):
```bash
docker-compose down -v
```

