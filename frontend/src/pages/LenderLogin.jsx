import {
  ArrowLeft,
  ArrowRight,
  Building2,
  LockKeyhole,
  Sprout,
} from "lucide-react";

import { useState } from "react";

function LenderLogin({ onBack, onLogin }) {
  const [organization, setOrganization] = useState("Partner Bank");
  const [lenderId, setLenderId] = useState("LND-001");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!organization || !lenderId) {
      return;
    }

    onLogin(lenderId);
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

        <div></div>

      </header>

      <main className="credit-container">

        <section className="credit-heading">

          <p className="dashboard-label">
            LENDER ACCESS
          </p>

          <h1>
            Lender Portal
          </h1>

          <p>
            Use agricultural credit intelligence to make
            better-informed lending decisions.
          </p>

        </section>

        <section className="explanation-card">

          <div className="explanation-header">

            <div className="explanation-icon">
              <Building2 size={22} />
            </div>

            <div>
              <p>SECURE ACCESS</p>
              <h2>Lender Login</h2>
            </div>

          </div>

          <form onSubmit={handleLogin}>

            <div className="data-text" style={{ marginBottom: "20px" }}>

              <strong>
                Organization
              </strong>

              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Organization name"
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "8px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />

            </div>

            <div className="data-text">

              <strong>
                Lender ID
              </strong>

              <input
                type="text"
                value={lenderId}
                onChange={(e) => setLenderId(e.target.value)}
                placeholder="Enter lender ID"
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "8px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />

            </div>

            <button
              type="submit"
              className="continue-button"
              style={{ marginTop: "28px" }}
            >
              Enter Lender Portal
              <ArrowRight size={18} />
            </button>

          </form>

        </section>

        <p className="privacy-note">
          Demo access: Partner Bank / LND-001
        </p>

      </main>

    </div>
  );
}

export default LenderLogin;