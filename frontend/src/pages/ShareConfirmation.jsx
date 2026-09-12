import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Sprout,
  FileCheck2,
} from "lucide-react";

function ShareConfirmation({ onBack, onDashboard }) {
  let sharedData = [];

  try {
    sharedData =
      JSON.parse(
        localStorage.getItem("agritrust_shared_data")
      ) || [];
  } catch {
    sharedData = [];
  }

  const shareTime = localStorage.getItem(
    "agritrust_share_time"
  );

  const formattedTime = shareTime
    ? new Date(shareTime).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Just now";

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
          maxWidth: "850px",
          margin: "0 auto",
          padding: "35px 20px 60px",
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
            marginBottom: "25px",
          }}
        >
          <ArrowLeft size={19} />
          Back to Data Control
        </button>

        {/* Success header */}
        <div
          style={{
            background: "#14532d",
            color: "#ffffff",
            borderRadius: "20px",
            padding: "35px 30px",
            textAlign: "center",
          }}
        >
          <CheckCircle2
            size={58}
            strokeWidth={1.8}
            style={{ marginBottom: "12px" }}
          />

          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "32px",
            }}
          >
            Your Data Has Been Shared
          </h1>

          <p
            style={{
              margin: 0,
              opacity: 0.9,
              lineHeight: "1.6",
            }}
          >
            You have successfully authorized the selected
            information to be shared with the lender.
          </p>
        </div>

        {/* Share summary */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "26px",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "18px",
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
              Shared Information
            </h2>
          </div>

          {sharedData.length === 0 ? (
            <div
              style={{
                padding: "18px",
                borderRadius: "10px",
                background: "#f8fafc",
                color: "#64748b",
              }}
            >
              No information categories were recorded.
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {sharedData.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px",
                    background: "#f0fdf4",
                    border: "1px solid #dcfce7",
                    borderRadius: "10px",
                  }}
                >
                  <CheckCircle2
                    size={19}
                    color="#166534"
                  />

                  <span
                    style={{
                      color: "#334155",
                      fontWeight: "600",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              marginTop: "20px",
              paddingTop: "18px",
              borderTop: "1px solid #e2e8f0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Shared on: <strong>{formattedTime}</strong>
          </div>
        </section>

        {/* Consent card */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "26px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
            }}
          >
            <ShieldCheck
              size={27}
              color="#166534"
              style={{ flexShrink: 0 }}
            />

            <div>
              <h2
                style={{
                  margin: "0 0 8px",
                  color: "#14532d",
                }}
              >
                Farmer-Controlled Disclosure
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  lineHeight: "1.6",
                }}
              >
                You chose which parts of your agricultural
                credit identity to disclose. AgriTrust's
                approach is designed so that lenders receive
                relevant evidence without automatically
                receiving all of your underlying information.
              </p>
            </div>
          </div>
        </section>

        {/* Demo audit trail */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "26px",
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#14532d",
            }}
          >
            Share Receipt
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sprout
                  size={18}
                  color="#166534"
                />
              </div>

              <div>
                <strong>Farmer identity</strong>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                  }}
                >
                  FRM-E54DDC4D
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Lock
                  size={18}
                  color="#166534"
                />
              </div>

              <div>
                <strong>Selective disclosure</strong>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                  }}
                >
                  {sharedData.length} information{" "}
                  {sharedData.length === 1
                    ? "category"
                    : "categories"}{" "}
                  selected
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle2
                  size={18}
                  color="#166534"
                />
              </div>

              <div>
                <strong>Consent recorded</strong>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                  }}
                >
                  {formattedTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo limitation */}
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            borderRadius: "10px",
            background: "#fffbeb",
            border: "1px solid #fde68a",
            color: "#92400e",
            fontSize: "13px",
            lineHeight: "1.5",
          }}
        >
          <strong>Hackathon prototype:</strong> The share
          receipt is demonstrated locally in the browser.
          A production implementation would persist consent
          receipts, authorization records, and audit logs on
          the backend.
        </div>

        {/* Dashboard button */}
        <button
          onClick={onDashboard}
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: "#166534",
            color: "#ffffff",
            fontWeight: "700",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Return to Farmer Dashboard
        </button>
      </div>
    </div>
  );
}

export default ShareConfirmation;