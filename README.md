# Agricultural Credit Identity API

Financial identity layer for smallholder agriculture where consistent good behavior becomes the most valuable collateral, transforming agricultural credit from asset-based to activity-based across emerging markets.

## Product Vision

Build the financial identity layer for smallholder agriculture enabling data-driven credit inclusion for 10 million previously unbankable farmers within five years.

## Target Audience

- **Small and Marginal Farmers**: Seeking affordable formal credit
- **Bank Credit Officers**: Requiring reliable risk assessment tools
- **FPO Administrators**: Managing member financial inclusion
- **Agricultural Input Dealers**: Participating in verification networks
- **Mandi Operators**: Contributing to transaction verification

## Core Features

- **Farmer Profile Management**: Complete CRUD operations for farmer data
- **Credit Score Tracking**: Activity-based credit scoring system
- **Transaction Recording**: Comprehensive transaction history with verification
- **Data-Driven Assessment**: Transform agricultural behavior into creditworthiness

## Technology Stack

- **Backend Framework**: FastAPI 0.104.1
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Python Version**: 3.9+
- **Architecture**: Modular Monolith

## Prerequisites

- Python 3.9 or higher
- PostgreSQL 12 or higher
- pip (Python package manager)

## Installation

1. **Clone the repository**
```bash
cd /app/user_workspace/team_069/fafb2dd8-f4d3-486b-be99-21ff7e997247
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
cd backend
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp ../.env.example .env
# Edit .env with your database credentials and configuration
```

5. **Create PostgreSQL database**
```bash
createdb agri_credit_db
# Or using psql:
# psql -U postgres -c "CREATE DATABASE agri_credit_db;"
```

## Configuration

Edit the `.env` file with your settings:

- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Strong random string for security (generate with `openssl rand -hex 32`)
- `DEBUG`: Set to `False` in production
- `CORS_ORIGINS`: Allowed origins for CORS

## Running the Application

### Development Mode

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### Production Mode

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once the application is running, access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Farmers
- `POST /api/v1/farmers/` - Create new farmer
- `GET /api/v1/farmers/` - List all farmers
- `GET /api/v1/farmers/{farmer_id}` - Get farmer details
- `PUT /api/v1/farmers/{farmer_id}` - Update farmer
- `DELETE /api/v1/farmers/{farmer_id}` - Delete farmer

### Credit Scores
- `POST /api/v1/credit-scores/` - Create credit score
- `GET /api/v1/credit-scores/farmer/{farmer_id}` - Get farmer's credit scores
- `GET /api/v1/credit-scores/farmer/{farmer_id}/latest` - Get latest credit score
- `GET /api/v1/credit-scores/{credit_score_id}` - Get specific credit score

### Transactions
- `POST /api/v1/transactions/` - Create transaction
- `GET /api/v1/transactions/` - List all transactions
- `GET /api/v1/transactions/farmer/{farmer_id}` - Get farmer's transactions
- `GET /api/v1/transactions/{transaction_id}` - Get transaction details
- `PATCH /api/v1/transactions/{transaction_id}` - Update transaction verification
- `DELETE /api/v1/transactions/{transaction_id}` - Delete transaction

## Database Schema

### Farmers Table
- Stores farmer profile information
- Unique farmer ID and phone number
- Location and land size data
- Status tracking (active/inactive/suspended)

### Credit Scores Table
- Activity-based credit scoring
- Component scores: repayment history, transaction frequency, input usage, crop diversity
- Historical tracking of score changes

### Transactions Table
- Transaction history with types: loan repayment, input purchase, crop sale, subsidy receipt
- Verification status and verifier information
- Links to farmer profiles

## Architecture

**Modular Monolith** with clear separation of concerns:

- `main.py` - Application entry point and configuration
- `config.py` - Settings and environment management
- `database.py` - Database connection and session management
- `models.py` - SQLAlchemy ORM models
- `schemas.py` - Pydantic validation schemas
- `routers/` - API route handlers organized by domain

## Security Features

- Input validation using Pydantic
- SQL injection prevention via SQLAlchemy ORM
- Environment-based configuration
- CORS protection
- Structured error handling and logging

## Development Guidelines

1. Follow PEP 8 style guide
2. Add logging for important operations
3. Use type hints for better code clarity
4. Validate all inputs using Pydantic schemas
5. Handle errors gracefully with appropriate HTTP status codes

## Success Metrics

- Enable credit access for previously unbankable farmers
- Reduce credit assessment time for bank officers
- Increase transaction verification accuracy
- Scale to support 10 million farmers

## License

Proprietary - All rights reserved

## Support

For issues and questions, please contact the development team.
