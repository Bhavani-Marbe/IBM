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

function CreditReadiness({ onBack }) {
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
            RK
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
                <strong>82</strong>
                <span>/100</span>
              </div>
            </div>

            <div>
              <p>Credit Readiness</p>
              <h2>Good Readiness</h2>
              <span>
                Your agricultural activity shows
                positive credit signals.
              </span>
            </div>

          </div>

          <div className="risk-badge">
            <CheckCircle2 size={17} />
            Moderate Agricultural Risk
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

            <div className="credit-signal-card">
              <div className="credit-signal-icon">
                <Sprout size={22} />
              </div>

              <div className="credit-signal-info">
                <span>Production Stability</span>
                <strong>High</strong>

                <div className="signal-bar">
                  <div style={{ width: "86%" }}></div>
                </div>
              </div>
            </div>

            <div className="credit-signal-card">
              <div className="credit-signal-icon">
                <TrendingUp size={22} />
              </div>

              <div className="credit-signal-info">
                <span>Market Stability</span>
                <strong>High</strong>

                <div className="signal-bar">
                  <div style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>

            <div className="credit-signal-card">
              <div className="credit-signal-icon">
                <ShieldCheck size={22} />
              </div>

              <div className="credit-signal-info">
                <span>Agricultural Risk</span>
                <strong>Medium</strong>

                <div className="signal-bar">
                  <div style={{ width: "62%" }}></div>
                </div>
              </div>
            </div>

            <div className="credit-signal-card">
              <div className="credit-signal-icon">
                <Users size={22} />
              </div>

              <div className="credit-signal-info">
                <span>FPO Strength</span>
                <strong>High</strong>

                <div className="signal-bar">
                  <div style={{ width: "88%" }}></div>
                </div>
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

            <div>
              <CheckCircle2 size={18} />
              <span>
                Stable agricultural production provides
                a positive consistency signal.
              </span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>
                Consistent market activity strengthens
                the overall agricultural profile.
              </span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>
                Verified FPO participation adds supporting
                evidence to the identity.
              </span>
            </div>

            <div className="risk-explanation">
              <Leaf size={18} />
              <span>
                Agricultural conditions can change with
                weather and market volatility.
              </span>
            </div>

          </div>

        </section>

        {/* Recommendation */}
        <section className="recommendation-card">

          <div>
            <p>ILLUSTRATIVE CREDIT EXPOSURE</p>

            <h2>₹1,00,000</h2>

            <span>
              Suggested starting exposure based on the
              current demonstration profile.
            </span>
          </div>

          <div className="recommendation-purpose">
            <span>Potential purpose</span>
            <strong>Crop Inputs</strong>
          </div>

        </section>

        {/* Continue */}
        <button className="continue-button">
          Manage Data Sharing
          <ChevronRight size={18} />
        </button>

      </main>

    </div>
  );
}

export default CreditReadiness;