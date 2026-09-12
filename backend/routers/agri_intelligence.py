from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import Farmer
from backend.schemas import AgriTrustIntelligenceResponse
from backend.services.agricultural_intelligence import (
    calculate_agricultural_signals
)


router = APIRouter(
    prefix="/api/v1/agritrust",
    tags=["AgriTrust Intelligence"]
)


@router.get(
    "/farmer/{farmer_id}",
    response_model=AgriTrustIntelligenceResponse
)
def get_agritrust_intelligence(
    farmer_id: int,
    db: Session = Depends(get_db)
):

    farmer = (
        db.query(Farmer)
        .filter(Farmer.id == farmer_id)
        .first()
    )

    if not farmer:
        raise HTTPException(
            status_code=404,
            detail="Farmer not found"
        )

    signals = calculate_agricultural_signals(
        farmer.transactions
    )

    return {
        "farmer_id": farmer.id,
        "farmer_name": farmer.name,
        **signals
    }