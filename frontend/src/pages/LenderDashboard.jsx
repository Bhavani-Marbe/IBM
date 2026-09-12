import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  Search,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";

function LenderDashboard({ onBack }) {
  const [farmer, setFarmer] = useState(null);
  const [intelligence, setIntelligence] = useState(null);
  const [farmerId, setFarmerId] = useState("FRM-E54DDC4D");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFarmer = async () => {
    setLoading(true);
    setError("");

    try {
      const farmerResponse = await fetch(
        `http://127.0.0.1:8000/api/v1/farmers/${farmerId}`
      );

      if (!farmerResponse.ok) {
        throw new Error("Farmer not found");
      }

      const farmerData = await farmerResponse.json();

      const intelligenceResponse = await fetch(
        `http://127.0.0.1:8000/api/v1/credit-intelligence/${farmerId}`
      );

      if (!intelligenceResponse.ok) {
        throw new Error("Credit intelligence unavailable");
      }

      const intelligenceData = await intelligenceResponse.json();

      setFarmer(farmerData);
      setIntelligence(intelligenceData);

    } catch (err) {
      console.error(err);
      setFarmer(null);
      setIntelligence(null);
      setError("Unable to find farmer or credit intelligence.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchFarmer();
  }, []);

  const getStrengthLabel = (value) => {
    if (value >= 75) return "High";
    if (value >= 55) return "Medium";
    return "Low";
  };

  return (
    <div className="credit-page">

      <header className="dashboard-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="brand">

          <div className="brand-icon">
            <Sprout size={22} />
          </div>

          <span>AgriTrust</span>

        </div>

        <div className="profile-avatar">
          PB
        </div>

      </header>

      <main className="credit-container">

        <section className="credit-heading">

          <p className="dashboard-label">
            LENDER INTELLIGENCE PORTAL
          </p>

          <h1>
            Agricultural Credit Intelligence
          </h1>

          <p>
            Search a farmer and review explainable agricultural
            credit-readiness evidence.
          </p>

        </section>

        {/* Search */}
        <section className="recommendation-card">

          <div style={{ width: "100%" }}>

            <p>
              SEARCH FARMER
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >

              <input
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
                placeholder="Enter Farmer ID"
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "15px",
                }}
              />

              <button
                className="share-button"
                onClick={searchFarmer}
              >
                <Search size={18} />
                Search
              </button>

            </div>

          </div>

        </section>

        {loading && (
          <p>
            Loading farmer intelligence...
          </p>
        )}

        {error && (
          <p>
            {error}
          </p>
        )}

        {farmer && intelligence && (

          <>
            {/* Farmer profile */}
            <section className="profile-card">

              <div className="profile-main">

                <div className="large-avatar">
                  {farmer.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div>

                  <p className="profile-label">
                    FARMER
                  </p>

                  <h2>
                    {farmer.name}
                  </h2>

                  <div className="location">
                    {farmer.district}, {farmer.state}
                  </div>

                </div>

              </div>

              <div className="profile-details">

                <div>
                  <span>Farmer ID</span>
                  <strong>{farmer.farmer_id}</strong>
                </div>

                <div>
                  <span>Farm Size</span>
                  <strong>
                    {farmer.land_size_acres} acres
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>Active</strong>
                </div>

              </div>

            </section>

            {/* Main score */}
            <section className="score-panel">

              <div className="large-score">

                <div className="large-score-circle">

                  <div>
                    <strong>
                      {intelligence.credit_readiness}
                    </strong>

                    <span>
                      /100
                    </span>
                  </div>

                </div>

                <div>

                  <p>
                    Alternative Credit Readiness
                  </p>

                  <h2>
                    {intelligence.risk_level === "low"
                      ? "Low Risk"
                      : intelligence.risk_level === "medium"
                      ? "Moderate Risk"
                      : "High Risk"}
                  </h2>

                  <span>
                    Explainable agricultural activity assessment
                  </span>

                </div>

              </div>

              <div className="risk-badge">
                <ShieldCheck size={17} />
                Decision Support
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
                    Agricultural evidence
                  </h2>
                </div>

              </div>

              <div className="signal-grid">

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
                      />
                    </div>

                  </div>

                </div>

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
                      />
                    </div>

                  </div>

                </div>

                <div className="credit-signal-card">

                  <div className="credit-signal-icon">
                    <ShieldCheck size={22} />
                  </div>

                  <div className="credit-signal-info">

                    <span>
                      Agricultural Risk
                    </span>

                    <strong>
                      {intelligence.agricultural_risk >= 70
                        ? "High"
                        : intelligence.agricultural_risk >= 50
                        ? "Medium"
                        : "Low"}
                    </strong>

                    <div className="signal-bar">
                      <div
                        style={{
                          width: `${intelligence.agricultural_risk}%`,
                        }}
                      />
                    </div>

                  </div>

                </div>

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
                      />
                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* Recommendation */}
            <section className="recommendation-card">

              <div>

                <p>
                  ILLUSTRATIVE EXPOSURE
                </p>

                <h2>
                  ₹
                  {Number(
                    intelligence.recommended_exposure
                  ).toLocaleString("en-IN")}
                </h2>

                <span>
                  Suggested starting exposure for lender
                  consideration.
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

            {/* Explainability */}
            <section className="explanation-card">

              <div className="explanation-header">

                <div className="explanation-icon">
                  <Brain size={22} />
                </div>

                <div>
                  <p>
                    EXPLAINABLE INTELLIGENCE
                  </p>

                  <h2>
                    Why this assessment?
                  </h2>
                </div>

              </div>

              <div className="explanation-list">

                {intelligence.explanation?.map(
                  (item, index) => (
                    <div key={index}>
                      <CheckCircle2 size={18} />
                      <span>{item}</span>
                    </div>
                  )
                )}

                {intelligence.risk_factors?.map(
                  (item, index) => (
                    <div
                      className="risk-explanation"
                      key={`risk-${index}`}
                    >
                      <ShieldCheck size={18} />
                      <span>{item}</span>
                    </div>
                  )
                )}

              </div>

            </section>

          </>

        )}

      </main>

    </div>
  );
}

export default LenderDashboard;