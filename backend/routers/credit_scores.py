from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import Farmer
from backend.schemas import CreditIntelligence
from backend.services.credit_engine import calculate_credit_intelligence


router = APIRouter(
    prefix="/api/v1/credit-intelligence",
    tags=["AgriTrust Intelligence"]
)


@router.get(
    "/{farmer_id}",
    response_model=CreditIntelligence
)
def get_credit_intelligence(
    farmer_id: str,
    db: Session = Depends(get_db)
):
    farmer = db.query(Farmer).filter(
        Farmer.farmer_id == farmer_id
    ).first()

    if not farmer:
        raise HTTPException(
            status_code=404,
            detail="Farmer not found"
        )

    intelligence = calculate_credit_intelligence(farmer)

    return {
        "farmer_id": farmer.farmer_id,
        "farmer_name": farmer.name,
        **intelligence
    }