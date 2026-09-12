import { useState } from "react";

import FarmerLogin from "./pages/FarmerLogin";
import LenderLogin from "./pages/LenderLogin";
import FarmerDashboard from "./pages/FarmerDashboard";
import LenderDashboard from "./pages/LenderDashboard";
import CreditReadiness from "./pages/CreditReadiness";
import DataControl from "./pages/DataControl";
import ShareConfirmation from "./pages/ShareConfirmation";
import ActivityHistory from "./pages/ActivityHistory";
import EvidenceRequests from "./pages/EvidenceRequests";

import "./index.css";

function App() {
  const [page, setPage] = useState("landing");
  const [evidenceRole, setEvidenceRole] = useState(null);

  // ---------------- LANDING PAGE ----------------
  if (page === "landing") {
    return (
      <div className="app">
        <header
          style={{
            padding: "20px 7%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
            background: "#ffffff",
          }}
        >
          <button
            onClick={() => setPage("landing")}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "22px",
              fontWeight: "800",
              color: "#166534",
            }}
          >
            🌱 AgriTrust
          </button>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setPage("farmerLogin")}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "1px solid #166534",
                background: "#ffffff",
                color: "#166534",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Farmer
            </button>

            <button
              onClick={() => setPage("lenderLogin")}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "none",
                background: "#166534",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Lender
            </button>
          </div>
        </header>

        <main
          style={{
            minHeight: "calc(100vh - 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 7%",
            background:
              "linear-gradient(135deg, #f0fdf4 0%, #ffffff 55%, #ecfdf5 100%)",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: "50px",
              alignItems: "center",
            }}
          >
            <section>
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "#dcfce7",
                  color: "#166534",
                  fontSize: "14px",
                  fontWeight: "700",
                  marginBottom: "20px",
                }}
              >
                FARMER-OWNED CREDIT IDENTITY
              </div>

              <h1
                style={{
                  fontSize: "52px",
                  lineHeight: "1.05",
                  margin: "0 0 20px",
                  color: "#14532d",
                }}
              >
                A farmer should own their credit identity.
              </h1>

              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "1.6",
                  color: "#475569",
                  maxWidth: "680px",
                  marginBottom: "30px",
                }}
              >
                AgriTrust converts verified agricultural activity into an
                explainable credit-readiness profile while giving farmers
                control over what lenders can see.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setPage("farmerLogin")}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#166534",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  Get Started as Farmer →
                </button>

                <button
                  onClick={() => setPage("lenderLogin")}
                  style={{
                    padding: "14px 24px",
                    borderRadius: "10px",
                    border: "1px solid #166534",
                    background: "#ffffff",
                    color: "#166534",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  Lender Portal
                </button>
              </div>
            </section>

            <section
              style={{
                background: "#ffffff",
                borderRadius: "22px",
                padding: "30px",
                boxShadow: "0 20px 50px rgba(22, 101, 52, 0.12)",
                border: "1px solid #dcfce7",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "#64748b",
                      fontWeight: "700",
                    }}
                  >
                    DEMO FARMER
                  </p>

                  <h3
                    style={{
                      margin: "6px 0 0",
                      color: "#14532d",
                    }}
                  >
                    Ramesh Kumar
                  </h3>
                </div>

                <span
                  style={{
                    padding: "6px 10px",
                    background: "#dcfce7",
                    color: "#166534",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  VERIFIED
                </span>
              </div>

              <div
                style={{
                  textAlign: "center",
                  padding: "25px 10px",
                  borderRadius: "16px",
                  background: "#f0fdf4",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "52px",
                    fontWeight: "800",
                    color: "#166534",
                  }}
                >
                  52<span style={{ fontSize: "24px" }}>/100</span>
                </div>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#64748b",
                    fontWeight: "600",
                  }}
                >
                  Developing Credit Readiness
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {[
                  ["Production", "Medium"],
                  ["Market", "Low"],
                  ["Repayment", "Medium"],
                  ["FPO Strength", "Low"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: "14px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#64748b",
                        marginBottom: "5px",
                      }}
                    >
                      {label}
                    </div>

                    <strong style={{ color: "#334155" }}>{value}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  // ---------------- FARMER LOGIN ----------------
  if (page === "farmerLogin") {
    return (
      <FarmerLogin
        onLogin={() => setPage("farmer")}
        onBack={() => setPage("landing")}
      />
    );
  }

  // ---------------- LENDER LOGIN ----------------
  if (page === "lenderLogin") {
    return (
      <LenderLogin
        onLogin={() => setPage("lender")}
        onBack={() => setPage("landing")}
      />
    );
  }

  // ---------------- FARMER DASHBOARD ----------------
  if (page === "farmer") {
    return (
      <FarmerDashboard
        onCreditReadiness={() => setPage("credit")}
        onActivity={() => setPage("activity")}
      />
    );
  }

  // ---------------- CREDIT READINESS ----------------
  if (page === "credit") {
    return (
      <CreditReadiness
        onBack={() => setPage("farmer")}
        onDataControl={() => setPage("data")}
        onActivity={() => setPage("activity")}
      />
    );
  }

  // ---------------- ACTIVITY HISTORY ----------------
  if (page === "activity") {
    return (
      <ActivityHistory
        onBack={() => setPage("credit")}
      />
    );
  }

  // ---------------- DATA CONTROL ----------------
  if (page === "data") {
    return (
      <DataControl
        onBack={() => setPage("credit")}
        onShared={() => setPage("shared")}
      />
    );
  }

  // ---------------- SHARE CONFIRMATION ----------------
  if (page === "shared") {
    return (
      <ShareConfirmation
        onBack={() => setPage("data")}
        onDashboard={() => setPage("farmer")}
      />
    );
  }

  // ---------------- LENDER DASHBOARD ----------------
  if (page === "lender") {
    return (
      <LenderDashboard
        onBack={() => setPage("landing")}
        onEvidence={() => {
          setEvidenceRole("lender");
          setPage("evidence");
        }}
      />
    );
  }

  // ---------------- EVIDENCE REQUESTS ----------------
  if (page === "evidence") {
    return (
      <EvidenceRequests
        role={evidenceRole}
        onBack={() =>
          setPage(evidenceRole === "farmer" ? "farmer" : "lender")
        }
        onSwitchRole={(role) => {
          setEvidenceRole(role);
          setPage("evidence");
        }}
      />
    );
  }

  return null;
}

export default App;