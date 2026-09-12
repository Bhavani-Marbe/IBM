from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import logging

from backend.database import get_db
from backend.models import CreditScore, Farmer
from backend.schemas import CreditScoreCreate, CreditScoreResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/", response_model=CreditScoreResponse, status_code=status.HTTP_201_CREATED)
def create_credit_score(credit_score: CreditScoreCreate, db: Session = Depends(get_db)):
    """Create a new credit score for a farmer"""
    try:
        # Verify farmer exists
        farmer = db.query(Farmer).filter(Farmer.id == credit_score.farmer_id).first()
        if not farmer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Farmer not found"
            )
        
        db_credit_score = CreditScore(**credit_score.model_dump())
        db.add(db_credit_score)
        db.commit()
        db.refresh(db_credit_score)
        
        logger.info(f"Created credit score for farmer ID: {credit_score.farmer_id}")
        return db_credit_score
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating credit score: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create credit score"
        )


@router.get("/farmer/{farmer_id}", response_model=List[CreditScoreResponse])
def get_farmer_credit_scores(farmer_id: int, db: Session = Depends(get_db)):
    """Get all credit scores for a specific farmer"""
    try:
        # Verify farmer exists
        farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
        if not farmer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Farmer not found"
            )
        
        credit_scores = db.query(CreditScore).filter(
            CreditScore.farmer_id == farmer_id
        ).order_by(CreditScore.calculated_at.desc()).all()
        
        return credit_scores
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving credit scores: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve credit scores"
        )


@router.get("/farmer/{farmer_id}/latest", response_model=CreditScoreResponse)
def get_latest_credit_score(farmer_id: int, db: Session = Depends(get_db)):
    """Get the latest credit score for a farmer"""
    try:
        # Verify farmer exists
        farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
        if not farmer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Farmer not found"
            )
        
        credit_score = db.query(CreditScore).filter(
            CreditScore.farmer_id == farmer_id
        ).order_by(CreditScore.calculated_at.desc()).first()
        
        if not credit_score:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No credit score found for this farmer"
            )
        
        return credit_score
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving latest credit score: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve credit score"
        )


@router.get("/{credit_score_id}", response_model=CreditScoreResponse)
def get_credit_score(credit_score_id: int, db: Session = Depends(get_db)):
    """Get a specific credit score by ID"""
    try:
        credit_score = db.query(CreditScore).filter(CreditScore.id == credit_score_id).first()
        if not credit_score:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Credit score not found"
            )
        return credit_score
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving credit score: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve credit score"
        )
