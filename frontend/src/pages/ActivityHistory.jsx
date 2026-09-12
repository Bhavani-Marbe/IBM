import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  Landmark,
  Sprout,
  TrendingUp,
} from "lucide-react";

const FARMER_ID = "FRM-E54DDC4D";

function ActivityHistory({ onBack }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/api/v1/transactions/farmer/${FARMER_ID}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load activity history.");
        }

        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTransactions(data);
        } else if (Array.isArray(data?.transactions)) {
          setTransactions(data.transactions);
        } else if (Array.isArray(data?.data)) {
          setTransactions(data.data);
        } else {
          setTransactions([]);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const verifiedCount = transactions.filter(
    (transaction) =>
      transaction.verified === true ||
      transaction.verified === 1
  ).length;

  const totalAmount = transactions.reduce(
    (sum, transaction) =>
      sum + Number(transaction.amount || 0),
    0
  );

  const getTransactionIcon = (type) => {
    if (type === "crop_sale") {
      return <TrendingUp size={20} />;
    }

    if (type === "loan_repayment") {
      return <CreditCard size={20} />;
    }

    if (type === "input_purchase") {
      return <Sprout size={20} />;
    }

    if (type === "subsidy_receipt") {
      return <Landmark size={20} />;
    }

    return <Sprout size={20} />;
  };

  const getTransactionTitle = (type) => {
    const titles = {
      crop_sale: "Crop Sale",
      loan_repayment: "Loan Repayment",
      input_purchase: "Input Purchase",
      subsidy_receipt: "Subsidy Received",
    };

    return titles[type] || "Agricultural Activity";
  };

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

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
        Loading activity history...
      </div>
    );
  }

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
          maxWidth: "1050px",
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
            }}
          >
            <Sprout size={31} />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                Agricultural Activity
              </h1>

              <p
                style={{
                  margin: "7px 0 0",
                  opacity: 0.9,
                }}
              >
                Your verified agricultural activity contributes
                to your AgriTrust credit identity.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "15px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "10px",
              color: "#991b1b",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* Summary cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <div
              style={{
                color: "#64748b",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              TOTAL ACTIVITIES
            </div>

            <div
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#14532d",
                marginTop: "7px",
              }}
            >
              {transactions.length}
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <div
              style={{
                color: "#64748b",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              VERIFIED ACTIVITIES
            </div>

            <div
              style={{
                fontSize: "32px",
                fontWeight: "800",
                color: "#166534",
                marginTop: "7px",
              }}
            >
              {verifiedCount}
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <div
              style={{
                color: "#64748b",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              RECORDED VALUE
            </div>

            <div
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#14532d",
                marginTop: "7px",
              }}
            >
              {formatAmount(totalAmount)}
            </div>
          </div>
        </div>

        {/* Verification summary */}
        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "13px",
            padding: "17px",
            marginBottom: "25px",
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <CheckCircle2
            size={22}
            color="#166534"
            style={{ flexShrink: 0 }}
          />

          <div>
            <strong style={{ color: "#14532d" }}>
              Verification matters
            </strong>

            <p
              style={{
                margin: "4px 0 0",
                color: "#475569",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              Verified agricultural activity provides stronger
              evidence for your credit-readiness profile.
              Unverified records remain visible but should not
              be treated as verified evidence.
            </p>
          </div>
        </div>

        {/* Timeline */}
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
            Activity Timeline
          </h2>

          {transactions.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "#64748b",
                background: "#f8fafc",
                borderRadius: "12px",
              }}
            >
              No agricultural activity has been recorded yet.
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {transactions.map((transaction, index) => {
                const isVerified =
                  transaction.verified === true ||
                  transaction.verified === 1;

                return (
                  <div
                    key={
                      transaction.transaction_id ||
                      transaction.id ||
                      index
                    }
                    style={{
                      display: "flex",
                      gap: "15px",
                      paddingBottom:
                        index === transactions.length - 1
                          ? 0
                          : "20px",
                      marginBottom:
                        index === transactions.length - 1
                          ? 0
                          : "20px",
                      borderBottom:
                        index === transactions.length - 1
                          ? "none"
                          : "1px solid #e2e8f0",
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: "43px",
                        height: "43px",
                        borderRadius: "50%",
                        background: isVerified
                          ? "#dcfce7"
                          : "#f1f5f9",
                        color: isVerified
                          ? "#166534"
                          : "#64748b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {getTransactionIcon(
                        transaction.transaction_type
                      )}
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "15px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: 0,
                              color: "#334155",
                              fontSize: "16px",
                            }}
                          >
                            {getTransactionTitle(
                              transaction.transaction_type
                            )}
                          </h3>

                          <div
                            style={{
                              color: "#64748b",
                              fontSize: "13px",
                              marginTop: "5px",
                            }}
                          >
                            {formatDate(
                              transaction.transaction_date
                            )}
                          </div>
                        </div>

                        <strong
                          style={{
                            color: "#14532d",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatAmount(
                            transaction.amount
                          )}
                        </strong>
                      </div>

                      {transaction.description && (
                        <p
                          style={{
                            margin: "9px 0",
                            color: "#64748b",
                            fontSize: "14px",
                          }}
                        >
                          {transaction.description}
                        </p>
                      )}

                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "5px 9px",
                          borderRadius: "999px",
                          background: isVerified
                            ? "#f0fdf4"
                            : "#f8fafc",
                          color: isVerified
                            ? "#166534"
                            : "#64748b",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        {isVerified ? (
                          <>
                            <CheckCircle2 size={14} />
                            Verified
                          </>
                        ) : (
                          <>
                            <Clock3 size={14} />
                            Pending Verification
                          </>
                        )}
                      </div>

                      {transaction.verified_by && (
                        <span
                          style={{
                            marginLeft: "10px",
                            color: "#94a3b8",
                            fontSize: "12px",
                          }}
                        >
                          Verified by {transaction.verified_by}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer message */}
        <div
          style={{
            marginTop: "20px",
            padding: "17px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            color: "#64748b",
            fontSize: "13px",
            lineHeight: "1.5",
          }}
        >
          <strong style={{ color: "#14532d" }}>
            Why this matters:
          </strong>{" "}
          AgriTrust uses verified agricultural activity as
          evidence when generating your explainable
          credit-readiness assessment.
        </div>
      </div>
    </div>
  );
}

export default ActivityHistory;