import { useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Lock,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";

function DataControl({ onBack, onShared }) {
      const [sharedData, setSharedData] = useState({
    creditReadiness: true,
    production: true,
    market: true,
    fpo: true,
  });

  const toggleData = (key) => {
    setSharedData((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };
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

      <main className="credit-container">

        {/* Back */}
        <button
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft size={17} />
          Back to Credit Readiness
        </button>

        {/* Heading */}
        <section className="credit-heading">

          <p className="dashboard-label">
            DATA CONTROL
          </p>

          <h1>
            Your data. Your choice.
          </h1>

          <p>
            Choose exactly what information you want to share
            with the lender.
          </p>

        </section>

        {/* Consent banner */}
        <section className="consent-banner">

          <div className="consent-icon">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h3>
              Selective disclosure
            </h3>

            <p>
              AgriTrust shares relevant credit evidence instead
              of exposing your entire agricultural data history.
            </p>
          </div>

        </section>

        {/* Lender */}
        <section className="sharing-section">

          <div className="sharing-header">
            <div>
              <p className="dashboard-label">
                SHARING WITH
              </p>

              <h2>
                Partner Lender
              </h2>
            </div>

            <span className="purpose-badge">
              Crop Input Credit
            </span>
          </div>

          {/* Shared data */}
          <div className="data-group">

            <div className="data-group-heading">
              <div>
                <h3>Information to share</h3>
                <span>
                  These signals help explain your credit readiness.
                </span>
              </div>

              <span className="selected-label">
                SELECTED
              </span>
            </div>

            <div className="data-item">

              <div className="data-icon">
                <ShieldCheck size={20} />
              </div>

              <div className="data-text">
                <strong>Credit Readiness</strong>
                <span>
                  Your overall agricultural credit-readiness assessment
                </span>
              </div>

              <button
  className={`consent-toggle ${
    sharedData.creditReadiness ? "active" : ""
  }`}
  onClick={() => toggleData("creditReadiness")}
  aria-label="Toggle Credit Readiness sharing"
>
  <span></span>
</button>

            </div>

            <div className="data-item">

              <div className="data-icon">
                <Sprout size={20} />
              </div>

              <div className="data-text">
                <strong>Production Evidence</strong>
                <span>
                  Verified crop activity and production stability
                </span>
              </div>

              <button
  className={`consent-toggle ${
    sharedData.production ? "active" : ""
  }`}
  onClick={() => toggleData("production")}
  aria-label="Toggle Production Evidence sharing"
>
  <span></span>
</button>

            </div>

            <div className="data-item">

              <div className="data-icon">
                <TrendingUp size={20} />
              </div>

              <div className="data-text">
                <strong>Market Stability</strong>
                <span>
                  Relevant agricultural market activity signals
                </span>
              </div>

              <button
  className={`consent-toggle ${
    sharedData.market ? "active" : ""
  }`}
  onClick={() => toggleData("market")}
  aria-label="Toggle Market Stability sharing"
>
  <span></span>
</button>

            </div>

            <div className="data-item">

              <div className="data-icon">
                <Users size={20} />
              </div>

              <div className="data-text">
                <strong>FPO Verification</strong>
                <span>
                  Verified participation in the farmer organization
                </span>
              </div>

              <button
  className={`consent-toggle ${
    sharedData.fpo ? "active" : ""
  }`}
  onClick={() => toggleData("fpo")}
  aria-label="Toggle FPO Verification sharing"
>
  <span></span>
</button>

            </div>

          </div>

          {/* Not shared */}
          <div className="data-group not-shared">

            <div className="data-group-heading">
              <div>
                <h3>Not shared</h3>
                <span>
                  Information that remains private.
                </span>
              </div>

              <span className="private-label">
                PRIVATE
              </span>
            </div>

            <div className="data-item private-item">

              <div className="data-icon private-icon">
                <Lock size={20} />
              </div>

              <div className="data-text">
                <strong>Raw Agricultural Transactions</strong>
                <span>
                  Detailed underlying transaction records remain private.
                </span>
              </div>

              <Lock size={18} className="lock-icon" />

            </div>

            <div className="data-item private-item">

              <div className="data-icon private-icon">
                <Lock size={20} />
              </div>

              <div className="data-text">
                <strong>Unnecessary Personal Data</strong>
                <span>
                  Information that is not required for this assessment.
                </span>
              </div>

              <Lock size={18} className="lock-icon" />

            </div>

          </div>

        </section>

        {/* Consent */}
        <section className="final-consent">

          <div className="consent-check">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <strong>
              I understand what I'm sharing.
            </strong>

            <span>
              I can review or change my sharing choices later.
            </span>
          </div>

        </section>

        <button
          className="share-button"
          onClick={onShared}
        >
          Confirm & Share
          <ChevronRight size={18} />
        </button>

        <p className="privacy-note">
          🔒 AgriTrust uses consent-based selective disclosure.
        </p>

      </main>

    </div>
  );
}

export default DataControl;