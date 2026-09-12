import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  FileCheck2,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const DEFAULT_FARMER_ID = "FRM-E54DDC4D";

function LenderDashboard({ onBack, onEvidence }) {
  const [farmerId, setFarmerId] = useState(DEFAULT_FARMER_ID);
  const [farmer, setFarmer] = useState(null);
  const [intelligence, setIntelligence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFarmer = async () => {
    if (!farmerId.trim()) {
      setError("Please enter a Farmer ID.");
      return;
    }

    setLoading(true);
    setError("");
    setFarmer(null);
    setIntelligence(null);

    try {
      const [farmerResponse, intelligenceResponse] =
        await Promise.all([
          fetch(
            `http://127.0.0.1:8000/api/v1/farmers/${farmerId.trim()}`
          ),
          fetch(
            `http://127.0.0.1:8000/api/v1/credit-intelligence/${farmerId.trim()}`
          ),
        ]);

      if (!farmerResponse.ok) {
        throw new Error("Farmer not found.");
      }

      if (!intelligenceResponse.ok) {
        throw new Error(
          "Credit intelligence could not be generated."
        );
      }

      const farmerData = await farmerResponse.json();
      const intelligenceData =
        await intelligenceResponse.json();

      setFarmer(farmerData);
      setIntelligence(intelligenceData);
    } catch (err) {
      setError(
        err.message ||
          "Unable to retrieve farmer information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchFarmer();
  }, []);

  const getReadinessLabel = (score) => {
    if (score >= 75) return "Strong Readiness";
    if (score >= 55) return "Developing";
    return "Low Readiness";
  };

  const getSignalLabel = (value) => {
    if (value >= 75) return "Strong";
    if (value >= 55) return "Medium";
    return "Developing";
  };

  /*
   * Backend agricultural_risk:
   * higher value = higher agricultural risk.
   *
   * For lender display we intentionally keep the original
   * risk value because this is a risk signal, not a strength.
   */
  const getRiskLabel = (value) => {
    if (value >= 70) return "High";
    if (value >= 50) return "Medium";
    return "Low";
  };

  const score = Number(
    intelligence?.credit_readiness || 0
  );

  const signalRows = intelligence
    ? [
        {
          name: "Production Stability",
          value: Number(
            intelligence.production_stability || 0
          ),
          type: "strength",
          icon: <TrendingUp size={18} />,
        },
        {
          name: "Market Stability",
          value: Number(
            intelligence.market_stability || 0
          ),
          type: "strength",
          icon: <TrendingUp size={18} />,
        },
        {
          name: "Repayment Strength",
          value: Number(
            intelligence.repayment_strength || 0
          ),
          type: "strength",
          icon: <CheckCircle2 size={18} />,
        },
        {
          name: "Agricultural Risk",
          value: Number(
            intelligence.agricultural_risk || 0
          ),
          type: "risk",
          icon: <ShieldCheck size={18} />,
        },
        {
          name: "FPO Strength",
          value: Number(
            intelligence.fpo_strength || 0
          ),
          type: "strength",
          icon: <Users size={18} />,
        },
      ]
    : [];

  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "30px 20px 60px",
        }}
      >
        {/* Back */}
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            background: "transparent",
            color: "#166534",
            fontWeight: "700",
            cursor: "pointer",
            marginBottom: "22px",
          }}
        >
          <ArrowLeft size={19} />
          Back to Home
        </button>

        {/* Header */}
        <div
          style={{
            background: "#14532d",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <ShieldCheck size={32} />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                Lender Credit Intelligence
              </h1>

              <p
                style={{
                  margin: "7px 0 0",
                  opacity: 0.9,
                  lineHeight: "1.5",
                }}
              >
                Understand a farmer's agricultural credit
                readiness through verified and explainable
                signals.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "22px",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "700",
              color: "#334155",
              marginBottom: "8px",
            }}
          >
            Search Farmer
          </label>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              value={farmerId}
              onChange={(event) =>
                setFarmerId(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchFarmer();
                }
              }}
              placeholder="Enter Farmer ID"
              style={{
                flex: 1,
                minWidth: 0,
                padding: "13px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "9px",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <button
              onClick={searchFarmer}
              disabled={loading}
              style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "9px",
                background: loading
                  ? "#94a3b8"
                  : "#166534",
                color: "#ffffff",
                fontWeight: "700",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <Search size={17} />

              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          <p
            style={{
              margin: "9px 0 0",
              color: "#94a3b8",
              fontSize: "12px",
            }}
          >
            Demo Farmer ID: FRM-E54DDC4D
          </p>
        </section>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "15px",
              borderRadius: "10px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* Results */}
        {farmer && intelligence && (
          <>
            {/* Farmer identity */}
            <section
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "25px",
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
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: "700",
                      letterSpacing: "0.5px",
                    }}
                  >
                    FARMER IDENTITY
                  </div>

                  <h2
                    style={{
                      margin: "7px 0",
                      color: "#14532d",
                    }}
                  >
                    {farmer.name}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                    }}
                  >
                    {farmer.village},{" "}
                    {farmer.district},{" "}
                    {farmer.state}
                  </p>

                  <p
                    style={{
                      margin: "6px 0 0",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Farmer ID:{" "}
                    <strong>{farmer.farmer_id}</strong>
                  </p>
                </div>

                <div
                  style={{
                    padding: "7px 11px",
                    borderRadius: "999px",
                    background: "#dcfce7",
                    color: "#166534",
                    fontSize: "12px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                  }}
                >
                  VERIFIED PROFILE
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(160px,1fr))",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    padding: "14px",
                    background: "#f8fafc",
                    borderRadius: "10px",
                  }}
                >
                  <small style={{ color: "#64748b" }}>
                    FARM SIZE
                  </small>
                  <strong
                    style={{
                      display: "block",
                      color: "#334155",
                      marginTop: "5px",
                    }}
                  >
                    {farmer.land_size_acres} acres
                  </strong>
                </div>

                <div
                  style={{
                    padding: "14px",
                    background: "#f8fafc",
                    borderRadius: "10px",
                  }}
                >
                  <small style={{ color: "#64748b" }}>
                    PRIMARY CROP
                  </small>
                  <strong
                    style={{
                      display: "block",
                      color: "#334155",
                      marginTop: "5px",
                    }}
                  >
                    Onion
                  </strong>
                </div>

                <div
                  style={{
                    padding: "14px",
                    background: "#f8fafc",
                    borderRadius: "10px",
                  }}
                >
                  <small style={{ color: "#64748b" }}>
                    FPO
                  </small>
                  <strong
                    style={{
                      display: "block",
                      color: "#334155",
                      marginTop: "5px",
                    }}
                  >
                    Nashik Farmers FPO
                  </strong>
                </div>
              </div>
            </section>

            {/* Score + signals */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {/* Score */}
              <section
                style={{
                  background: "#14532d",
                  color: "#ffffff",
                  borderRadius: "16px",
                  padding: "28px",
                  textAlign: "center",
                }}
              >
                <Brain size={32} />

                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    opacity: 0.8,
                    marginTop: "15px",
                  }}
                >
                  CREDIT READINESS
                </div>

                <div
                  style={{
                    fontSize: "62px",
                    fontWeight: "800",
                    lineHeight: "1",
                    marginTop: "15px",
                  }}
                >
                  {score}
                  <span
                    style={{
                      fontSize: "22px",
                      opacity: 0.75,
                    }}
                  >
                    /100
                  </span>
                </div>

                <h2
                  style={{
                    margin: "15px 0 5px",
                  }}
                >
                  {getReadinessLabel(score)}
                </h2>

                <p
                  style={{
                    margin: 0,
                    opacity: 0.85,
                  }}
                >
                  {intelligence.risk_level} Risk
                </p>
              </section>

              {/* Signals */}
              <section
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "25px",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    color: "#14532d",
                  }}
                >
                  Decision Signals
                </h2>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  Multiple agricultural signals contribute to
                  the readiness assessment.
                </p>

                {signalRows.map((signal) => {
                  const isRisk = signal.type === "risk";

                  return (
                    <div
                      key={signal.name}
                      style={{
                        marginBottom: "17px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "#334155",
                          }}
                        >
                          <span
                            style={{
                              color: "#166534",
                            }}
                          >
                            {signal.icon}
                          </span>

                          <strong>
                            {signal.name}
                          </strong>
                        </div>

                        <span
                          style={{
                            color: isRisk
                              ? "#b45309"
                              : "#64748b",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {isRisk
                            ? getRiskLabel(signal.value)
                            : getSignalLabel(
                                signal.value
                              )}
                        </span>
                      </div>

                      <div
                        style={{
                          height: "8px",
                          background: "#e2e8f0",
                          borderRadius: "10px",
                          marginTop: "7px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.max(
                              0,
                              Math.min(
                                100,
                                signal.value
                              )
                            )}%`,
                            height: "100%",
                            background: "#166534",
                            borderRadius: "10px",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          textAlign: "right",
                          color: "#94a3b8",
                          fontSize: "11px",
                          marginTop: "3px",
                        }}
                      >
                        {signal.value}/100
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>

            {/* AI insight + recommendation */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <section
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                  }}
                >
                  <Brain
                    size={23}
                    color="#166534"
                  />

                  <h2
                    style={{
                      margin: 0,
                      color: "#14532d",
                    }}
                  >
                    Explainable AI Insight
                  </h2>
                </div>

                <p
                  style={{
                    color: "#475569",
                    lineHeight: "1.7",
                    marginTop: "17px",
                  }}
                >
                  {intelligence.explanation}
                </p>

                {intelligence.risk_factors &&
                  intelligence.risk_factors.length >
                    0 && (
                    <div
                      style={{
                        marginTop: "17px",
                        padding: "15px",
                        background: "#fffbeb",
                        borderRadius: "10px",
                      }}
                    >
                      <strong
                        style={{
                          color: "#92400e",
                        }}
                      >
                        Risk factors
                      </strong>

                      <ul
                        style={{
                          marginBottom: 0,
                          color: "#78350f",
                          lineHeight: "1.6",
                        }}
                      >
                        {intelligence.risk_factors.map(
                          (factor, index) => (
                            <li key={index}>
                              {factor}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </section>

              <section
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "25px",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    color: "#14532d",
                  }}
                >
                  Lending Recommendation
                </h2>

                <div
                  style={{
                    padding: "18px",
                    background: "#f0fdf4",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: "700",
                    }}
                  >
                    ILLUSTRATIVE EXPOSURE
                  </div>

                  <div
                    style={{
                      fontSize: "35px",
                      color: "#166534",
                      fontWeight: "800",
                      marginTop: "5px",
                    }}
                  >
                    ₹
                    {Number(
                      intelligence.recommended_exposure ||
                        0
                    ).toLocaleString("en-IN")}
                  </div>
                </div>

                <p
                  style={{
                    color: "#475569",
                    lineHeight: "1.6",
                  }}
                >
                  <strong>Purpose:</strong>{" "}
                  {intelligence.suggested_purpose ||
                    "Agricultural working capital"}
                </p>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  This recommendation is based on the
                  prototype's explainable signals and should
                  support, not replace, lender underwriting.
                </p>
              </section>
            </div>

            {/* Evidence */}
            <section
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "25px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <FileCheck2
                      size={23}
                      color="#166534"
                    />

                    <h2
                      style={{
                        margin: 0,
                        color: "#14532d",
                      }}
                    >
                      Supporting Evidence
                    </h2>
                  </div>

                  <p
                    style={{
                      color: "#64748b",
                      marginBottom: 0,
                    }}
                  >
                    {intelligence.verified_transactions}{" "}
                    of {intelligence.total_transactions}{" "}
                    recorded transactions are verified.
                  </p>
                </div>

                <button
                  onClick={onEvidence}
                  style={{
                    padding: "12px 18px",
                    border: "none",
                    borderRadius: "9px",
                    background: "#166534",
                    color: "#ffffff",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >
                  <FileCheck2 size={17} />
                  Request Supporting Evidence
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(200px,1fr))",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    padding: "15px",
                    background: "#f0fdf4",
                    borderRadius: "10px",
                  }}
                >
                  <strong
                    style={{
                      color: "#166534",
                    }}
                  >
                    Verified Activity
                  </strong>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#64748b",
                      fontSize: "13px",
                    }}
                  >
                    Stronger evidence for the readiness
                    assessment.
                  </p>
                </div>

                <div
                  style={{
                    padding: "15px",
                    background: "#f8fafc",
                    borderRadius: "10px",
                  }}
                >
                  <strong
                    style={{
                      color: "#334155",
                    }}
                  >
                    Farmer Controlled
                  </strong>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#64748b",
                      fontSize: "13px",
                    }}
                  >
                    Evidence should only be disclosed with
                    farmer authorization.
                  </p>
                </div>
              </div>
            </section>

            {/* Final principle */}
            <div
              style={{
                marginTop: "20px",
                padding: "18px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "12px",
                display: "flex",
                gap: "11px",
                alignItems: "flex-start",
              }}
            >
              <ShieldCheck
                size={22}
                color="#166534"
                style={{ flexShrink: 0 }}
              />

              <div>
                <strong
                  style={{
                    color: "#14532d",
                  }}
                >
                  Farmer-controlled disclosure
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#475569",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  AgriTrust is designed so lenders can evaluate
                  relevant evidence without automatically
                  receiving the farmer's entire underlying
                  agricultural data.
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <p
              style={{
                color: "#94a3b8",
                fontSize: "12px",
                lineHeight: "1.5",
                marginTop: "18px",
              }}
            >
              <strong>Prototype disclaimer:</strong>{" "}
              AgriTrust's current credit engine is an
              explainable, rule-based prototype. The suggested
              exposure is illustrative decision support and
              does not constitute final loan approval or
              bank-grade default prediction.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LenderDashboard;