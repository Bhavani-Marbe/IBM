from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid
import logging

from backend.database import get_db
from backend.models import Transaction, Farmer
from backend.schemas import TransactionCreate, TransactionUpdate, TransactionResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    """Create a new transaction for a farmer"""
    try:
        # Verify farmer exists
        farmer = db.query(Farmer).filter(Farmer.id == transaction.farmer_id).first()
        if not farmer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Farmer not found"
            )
        
        # Generate unique transaction ID
        transaction_id = f"TXN-{uuid.uuid4().hex[:12].upper()}"
        
        db_transaction = Transaction(
            transaction_id=transaction_id,
            **transaction.model_dump()
        )
        db.add(db_transaction)
        db.commit()
        db.refresh(db_transaction)
        
        logger.info(f"Created transaction: {transaction_id}")
        return db_transaction
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating transaction: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create transaction"
        )


@router.get("/", response_model=List[TransactionResponse])
def list_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all transactions with pagination"""
    try:
        transactions = db.query(Transaction).offset(skip).limit(limit).all()
        return transactions
    except Exception as e:
        logger.error(f"Error listing transactions: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve transactions"
        )


@router.get("/farmer/{farmer_id}", response_model=List[TransactionResponse])
def get_farmer_transactions(farmer_id: str, db: Session = Depends(get_db)):
    """Get all transactions for a specific farmer"""
    try:
        # Find farmer using the public farmer ID
        farmer = db.query(Farmer).filter(
            Farmer.farmer_id == farmer_id
        ).first()

        if not farmer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Farmer not found"
            )

        # Use internal database ID to find transactions
        transactions = db.query(Transaction).filter(
            Transaction.farmer_id == farmer.id
        ).order_by(
            Transaction.transaction_date.desc()
        ).all()

        return transactions

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving farmer transactions: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve transactions"
        )


@router.get("/{transaction_id}", response_model=TransactionResponse)
def get_transaction(transaction_id: str, db: Session = Depends(get_db)):
    """Get a specific transaction by ID"""
    try:
        transaction = db.query(Transaction).filter(
            Transaction.transaction_id == transaction_id
        ).first()
        if not transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transaction not found"
            )
        return transaction
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving transaction: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve transaction"
        )


@router.patch("/{transaction_id}", response_model=TransactionResponse)
def update_transaction(
    transaction_id: str,
    transaction_update: TransactionUpdate,
    db: Session = Depends(get_db)
):
    """Update transaction verification status"""
    try:
        db_transaction = db.query(Transaction).filter(
            Transaction.transaction_id == transaction_id
        ).first()
        if not db_transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transaction not found"
            )
        
        # Update only provided fields
        update_data = transaction_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_transaction, field, value)
        
        db.commit()
        db.refresh(db_transaction)
        
        logger.info(f"Updated transaction: {transaction_id}")
        return db_transaction
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating transaction: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update transaction"
        )


@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(transaction_id: str, db: Session = Depends(get_db)):
    """Delete a transaction"""
    try:
        db_transaction = db.query(Transaction).filter(
            Transaction.transaction_id == transaction_id
        ).first()
        if not db_transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transaction not found"
            )
        
        db.delete(db_transaction)
        db.commit()
        
        logger.info(f"Deleted transaction: {transaction_id}")
        return None
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error deleting transaction: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete transaction"
        )
