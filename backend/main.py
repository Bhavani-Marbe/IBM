from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from backend.config import settings
from backend.database import engine, Base
from backend.routers import farmers, credit_scores, transactions

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    logger.info("Starting application...")
    Base.metadata.create_all(bind=engine)
    yield
    logger.info("Shutting down application...")


app = FastAPI(
    title="Agricultural Credit Identity API",
    description="Financial identity layer for smallholder agriculture",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(farmers.router, prefix="/api/v1/farmers", tags=["Farmers"])
app.include_router(credit_scores.router, prefix="/api/v1/credit-scores", tags=["Credit Scores"])
app.include_router(transactions.router, prefix="/api/v1/transactions", tags=["Transactions"])


@app.get("/")
async def root():
    return {
        "message": "Agricultural Credit Identity API",
        "version": "1.0.0",
        "status": "operational"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
