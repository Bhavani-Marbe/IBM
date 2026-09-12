import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";

function CreditReadiness({ onBack, onDataControl }) {
  const [intelligence, setIntelligence] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/api/v1/credit-intelligence/FRM-E54DDC4D"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch credit intelligence");
        }

        return response.json();
      })
      .then((data) => {
        console.log("AgriTrust Intelligence:", data);
        setIntelligence(data);
      })
      .catch((error) => {
        console.error("Error fetching credit intelligence:", error);
        setError("Unable to load credit intelligence.");
      });
  }, []);

  if (error) {
    return (
      <div className="credit-page">
        <div className="credit-container">
          <p>{error}</p>

          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!intelligence) {
    return (
      <div className="credit-page">
        <div className="credit-container">
          <p>Loading credit intelligence...</p>
        </div>
      </div>
    );
  }

  // Convert the backend score into a percentage for the UI.
  const score = intelligence.credit_readiness;

  // Agricultural risk is represented by the backend as a risk factor:
  // lower is better. Therefore the UI strength is its inverse.
  const agriculturalRiskStrength =
    100 - intelligence.agricultural_risk;

  const getStrengthLabel = (value) => {
    if (value >= 75) return "High";
    if (value >= 55) return "Medium";
    return "Low";
  };

  const getRiskLabel = (riskLevel) => {
    if (riskLevel === "low") return "Low Agricultural Risk";
    if (riskLevel === "medium") return "Moderate Agricultural Risk";
    return "High Agricultural Risk";
  };

  const initials = intelligence.farmer_name
    ? intelligence.farmer_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "RK";

  return (
    <div className="credit-page">

      {/* Header */}
      <header className="dashboard-header">
        <div className="brand">
          <div className="brand-icon">
            <Sprout size={22} />
          </div>

          <span>AgriTrust</span>
        </div>

        <div className="header-actions">
          <div className="profile-avatar">
            {initials}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="credit-container">

        <button
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        {/* Heading */}
        <section className="credit-heading">
          <p className="dashboard-label">
            AGRITRUST CREDIT INTELLIGENCE
          </p>

          <h1>
            Your Credit Readiness
          </h1>

          <p>
            An explainable assessment based on your verified
            agricultural activity.
          </p>
        </section>

        {/* Score */}
        <section className="score-panel">

          <div className="large-score">

            <div className="large-score-circle">
              <div>
                <strong>{score}</strong>
                <span>/100</span>
              </div>
            </div>

            <div>
              <p>Credit Readiness</p>

              <h2>
                {getStrengthLabel(score)} Readiness
              </h2>

              <span>
                Based on your agricultural activity and
                verified transaction history.
              </span>
            </div>

          </div>

          <div className="risk-badge">
            <CheckCircle2 size={17} />

            {getRiskLabel(intelligence.risk_level)}
          </div>

        </section>

        {/* Signals */}
        <section className="credit-section">

          <div className="credit-section-heading">
            <div>
              <p className="dashboard-label">
                SIGNAL ANALYSIS
              </p>

              <h2>
                What is driving your assessment?
              </h2>
            </div>
          </div>

          <div className="signal-grid">

            {/* Production */}
            <div className="credit-signal-card">

              <div className="credit-signal-icon">
                <Sprout size={22} />
              </div>

              <div className="credit-signal-info">

                <span>
                  Production Stability
                </span>

                <strong>
                  {getStrengthLabel(
                    intelligence.production_stability
                  )}
                </strong>

                <div className="signal-bar">
                  <div
                    style={{
                      width: `${intelligence.production_stability}%`,
                    }}
                  ></div>
                </div>

              </div>

            </div>

            {/* Market */}
            <div className="credit-signal-card">

              <div className="credit-signal-icon">
                <TrendingUp size={22} />
              </div>

              <div className="credit-signal-info">

                <span>
                  Market Stability
                </span>

                <strong>
                  {getStrengthLabel(
                    intelligence.market_stability
                  )}
                </strong>

                <div className="signal-bar">
                  <div
                    style={{
                      width: `${intelligence.market_stability}%`,
                    }}
                  ></div>
                </div>

              </div>

            </div>

            {/* Agricultural Risk */}
            <div className="credit-signal-card">

              <div className="credit-signal-icon">
                <ShieldCheck size={22} />
              </div>

              <div className="credit-signal-info">

                <span>
                  Agricultural Risk
                </span>

                <strong>
                  {getStrengthLabel(
                    agriculturalRiskStrength
                  )}
                </strong>

                <div className="signal-bar">
                  <div
                    style={{
                      width: `${agriculturalRiskStrength}%`,
                    }}
                  ></div>
                </div>

              </div>

            </div>

            {/* FPO */}
            <div className="credit-signal-card">

              <div className="credit-signal-icon">
                <Users size={22} />
              </div>

              <div className="credit-signal-info">

                <span>
                  FPO Strength
                </span>

                <strong>
                  {getStrengthLabel(
                    intelligence.fpo_strength
                  )}
                </strong>

                <div className="signal-bar">
                  <div
                    style={{
                      width: `${intelligence.fpo_strength}%`,
                    }}
                  ></div>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Repayment Strength */}
        <section className="credit-section">

          <div className="credit-section-heading">
            <div>
              <p className="dashboard-label">
                REPAYMENT SIGNAL
              </p>

              <h2>
                Repayment Strength
              </h2>
            </div>
          </div>

          <div className="credit-signal-card">

            <div className="credit-signal-icon">
              <ShieldCheck size={22} />
            </div>

            <div className="credit-signal-info">

              <span>
                Repayment Strength
              </span>

              <strong>
                {getStrengthLabel(
                  intelligence.repayment_strength
                )}
              </strong>

              <div className="signal-bar">
                <div
                  style={{
                    width: `${intelligence.repayment_strength}%`,
                  }}
                ></div>
              </div>

            </div>

          </div>

        </section>

        {/* Explanation */}
        <section className="explanation-card">

          <div className="explanation-header">

            <div className="explanation-icon">
              <Brain size={22} />
            </div>

            <div>
              <p>EXPLAINABLE AI</p>
              <h2>Why this assessment?</h2>
            </div>

          </div>

          <div className="explanation-list">

            {intelligence.explanation &&
              intelligence.explanation.map((item, index) => (
                <div key={index}>
                  <CheckCircle2 size={18} />

                  <span>
                    {item}
                  </span>
                </div>
              ))}

            {intelligence.risk_factors &&
              intelligence.risk_factors.map((item, index) => (
                <div
                  className="risk-explanation"
                  key={`risk-${index}`}
                >
                  <Leaf size={18} />

                  <span>
                    {item}
                  </span>
                </div>
              ))}

          </div>

        </section>

        {/* Verification Summary */}
        <section className="recommendation-card">

          <div>
            <p>
              VERIFIED ACTIVITY
            </p>

            <h2>
              {intelligence.verified_transactions}
              {" "}
              /{" "}
              {intelligence.total_transactions}
            </h2>

            <span>
              Verified agricultural transactions currently
              supporting your credit intelligence profile.
            </span>
          </div>

          <div className="recommendation-purpose">

            <span>
              Potential purpose
            </span>

            <strong>
              {intelligence.suggested_purpose}
            </strong>

          </div>

        </section>

        {/* Recommendation */}
        <section className="recommendation-card">

          <div>

            <p>
              ILLUSTRATIVE CREDIT EXPOSURE
            </p>

            <h2>
              ₹
              {Number(
                intelligence.recommended_exposure
              ).toLocaleString("en-IN")}
            </h2>

            <span>
              Suggested starting exposure based on the
              current agricultural profile.
            </span>

          </div>

          <div className="recommendation-purpose">

            <span>
              Potential purpose
            </span>

            <strong>
              {intelligence.suggested_purpose}
            </strong>

          </div>

        </section>

        {/* Continue */}
        <button
          className="continue-button"
          onClick={onDataControl}
        >
          Manage Data Sharing

          <ChevronRight size={18} />
        </button>

      </main>

    </div>
  );
}

export default CreditReadiness;