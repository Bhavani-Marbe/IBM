import { useEffect, useState } from "react";

import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock3,
  Leaf,
  MapPin,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react";

function FarmerDashboard({
  onCreditReadiness,
  onActivity,
  onEvidence,
}) {
  const [farmer, setFarmer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const farmerId = "FRM-E54DDC4D";

  useEffect(() => {
    // Fetch farmer profile
    fetch(
      `http://127.0.0.1:8000/api/v1/farmers/${farmerId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch farmer details");
        }

        return response.json();
      })
      .then((data) => {
        setFarmer(data);
      })
      .catch((error) => {
        console.error("Error fetching farmer:", error);
        setError("Unable to load farmer details.");
      });

    // Fetch agricultural transactions
    fetch(
      `http://127.0.0.1:8000/api/v1/transactions/farmer/${farmerId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        return response.json();
      })
      .then((data) => {
        const transactionData = Array.isArray(data)
          ? data
          : data.transactions || data.data || [];

        setTransactions(transactionData);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  if (error) {
    return (
      <div className="farmer-page">
        <div className="dashboard-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="farmer-page">
        <div className="dashboard-container">
          <p>Loading farmer profile...</p>
        </div>
      </div>
    );
  }

  const initials = farmer.name
    ? farmer.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "RK";

  const verifiedTransactions = transactions.filter(
    (transaction) => transaction.verified
  ).length;

  return (
    <div className="farmer-page">

      {/* =====================================
          DASHBOARD HEADER
          ===================================== */}

      <header className="dashboard-header">

        <div className="brand">

          <div className="brand-icon">
            <Sprout size={22} />
          </div>

          <span>
            AgriTrust
          </span>

        </div>


        <div className="header-actions">

          <button
            className="icon-button"
            title="Notifications"
          >
            <Bell size={20} />
          </button>

          <div className="profile-avatar">
            {initials}
          </div>

        </div>

      </header>


      {/* =====================================
          MAIN CONTENT
          ===================================== */}

      <main className="dashboard-container">


        {/* =====================================
            WELCOME
            ===================================== */}

        <section className="welcome-section">

          <div>

            <p className="dashboard-label">
              FARMER DASHBOARD
            </p>

            <h1>
              Good morning,{" "}
              {farmer.name.split(" ")[0]} 👋
            </h1>

            <p>
              Your agricultural identity is building a
              stronger picture of your credit readiness.
            </p>

          </div>


          <div className="identity-status">

            <CheckCircle2 size={20} />

            Identity Active

          </div>

        </section>


        {/* =====================================
            FARMER IDENTITY CARD
            ===================================== */}

        <section
          className="profile-card"
          style={{
            background:
              "linear-gradient(135deg, #193d25, #315c3c)",
            color: "white",
            padding: "28px",
            borderRadius: "22px",
            marginBottom: "22px",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >

            <div className="profile-main">

              <div
                className="large-avatar"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                {initials}
              </div>


              <div>

                <p
                  className="profile-label"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  AGRITRUST FARMER IDENTITY
                </p>

                <h2>
                  {farmer.name}
                </h2>

                <div
                  className="location"
                  style={{
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <MapPin size={15} />

                  {farmer.district},{" "}
                  {farmer.state}

                </div>

              </div>

            </div>


            <div
              style={{
                background:
                  "rgba(255,255,255,0.12)",
                padding: "11px 15px",
                borderRadius: "10px",
                fontFamily: "monospace",
                fontSize: "13px",
                whiteSpace: "nowrap",
              }}
            >
              {farmer.farmer_id}
            </div>

          </div>


          {/* Identity details */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "15px",
              marginTop: "25px",
              paddingTop: "20px",
              borderTop:
                "1px solid rgba(255,255,255,0.15)",
            }}
          >

            <div>

              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  opacity: 0.6,
                  marginBottom: "5px",
                }}
              >
                FARM SIZE
              </span>

              <strong>
                {farmer.land_size_acres} acres
              </strong>

            </div>


            <div>

              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  opacity: 0.6,
                  marginBottom: "5px",
                }}
              >
                PRIMARY CROP
              </span>

              <strong>
                Onion
              </strong>

            </div>


            <div>

              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  opacity: 0.6,
                  marginBottom: "5px",
                }}
              >
                IDENTITY STATUS
              </span>

              <strong>
                ✓ Active
              </strong>

            </div>

          </div>

        </section>


        {/* =====================================
            FARMER PROFILE
            ===================================== */}

        <section className="profile-card">

          <div className="profile-main">

            <div className="large-avatar">

              {initials}

            </div>


            <div>

              <p className="profile-label">
                FARMER PROFILE
              </p>

              <h2>
                {farmer.name}
              </h2>

              <div className="location">

                <MapPin size={15} />

                {farmer.district},{" "}
                {farmer.state}

              </div>

            </div>

          </div>


          <div className="profile-details">

            <div>

              <span>
                Primary Crop
              </span>

              <strong>
                Onion
              </strong>

            </div>


            <div>

              <span>
                Farm Size
              </span>

              <strong>
                {farmer.land_size_acres} acres
              </strong>

            </div>


            <div>

              <span>
                FPO
              </span>

              <strong>
                Nashik Farmers FPO
              </strong>

            </div>

          </div>

        </section>


        {/* =====================================
            ACTIVITY SUMMARY
            ===================================== */}

        <section className="evidence-section">

          <div className="section-title">

            <div>

              <p className="dashboard-label">
                AGRICULTURAL ACTIVITY
              </p>

              <h2>
                Your activity record
              </h2>

            </div>


            <span className="verified-count">

              {verifiedTransactions} of{" "}
              {transactions.length} verified

            </span>

          </div>


          <div className="evidence-grid">


            {/* Total Activity */}

            <div className="evidence-card">

              <div className="evidence-icon">

                <Sprout size={24} />

              </div>

              <div>

                <h3>
                  Activity
                </h3>

                <p>
                  {transactions.length} records
                </p>

              </div>

            </div>


            {/* Market */}

            <div className="evidence-card">

              <div className="evidence-icon">

                <TrendingUp size={24} />

              </div>

              <div>

                <h3>
                  Market Activity
                </h3>

                <p>
                  Crop sales recorded
                </p>

              </div>

            </div>


            {/* Repayment */}

            <div className="evidence-card">

              <div className="evidence-icon">

                <ShieldCheck size={24} />

              </div>

              <div>

                <h3>
                  Repayment
                </h3>

                <p>
                  Verified financial activity
                </p>

              </div>

            </div>


            {/* FPO */}

            <div className="evidence-card">

              <div className="evidence-icon">

                <Users size={24} />

              </div>

              <div>

                <h3>
                  FPO Participation
                </h3>

                <p>
                  Membership verified
                </p>

              </div>

            </div>

          </div>


          {/* View activity button */}

          {onActivity && (

            <button
              className="continue-button"
              onClick={onActivity}
              style={{
                marginTop: "18px",
              }}
            >

              View Full Activity History

              <ArrowRight size={18} />

            </button>

          )}

        </section>


        {/* =====================================
            VERIFIED EVIDENCE
            ===================================== */}

        <section className="evidence-section">

          <div className="section-title">

            <div>

              <p className="dashboard-label">
                VERIFIED EVIDENCE
              </p>

              <h2>
                Your agricultural evidence
              </h2>

            </div>

            <span className="verified-count">
              4 of 4 verified
            </span>

          </div>


          <div className="evidence-grid">


            {/* Production */}

            <div className="evidence-card">

              <div className="evidence-icon">

                <Sprout size={24} />

              </div>

              <div>

                <h3>
                  Production
                </h3>

                <p>
                  Crop activity verified
                </p>

              </div>

              <CheckCircle2
                className="check-icon"
                size={20}
              />

            </div>


            {/* Market */}

            <div className="evidence-card">

              <div className="evidence-icon">

                <Leaf size={24} />

              </div>

              <div>

                <h3>
                  Market Activity
                </h3>

                <p>
                  Mandi activity verified
                </p>

              </div>

              <CheckCircle2
                className="check-icon"
                size={20}
              />

            </div>


            {/* Insurance */}

            <div className="evidence-card">

              <div className="evidence-icon">

                <ShieldCheck size={24} />

              </div>

              <div>

                <h3>
                  Insurance
                </h3>

                <p>
                  Coverage history verified
                </p>

              </div>

              <CheckCircle2
                className="check-icon"
                size={20}
              />

            </div>


            {/* FPO */}

            <div className="evidence-card">

              <div className="evidence-icon">

                <Users size={24} />

              </div>

              <div>

                <h3>
                  FPO Participation
                </h3>

                <p>
                  Membership verified
                </p>

              </div>

              <CheckCircle2
                className="check-icon"
                size={20}
              />

            </div>

          </div>

        </section>


        {/* =====================================
            EVIDENCE REQUESTS
            ===================================== */}

        {onEvidence && (

          <section
            className="readiness-banner"
            style={{
              marginBottom: "22px",
            }}
          >

            <div className="readiness-icon">

              <ShieldCheck size={28} />

            </div>


            <div className="readiness-content">

              <p>
                DATA CONTROL
              </p>

              <h2>
                Evidence Requests
              </h2>

              <span>
                Review requests from lenders and decide
                what agricultural evidence you want to share.
              </span>

            </div>


            <button
              className="readiness-button"
              onClick={onEvidence}
            >

              View Requests

              <ArrowRight size={18} />

            </button>

          </section>

        )}


        {/* =====================================
            NEXT STEP
            ===================================== */}

        <section className="readiness-banner">

          <div className="readiness-icon">

            <ShieldCheck size={28} />

          </div>


          <div className="readiness-content">

            <p>
              YOUR NEXT STEP
            </p>

            <h2>
              See your Credit Readiness
            </h2>

            <span>
              Understand what your agricultural activity
              says about your financial readiness.
            </span>

          </div>


          <button
            className="readiness-button"
            onClick={onCreditReadiness}
          >

            View Credit Readiness

            <ArrowRight size={18} />

          </button>

        </section>


        {/* =====================================
            PRIVACY MESSAGE
            ===================================== */}

        <section
          style={{
            marginTop: "20px",
            padding: "18px 20px",
            background: "#eef5ed",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >

          <ShieldCheck size={20} />

          <div>

            <strong>
              You own your agricultural credit identity.
            </strong>

            <p
              style={{
                margin: "4px 0 0",
                fontSize: "13px",
                opacity: 0.65,
              }}
            >
              Share only the evidence you choose with
              lenders.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default FarmerDashboard;