from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from backend.models import FarmerStatus, TransactionType


class FarmerBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    phone_number: str = Field(..., min_length=10, max_length=20)
    village: Optional[str] = Field(None, max_length=100)
    district: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    land_size_acres: Optional[float] = Field(None, ge=0)


class FarmerCreate(FarmerBase):
    pass


class FarmerUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    phone_number: Optional[str] = Field(None, min_length=10, max_length=20)
    village: Optional[str] = Field(None, max_length=100)
    district: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    land_size_acres: Optional[float] = Field(None, ge=0)
    status: Optional[FarmerStatus] = None


class FarmerResponse(FarmerBase):
    id: int
    farmer_id: str
    status: FarmerStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CreditScoreBase(BaseModel):
    score: int = Field(..., ge=0, le=1000)
    repayment_history_score: int = Field(0, ge=0, le=250)
    transaction_frequency_score: int = Field(0, ge=0, le=250)
    input_usage_score: int = Field(0, ge=0, le=250)
    crop_diversity_score: int = Field(0, ge=0, le=250)
    notes: Optional[str] = None


class CreditScoreCreate(CreditScoreBase):
    farmer_id: int


class CreditScoreResponse(CreditScoreBase):
    id: int
    farmer_id: int
    calculated_at: datetime

    class Config:
        from_attributes = True


class TransactionBase(BaseModel):
    transaction_type: TransactionType
    amount: float = Field(..., gt=0)
    description: Optional[str] = None
    transaction_date: Optional[datetime] = None


class TransactionCreate(TransactionBase):
    farmer_id: int


class TransactionUpdate(BaseModel):
    verified: Optional[int] = Field(None, ge=0, le=1)
    verified_by: Optional[str] = Field(None, max_length=200)


class TransactionResponse(TransactionBase):
    id: int
    transaction_id: str
    farmer_id: int
    verified: int
    verified_by: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
