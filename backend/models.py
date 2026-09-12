from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from backend.database import Base


class FarmerStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"


class TransactionType(str, enum.Enum):
    LOAN_REPAYMENT = "loan_repayment"
    INPUT_PURCHASE = "input_purchase"
    CROP_SALE = "crop_sale"
    SUBSIDY_RECEIPT = "subsidy_receipt"


class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    phone_number = Column(String(20), unique=True, index=True)
    village = Column(String(100))
    district = Column(String(100))
    state = Column(String(100))
    land_size_acres = Column(Float)
    status = Column(Enum(FarmerStatus), default=FarmerStatus.ACTIVE)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    credit_scores = relationship("CreditScore", back_populates="farmer", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="farmer", cascade="all, delete-orphan")


class CreditScore(Base):
    __tablename__ = "credit_scores"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"), nullable=False)
    score = Column(Integer, nullable=False)
    repayment_history_score = Column(Integer, default=0)
    transaction_frequency_score = Column(Integer, default=0)
    input_usage_score = Column(Integer, default=0)
    crop_diversity_score = Column(Integer, default=0)
    calculated_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text)

    farmer = relationship("Farmer", back_populates="credit_scores")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(String(100), unique=True, index=True, nullable=False)
    farmer_id = Column(Integer, ForeignKey("farmers.id"), nullable=False)
    transaction_type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(Text)
    verified = Column(Integer, default=0)
    verified_by = Column(String(200))
    transaction_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    farmer = relationship("Farmer", back_populates="transactions")
