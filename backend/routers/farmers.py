from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import Farmer
from backend.schemas import FarmerCreate, FarmerResponse


router = APIRouter(
    prefix="/api/v1/farmers",
    tags=["Farmers"]
)


@router.post("/", response_model=FarmerResponse)
def create_farmer(
    farmer: FarmerCreate,
    db: Session = Depends(get_db)
):
    new_farmer = Farmer(**farmer.model_dump())

    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)

    return new_farmer


@router.get("/", response_model=list[FarmerResponse])
def list_farmers(
    db: Session = Depends(get_db)
):
    return db.query(Farmer).all()


@router.get("/{farmer_id}", response_model=FarmerResponse)
def get_farmer(
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

    return farmer