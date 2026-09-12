def calculate_credit_intelligence(farmer):
    """
    Explainable AgriTrust credit-readiness engine.

    Uses verified agricultural transactions to calculate
    an alternative agricultural credit-readiness profile.
    """

    transactions = farmer.transactions or []

    # Only verified transactions are used as strong evidence
    verified = [
        t for t in transactions
        if t.verified in (1, True)
    ]

    total_transactions = len(transactions)
    verified_transactions = len(verified)

    # ---------------------------------------------------------
    # NO TRANSACTIONS
    # ---------------------------------------------------------
    if not transactions:
        return {
            "credit_readiness": 20,
            "risk_level": "High",
            "recommended_exposure": 15000,
            "suggested_purpose": "Crop Inputs",
            "production_stability": 0,
            "market_stability": 0,
            "agricultural_risk": 80,
            "fpo_strength": 50,
            "repayment_strength": 0,
            "verified_transactions": 0,
            "total_transactions": 0,
            "explanation": [
                "Insufficient agricultural activity is available for assessment."
            ],
            "risk_factors": [
                "No transaction history available."
            ]
        }

    # ---------------------------------------------------------
    # 1. MARKET ACTIVITY
    # ---------------------------------------------------------
    crop_sales = [
        t for t in verified
        if getattr(t.transaction_type, "value", t.transaction_type)
        == "crop_sale"
    ]

    if crop_sales:

        market_activity = min(100, len(crop_sales) * 20)

        total_sales = sum(
            float(t.amount or 0)
            for t in crop_sales
        )

        if total_sales >= 100000:
            market_activity = min(100, market_activity + 20)

    else:
        market_activity = 20

    # ---------------------------------------------------------
    # 2. REPAYMENT STRENGTH
    # ---------------------------------------------------------
    repayments = [
        t for t in verified
        if getattr(t.transaction_type, "value", t.transaction_type)
        == "loan_repayment"
    ]

    if repayments:

        repayment_strength = min(
            100,
            50 + len(repayments) * 15
        )

        if len(repayments) >= 3:
            repayment_strength = min(
                100,
                repayment_strength + 10
            )

    else:
        repayment_strength = 30

    # ---------------------------------------------------------
    # 3. PRODUCTION / CULTIVATION ACTIVITY
    # ---------------------------------------------------------
    input_purchases = [
        t for t in verified
        if getattr(t.transaction_type, "value", t.transaction_type)
        == "input_purchase"
    ]

    if input_purchases and crop_sales:
        production_stability = 80

    elif input_purchases or crop_sales:
        production_stability = 60

    else:
        production_stability = 30

    # ---------------------------------------------------------
    # 4. AGRICULTURAL RISK
    # ---------------------------------------------------------
    activity_types = {
        getattr(t.transaction_type, "value", t.transaction_type)
        for t in verified
    }

    agricultural_risk = 70

    if "crop_sale" in activity_types:
        agricultural_risk -= 15

    if "input_purchase" in activity_types:
        agricultural_risk -= 10

    if "loan_repayment" in activity_types:
        agricultural_risk -= 15

    if "subsidy_receipt" in activity_types:
        agricultural_risk -= 5

    agricultural_risk = max(10, agricultural_risk)

    # ---------------------------------------------------------
    # 5. FPO / COMMUNITY SIGNAL
    # ---------------------------------------------------------
    # Until actual FPO data is stored, keep this neutral.
    fpo_strength = 50

    # ---------------------------------------------------------
    # 6. FINAL CREDIT READINESS
    # ---------------------------------------------------------

    risk_score = 100 - agricultural_risk

    score = (
        production_stability * 0.25 +
        market_activity * 0.20 +
        repayment_strength * 0.25 +
        risk_score * 0.20 +
        fpo_strength * 0.10
    )

    score = round(
        max(0, min(100, score))
    )

    # ---------------------------------------------------------
    # 7. RISK CLASSIFICATION
    # ---------------------------------------------------------
    if score >= 75:
        risk_level = "Low"

    elif score >= 55:
        risk_level = "Medium"

    else:
        risk_level = "High"

    # ---------------------------------------------------------
    # 8. RECOMMENDED CREDIT EXPOSURE
    # ---------------------------------------------------------
    if score >= 80:
        exposure = 100000

    elif score >= 70:
        exposure = 75000

    elif score >= 60:
        exposure = 50000

    elif score >= 50:
        exposure = 30000

    else:
        exposure = 15000

    # ---------------------------------------------------------
    # 9. EXPLAINABILITY
    # ---------------------------------------------------------
    explanation = []
    risk_factors = []

    if production_stability >= 75:
        explanation.append(
            "Verified cultivation and sales activity indicate stable agricultural activity."
        )

    elif production_stability < 50:
        risk_factors.append(
            "Limited verified cultivation activity is available."
        )

    if market_activity >= 75:
        explanation.append(
            "Consistent verified crop-sale activity indicates stronger market participation."
        )

    elif market_activity < 50:
        risk_factors.append(
            "Limited verified market activity reduces confidence in income stability."
        )

    if repayment_strength >= 70:
        explanation.append(
            "Verified repayment activity provides a positive repayment signal."
        )

    elif repayment_strength < 50:
        risk_factors.append(
            "Limited verified repayment history is available."
        )

    if agricultural_risk <= 30:
        explanation.append(
            "Multiple verified agricultural activity signals reduce assessed risk."
        )

    elif agricultural_risk >= 60:
        risk_factors.append(
            "Agricultural risk remains elevated due to limited verified activity."
        )

    if verified_transactions < total_transactions:
        risk_factors.append(
            f"{total_transactions - verified_transactions} transaction(s) "
            "are not yet verified and therefore have limited scoring impact."
        )

    if not explanation:
        explanation.append(
            "The assessment is based on the farmer's available verified agricultural activity."
        )

    # ---------------------------------------------------------
    # 10. RETURN CREDIT INTELLIGENCE
    # ---------------------------------------------------------
    return {
        "credit_readiness": score,
        "risk_level": risk_level,
        "recommended_exposure": exposure,
        "suggested_purpose": "Crop Inputs",

        "production_stability": production_stability,
        "market_stability": market_activity,
        "agricultural_risk": agricultural_risk,
        "fpo_strength": fpo_strength,
        "repayment_strength": repayment_strength,

        "verified_transactions": verified_transactions,
        "total_transactions": total_transactions,

        "explanation": explanation,
        "risk_factors": risk_factors,
    }