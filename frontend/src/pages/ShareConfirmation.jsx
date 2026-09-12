import {
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sprout,
} from "lucide-react";

function ShareConfirmation({ onBack, onDashboard }) {
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

      <main className="confirmation-container">

        {/* Success */}
        <section className="confirmation-card">

          <div className="success-icon">
            <CheckCircle2 size={38} />
          </div>

          <p className="dashboard-label">
            SHARING COMPLETE
          </p>

          <h1>
            Your credit evidence was shared.
          </h1>

          <p className="confirmation-description">
            The Partner Lender can now view the agricultural
            signals you selected for this credit assessment.
          </p>

          <div className="shared-status">
            <ShieldCheck size={19} />

            <div>
              <strong>
                Selective disclosure active
              </strong>

              <span>
                Only the information you chose to share is available
                for this assessment.
              </span>
            </div>
          </div>

          {/* Shared summary */}
          <div className="shared-summary">

            <div className="summary-heading">
              <span>Shared for</span>
              <strong>Crop Input Credit</strong>
            </div>

            <div className="summary-row">
              <CheckCircle2 size={17} />
              <span>Credit Readiness</span>
            </div>

            <div className="summary-row">
              <CheckCircle2 size={17} />
              <span>Market Stability</span>
            </div>

            <div className="summary-row">
              <CheckCircle2 size={17} />
              <span>FPO Verification</span>
            </div>

            <div className="summary-row private">
              <Lock size={17} />
              <span>Raw Transactions remain private</span>
            </div>

          </div>

          <button
            className="confirmation-primary"
            onClick={onDashboard}
          >
            Return to Dashboard
          </button>

          <button
            className="confirmation-secondary"
            onClick={onBack}
          >
            Review Data Sharing
          </button>

        </section>

      </main>

    </div>
  );
}

export default ShareConfirmation;