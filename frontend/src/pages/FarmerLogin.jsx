import { ArrowLeft, ArrowRight, LockKeyhole, Sprout } from "lucide-react";
import { useState } from "react";

function FarmerLogin({ onBack, onLogin }) {
  const [farmerId, setFarmerId] = useState("FRM-E54DDC4D");
  const [phone, setPhone] = useState("9876543210");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!farmerId || !phone) {
      return;
    }

    onLogin(farmerId);
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
            FARMER ACCESS
          </p>

          <h1>
            Welcome back
          </h1>

          <p>
            Access your farmer-owned agricultural credit identity.
          </p>
        </section>

        <section className="explanation-card">

          <div className="explanation-header">
            <div className="explanation-icon">
              <LockKeyhole size={22} />
            </div>

            <div>
              <p>SECURE ACCESS</p>
              <h2>Farmer Login</h2>
            </div>
          </div>

          <form onSubmit={handleLogin}>

            <div className="data-text" style={{ marginBottom: "20px" }}>
              <strong>Farmer ID</strong>

              <input
                type="text"
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
                placeholder="Enter Farmer ID"
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

              <strong>Mobile Number</strong>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter mobile number"
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
              Continue
              <ArrowRight size={18} />
            </button>

          </form>

        </section>

        <p className="privacy-note">
          Demo access: FRM-E54DDC4D / 9876543210
        </p>

      </main>

    </div>
  );
}

export default FarmerLogin;