import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from "lucide-react";

const dataOptions = [
  {
    id: "creditReadiness",
    title: "Credit Readiness",
    description:
      "Your overall AgriTrust credit-readiness score and explainable assessment.",
  },
  {
    id: "production",
    title: "Production Evidence",
    description:
      "Verified agricultural production and farm activity.",
  },
  {
    id: "market",
    title: "Market Activity",
    description:
      "Verified crop sales and market transaction activity.",
  },
  {
    id: "repayment",
    title: "Repayment Evidence",
    description:
      "Verified loan repayment activity recorded in your profile.",
  },
  {
    id: "fpo",
    title: "FPO Participation",
    description:
      "Evidence of participation and association with your FPO.",
  },
];

function DataControl({ onBack, onShared }) {
  const [selected, setSelected] = useState({
    creditReadiness: true,
    production: true,
    market: true,
    repayment: false,
    fpo: true,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleOption = (id) => {
    setSelected((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const selectedItems = dataOptions.filter(
    (option) => selected[option.id]
  );

  const selectedCount = selectedItems.length;

  const handleConfirm = () => {
    if (selectedCount === 0) {
      return;
    }

    // Store the farmer's demo sharing decision locally.
    const sharedData = selectedItems.map((item) => ({
      id: item.id,
      title: item.title,
    }));

    localStorage.setItem(
      "agritrust_shared_data",
      JSON.stringify(sharedData)
    );

    localStorage.setItem(
      "agritrust_share_time",
      new Date().toISOString()
    );

    setShowConfirmation(true);
  };

  const handleContinue = () => {
    onShared();
  };

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
          maxWidth: "950px",
          margin: "0 auto",
          padding: "30px 20px 60px",
        }}
      >
        {/* Back button */}
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
          Back to Credit Readiness
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
              marginBottom: "12px",
            }}
          >
            <ShieldCheck size={32} />

            <h1
              style={{
                margin: 0,
                fontSize: "30px",
              }}
            >
              Your Data. Your Control.
            </h1>
          </div>

          <p
            style={{
              margin: 0,
              maxWidth: "760px",
              lineHeight: "1.6",
              opacity: 0.92,
            }}
          >
            Choose exactly what you want to share with the lender.
            AgriTrust is designed around farmer-controlled selective
            disclosure.
          </p>
        </div>

        {/* Privacy message */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "18px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "12px",
            marginBottom: "24px",
          }}
        >
          <Lock
            size={21}
            color="#166534"
            style={{ flexShrink: 0 }}
          />

          <div>
            <strong
              style={{
                color: "#14532d",
              }}
            >
              Selective disclosure
            </strong>

            <p
              style={{
                margin: "5px 0 0",
                color: "#475569",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              The lender only receives the information you choose
              to share. You remain in control of your agricultural
              credit identity.
            </p>
          </div>
        </div>

        {/* Data selection */}
        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "26px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#14532d",
                }}
              >
                Select information to share
              </h2>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Select only the evidence relevant to your lending
                request.
              </p>
            </div>

            <div
              style={{
                padding: "8px 13px",
                borderRadius: "999px",
                background: "#dcfce7",
                color: "#166534",
                fontSize: "13px",
                fontWeight: "700",
                whiteSpace: "nowrap",
              }}
            >
              {selectedCount} / {dataOptions.length} selected
            </div>
          </div>

          {/* Options */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {dataOptions.map((option) => {
              const isSelected = selected[option.id];

              return (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "18px",
                    borderRadius: "12px",
                    border: isSelected
                      ? "2px solid #166534"
                      : "1px solid #cbd5e1",
                    background: isSelected
                      ? "#f0fdf4"
                      : "#ffffff",
                    cursor: "pointer",
                    transition: "0.15s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: "700",
                          color: "#334155",
                          fontSize: "16px",
                        }}
                      >
                        {option.title}
                      </div>

                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          marginTop: "6px",
                        }}
                      >
                        {option.description}
                      </div>
                    </div>

                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "6px",
                        border: isSelected
                          ? "2px solid #166534"
                          : "2px solid #cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: isSelected
                          ? "#166534"
                          : "#ffffff",
                      }}
                    >
                      {isSelected && (
                        <CheckCircle2
                          size={16}
                          color="#ffffff"
                        />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected count */}
          <div
            style={{
              marginTop: "22px",
              padding: "15px 16px",
              background: "#f8fafc",
              borderRadius: "10px",
              color: "#475569",
              fontSize: "14px",
            }}
          >
            <strong
              style={{
                color: "#14532d",
              }}
            >
              {selectedCount}
            </strong>{" "}
            information categor
            {selectedCount === 1 ? "y" : "ies"} selected for sharing.
          </div>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            disabled={selectedCount === 0}
            style={{
              width: "100%",
              marginTop: "18px",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background:
                selectedCount > 0 ? "#166534" : "#94a3b8",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "15px",
              cursor:
                selectedCount > 0 ? "pointer" : "not-allowed",
            }}
          >
            Confirm & Share
          </button>
        </section>

        {/* Confirmation */}
        {showConfirmation && (
          <div
            style={{
              marginTop: "24px",
              background: "#ffffff",
              border: "2px solid #bbf7d0",
              borderRadius: "16px",
              padding: "26px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <CheckCircle2
                size={30}
                color="#166534"
              />

              <h2
                style={{
                  margin: 0,
                  color: "#14532d",
                }}
              >
                Ready to Share
              </h2>
            </div>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.6",
              }}
            >
              You have selected{" "}
              <strong>{selectedCount}</strong> information{" "}
              {selectedCount === 1
                ? "category"
                : "categories"}{" "}
              to share with the lender.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#475569",
                    fontSize: "14px",
                  }}
                >
                  <CheckCircle2
                    size={17}
                    color="#166534"
                  />
                  {item.title}
                </div>
              ))}
            </div>

            <button
              onClick={handleContinue}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                background: "#166534",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Continue to Share Confirmation →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataControl;