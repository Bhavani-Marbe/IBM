import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const FARMER_ID = "FRM-E54DDC4D";

function getStrengthLabel(value) {
  if (value >= 75) return "Strong";
  if (value >= 55) return "Medium";
  return "Developing";
}

function getReadinessLabel(value) {
  if (value >= 75) return "Strong Readiness";
  if (value >= 55) return "Developing";
  return "Low Readiness";
}

function getRiskLabel(value) {
  if (value >= 70) return "High";
  if (value >= 50) return "Medium";
  return "Low";
}

function CreditReadiness({
  onBack,
  onDataControl,
  onActivity,
}) {
  const [intelligence, setIntelligence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/api/v1/credit-intelligence/${FARMER_ID}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Unable to load credit intelligence."
          );
        }

        return response.json();
      })
      .then((data) => {
        setIntelligence(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#166534",
          fontWeight: "700",
        }}
      >
        Loading your credit readiness...
      </div>
    );
  }

  if (error || !intelligence) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <p style={{ color: "#991b1b" }}>
          {error || "Credit intelligence unavailable."}
        </p>

        <button
          onClick={onBack}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#166534",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const score = Number(
    intelligence.credit_readiness || 0
  );

  /*
   * The backend's agricultural_risk is a risk value:
   * higher = more agricultural risk.
   *
   * For the farmer-facing "strength" display, we invert it.
   */
  const agriculturalRiskStrength =
    100 - Number(intelligence.agricultural_risk || 0);

  const signalRows = [
    {
      name: "Production Stability",
      value: Number(
        intelligence.production_stability || 0
      ),
      icon: <TrendingUp size={19} />,
    },
    {
      name: "Market Stability",
      value: Number(
        intelligence.market_stability || 0
      ),
      icon: <TrendingUp size={19} />,
    },
    {
      name: "Agricultural Risk",
      value: agriculturalRiskStrength,
      icon: <ShieldCheck size={19} />,
    },
    {
      name: "FPO Strength",
      value: Number(intelligence.fpo_strength || 0),
      icon: <Users size={19} />,
    },
  ];

  const breakdownRows = [
    {
      name: "Production Stability",
      value: Number(
        intelligence.production_stability || 0
      ),
      weight: "25%",
    },
    {
      name: "Market Stability",
      value: Number(
        intelligence.market_stability || 0
      ),
      weight: "20%",
    },
    {
      name: "Repayment Strength",
      value: Number(
        intelligence.repayment_strength || 0
      ),
      weight: "25%",
    },
    {
      name: "Agricultural Risk Strength",
      value: agriculturalRiskStrength,
      weight: "20%",
    },
    {
      name: "FPO Strength",
      value: Number(intelligence.fpo_strength || 0),
      weight: "10%",
    },
  ];

  const aiInsight =
    score >= 75
      ? "Your verified activity shows strong credit-readiness signals. Maintaining consistent repayments and verified agricultural activity can help preserve this position."
      : score >= 55
      ? "Your profile shows developing credit-readiness. Increasing verified market activity, maintaining repayment records, and strengthening FPO participation could improve your profile."
      : "Your current profile has limited verified strength. Building consistent verified agricultural activity and repayment history can help improve future credit readiness.";

  const improvementTips = [
    "Maintain consistent and verifiable crop-sale records.",
    "Keep loan repayment activity up to date.",
    "Increase the amount of agricultural activity that can be independently verified.",
    "Strengthen participation and documentation through your FPO.",
  ];

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
          Back to Farmer Dashboard
        </button>

        {/* Header */}
        <div
          style={{
            background: "#14532d",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Brain size={32} />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                Credit Readiness
              </h1>

              <p
                style={{
                  margin: "7px 0 0",
                  opacity: 0.9,
                  lineHeight: "1.5",
                }}
              >
                An explainable view of the agricultural signals
                contributing to your credit identity.
              </p>
            </div>
          </div>
        </div>

        {/* Score + overview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "310px 1fr",
            gap: "22px",
          }}
        >
          {/* Main score */}
          <div
            style={{
              background: "#14532d",
              color: "#ffffff",
              borderRadius: "18px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <ShieldCheck size={34} />

            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.5px",
                marginTop: "15px",
                opacity: 0.85,
              }}
            >
              CREDIT READINESS
            </div>

            <div
              style={{
                fontSize: "64px",
                lineHeight: "1",
                fontWeight: "800",
                marginTop: "15px",
              }}
            >
              {score}
              <span
                style={{
                  fontSize: "24px",
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
          </div>

          {/* Signal analysis */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
              padding: "26px",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#14532d",
              }}
            >
              Signal Analysis
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              These signals explain the major factors behind
              your current readiness level.
            </p>

            {signalRows.map((signal) => (
              <div
                key={signal.name}
                style={{
                  marginTop: "19px",
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
                    <span style={{ color: "#166534" }}>
                      {signal.icon}
                    </span>

                    <strong>{signal.name}</strong>
                  </div>

                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "13px",
                    }}
                  >
                    {getStrengthLabel(signal.value)}
                  </span>
                </div>

                <div
                  style={{
                    height: "9px",
                    background: "#e2e8f0",
                    borderRadius: "10px",
                    marginTop: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, signal.value)
                      )}%`,
                      height: "100%",
                      background: "#166534",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "4px",
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  <span>0</span>
                  <span>{signal.value}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score breakdown */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "26px",
            marginTop: "22px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#14532d",
            }}
          >
            How Your Score Is Built
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            AgriTrust uses multiple agricultural signals rather
            than relying on a single financial indicator.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {breakdownRows.map((row) => (
              <div
                key={row.name}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "220px 1fr 55px 50px",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <strong
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  {row.name}
                </strong>

                <div
                  style={{
                    height: "8px",
                    background: "#e2e8f0",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, row.value)
                      )}%`,
                      height: "100%",
                      background: "#166534",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: "13px",
                    color: "#475569",
                    textAlign: "right",
                  }}
                >
                  {row.value}
                </span>

                <span
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    textAlign: "right",
                  }}
                >
                  {row.weight}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* AI explanation */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "26px",
            marginTop: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Brain
              size={24}
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
              marginTop: "16px",
              color: "#475569",
              lineHeight: "1.7",
            }}
          >
            {intelligence.explanation}
          </p>

          <div
            style={{
              marginTop: "18px",
              padding: "18px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "12px",
            }}
          >
            <strong
              style={{
                color: "#14532d",
              }}
            >
              AI-assisted interpretation
            </strong>

            <p
              style={{
                margin: "7px 0 0",
                color: "#475569",
                lineHeight: "1.6",
                fontSize: "14px",
              }}
            >
              {aiInsight}
            </p>
          </div>

          {intelligence.risk_factors &&
            intelligence.risk_factors.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <strong
                  style={{
                    color: "#334155",
                  }}
                >
                  Factors to watch
                </strong>

                <ul
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  {intelligence.risk_factors.map(
                    (factor, index) => (
                      <li key={index}>{factor}</li>
                    )
                  )}
                </ul>
              </div>
            )}
        </section>

        {/* Repayment + verification */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "22px",
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
            <h2
              style={{
                marginTop: 0,
                color: "#14532d",
              }}
            >
              Repayment Strength
            </h2>

            <div
              style={{
                fontSize: "38px",
                fontWeight: "800",
                color: "#166534",
              }}
            >
              {intelligence.repayment_strength}/100
            </div>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.5",
              }}
            >
              Repayment activity is one of the key components
              considered by the prototype credit engine.
            </p>

            <div
              style={{
                height: "8px",
                background: "#e2e8f0",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: `${Math.min(
                    100,
                    intelligence.repayment_strength || 0
                  )}%`,
                  height: "100%",
                  background: "#166534",
                  borderRadius: "10px",
                }}
              />
            </div>
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
              Verification Summary
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <CheckCircle2
                size={25}
                color="#166534"
              />

              <strong
                style={{
                  fontSize: "25px",
                  color: "#166534",
                }}
              >
                {intelligence.verified_transactions}
              </strong>

              <span
                style={{
                  color: "#64748b",
                }}
              >
                of {intelligence.total_transactions} verified
              </span>
            </div>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.5",
              }}
            >
              Verified activity provides stronger evidence for
              your agricultural credit identity.
            </p>

            <button
              onClick={onActivity}
              style={{
                padding: "10px 15px",
                border: "1px solid #166534",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#166534",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              View Full Activity
            </button>
          </section>
        </div>

        {/* Exposure */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "26px",
            marginTop: "22px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#14532d",
            }}
          >
            Illustrative Credit Exposure
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "38px",
                fontWeight: "800",
                color: "#166534",
              }}
            >
              ₹
              {Number(
                intelligence.recommended_exposure || 0
              ).toLocaleString("en-IN")}
            </span>

            <span
              style={{
                color: "#64748b",
              }}
            >
              suggested exposure
            </span>
          </div>

          <p
            style={{
              color: "#475569",
              marginBottom: 0,
            }}
          >
            Suggested purpose:{" "}
            <strong>
              {intelligence.suggested_purpose ||
                "Agricultural working capital"}
            </strong>
          </p>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "12px",
              marginBottom: 0,
            }}
          >
            Illustrative decision support only — not a final
            lending approval.
          </p>
        </section>

        {/* Improvement */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "26px",
            marginTop: "22px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#14532d",
            }}
          >
            How You Can Improve
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "11px",
            }}
          >
            {improvementTips.map((tip, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  color: "#475569",
                  lineHeight: "1.5",
                }}
              >
                <CheckCircle2
                  size={19}
                  color="#166534"
                  style={{ flexShrink: 0 }}
                />

                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <button
            onClick={onActivity}
            style={{
              flex: 1,
              padding: "15px",
              border: "1px solid #166534",
              borderRadius: "10px",
              background: "#ffffff",
              color: "#166534",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            View Activity History
          </button>

          <button
            onClick={onDataControl}
            style={{
              flex: 1,
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#166534",
              color: "#ffffff",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Control & Share Data{" "}
            <ChevronRight
              size={17}
              style={{
                verticalAlign: "middle",
              }}
            />
          </button>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            marginTop: "18px",
            padding: "15px",
            borderRadius: "10px",
            background: "#fffbeb",
            border: "1px solid #fde68a",
            color: "#92400e",
            fontSize: "12px",
            lineHeight: "1.5",
          }}
        >
          <strong>Prototype note:</strong> AgriTrust's current
          credit engine is an explainable rule-based prototype.
          It is intended for decision support and does not
          represent a bank-grade credit approval or default
          prediction system.
        </div>
      </div>
    </div>
  );
}

export default CreditReadiness;