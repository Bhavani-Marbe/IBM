from collections import defaultdict
from backend.models import TransactionType


def calculate_agricultural_signals(transactions):
    """
    Derives explainable agricultural signals from verified
    farmer transaction activity.

    Returns scores from 0-100.
    """

    if not transactions:
        return {
            "market_activity": 0,
            "cultivation_activity": 0,
            "repayment_strength": 0,
            "evidence_quality": 0,
            "overall_readiness": 0,
            "risk_level": "High",
            "recommended_exposure": 0,
            "explanation": [
                "Insufficient agricultural transaction history."
            ],
            "risk_factors": [
                "More verified activity is required."
            ]
        }

    crop_sales = []
    input_purchases = []
    repayments = []
    subsidies = []

    verified_count = 0

    for transaction in transactions:

        if transaction.verified == 1:
            verified_count += 1

        if transaction.transaction_type == TransactionType.CROP_SALE:
            crop_sales.append(transaction)

        elif transaction.transaction_type == TransactionType.INPUT_PURCHASE:
            input_purchases.append(transaction)

        elif transaction.transaction_type == TransactionType.LOAN_REPAYMENT:
            repayments.append(transaction)

        elif transaction.transaction_type == TransactionType.SUBSIDY_RECEIPT:
            subsidies.append(transaction)

    total_transactions = len(transactions)

    # ---------------------------------------------------------
    # 1. MARKET ACTIVITY
    # ---------------------------------------------------------

    sales_count = len(crop_sales)

    if sales_count >= 12:
        market_activity = 95
    elif sales_count >= 8:
        market_activity = 85
    elif sales_count >= 5:
        market_activity = 70
    elif sales_count >= 2:
        market_activity = 50
    else:
        market_activity = 25

    # ---------------------------------------------------------
    # 2. CULTIVATION ACTIVITY
    # ---------------------------------------------------------

    input_count = len(input_purchases)

    if input_count >= 10:
        cultivation_activity = 95
    elif input_count >= 7:
        cultivation_activity = 85
    elif input_count >= 4:
        cultivation_activity = 70
    elif input_count >= 2:
        cultivation_activity = 50
    else:
        cultivation_activity = 30

    # ---------------------------------------------------------
    # 3. REPAYMENT STRENGTH
    # ---------------------------------------------------------

    repayment_count = len(repayments)

    if repayment_count >= 10:
        repayment_strength = 95
    elif repayment_count >= 6:
        repayment_strength = 85
    elif repayment_count >= 3:
        repayment_strength = 70
    elif repayment_count >= 1:
        repayment_strength = 55
    else:
        # No repayment history should NOT automatically mean bad credit.
        repayment_strength = 50

    # ---------------------------------------------------------
    # 4. EVIDENCE QUALITY
    # ---------------------------------------------------------

    evidence_quality = round(
        (verified_count / total_transactions) * 100
    )

    # ---------------------------------------------------------
    # 5. OVERALL AGRITRUST READINESS
    # ---------------------------------------------------------

    overall_readiness = round(
        market_activity * 0.30
        + cultivation_activity * 0.20
        + repayment_strength * 0.30
        + evidence_quality * 0.20
    )

    # ---------------------------------------------------------
    # 6. RISK LEVEL
    # ---------------------------------------------------------

    if overall_readiness >= 75:
        risk_level = "Low"
    elif overall_readiness >= 55:
        risk_level = "Medium"
    else:
        risk_level = "High"

    # ---------------------------------------------------------
    # 7. RECOMMENDED EXPOSURE
    # ---------------------------------------------------------

    if overall_readiness >= 85:
        recommended_exposure = 150000
    elif overall_readiness >= 75:
        recommended_exposure = 100000
    elif overall_readiness >= 65:
        recommended_exposure = 75000
    elif overall_readiness >= 55:
        recommended_exposure = 50000
    elif overall_readiness >= 40:
        recommended_exposure = 25000
    else:
        recommended_exposure = 0

    # ---------------------------------------------------------
    # 8. EXPLAINABILITY
    # ---------------------------------------------------------

    explanation = []
    risk_factors = []

    if market_activity >= 75:
        explanation.append(
            "Consistent crop-sale activity indicates strong market participation."
        )
    elif market_activity < 50:
        risk_factors.append(
            "Limited crop-sale activity is available."
        )

    if cultivation_activity >= 75:
        explanation.append(
            "Regular input purchases indicate active cultivation."
        )
    elif cultivation_activity < 50:
        risk_factors.append(
            "Limited cultivation activity is visible."
        )

    if repayment_strength >= 75:
        explanation.append(
            "Strong recorded repayment activity supports financial reliability."
        )
    elif repayment_count == 0:
        risk_factors.append(
            "No recorded repayment history is currently available."
        )

    if evidence_quality >= 80:
        explanation.append(
            "Most agricultural activity has verified evidence."
        )
    elif evidence_quality < 50:
        risk_factors.append(
            "A significant portion of available activity is unverified."
        )

    if not explanation:
        explanation.append(
            "Assessment is based on the farmer's available agricultural activity."
        )

    return {
        "market_activity": market_activity,
        "cultivation_activity": cultivation_activity,
        "repayment_strength": repayment_strength,
        "evidence_quality": evidence_quality,
        "overall_readiness": overall_readiness,
        "risk_level": risk_level,
        "recommended_exposure": recommended_exposure,
        "explanation": explanation,
        "risk_factors": risk_factors,
    }