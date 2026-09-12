import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const STORAGE_KEY = "agritrust_evidence_requests";

const evidenceOptions = [
  {
    id: "production",
    title: "Production Evidence",
    description: "Verified crop production and agricultural activity.",
  },
  {
    id: "market",
    title: "Market Activity",
    description: "Crop sales and market transaction history.",
  },
  {
    id: "repayment",
    title: "Repayment Evidence",
    description: "Verified loan repayment activity.",
  },
  {
    id: "fpo",
    title: "FPO Participation",
    description: "FPO membership and participation evidence.",
  },
];

function EvidenceRequests({
  role = "lender",
  onBack,
  onSwitchRole,
}) {
  const [requests, setRequests] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState([
    "production",
    "market",
  ]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        setRequests(Array.isArray(parsed) ? parsed : []);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Unable to load evidence requests:", error);
      setRequests([]);
    }
  };

  const saveRequests = (updatedRequests) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedRequests)
    );

    setRequests(updatedRequests);
  };

  const toggleEvidence = (id) => {
    setSelectedEvidence((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const createRequest = () => {
    if (selectedEvidence.length === 0) {
      setMessage("Please select at least one evidence category.");
      return;
    }

    const newRequest = {
      id: `REQ-${Date.now()}`,
      lender: "Partner Bank",
      farmerId: "FRM-E54DDC4D",
      farmerName: "Ramesh Kumar",
      evidence: selectedEvidence,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const updatedRequests = [newRequest, ...requests];

    saveRequests(updatedRequests);

    setMessage(
      "Evidence request created. The farmer can now review and respond."
    );
  };

  const updateRequestStatus = (requestId, status) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId
        ? {
            ...request,
            status,
            respondedAt: new Date().toISOString(),
          }
        : request
    );

    saveRequests(updatedRequests);

    if (status === "approved") {
      setMessage(
        "Evidence approved. Selected evidence has been shared with the lender."
      );
    } else {
      setMessage("Evidence request rejected.");
    }
  };

  const getEvidenceTitle = (id) => {
    const item = evidenceOptions.find(
      (option) => option.id === id
    );

    return item ? item.title : id;
  };

  const getStatusDetails = (status) => {
    if (status === "approved") {
      return {
        label: "Approved",
        icon: <CheckCircle2 size={17} />,
        className: "evidence-status-approved",
      };
    }

    if (status === "rejected") {
      return {
        label: "Rejected",
        icon: <XCircle size={17} />,
        className: "evidence-status-rejected",
      };
    }

    return {
      label: "Pending",
      icon: <Clock3 size={17} />,
      className: "evidence-status-pending",
    };
  };

  // --------------------------------------------------
  // LENDER VIEW
  // --------------------------------------------------

  if (role === "lender") {
    return (
      <div className="app">
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "30px 20px 60px",
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#166534",
              fontWeight: "600",
              marginBottom: "25px",
            }}
          >
            <ArrowLeft size={19} />
            Back to Lender Dashboard
          </button>

          <div
            style={{
              background: "#14532d",
              color: "#ffffff",
              borderRadius: "18px",
              padding: "30px",
              marginBottom: "25px",
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
              <FileCheck2 size={30} />

              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                Supporting Evidence
              </h1>
            </div>

            <p
              style={{
                margin: 0,
                lineHeight: "1.6",
                opacity: 0.9,
                maxWidth: "750px",
              }}
            >
              Request only the evidence needed to support a lending
              decision. The farmer remains in control of what is
              shared.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "25px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => onSwitchRole("lender")}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                background: "#166534",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Lender View
            </button>

            <button
              onClick={() => onSwitchRole("farmer")}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #166534",
                background: "#ffffff",
                color: "#166534",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Preview Farmer View
            </button>
          </div>

          {message && (
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#166534",
                marginBottom: "22px",
                fontWeight: "600",
              }}
            >
              {message}
            </div>
          )}

          <section
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "25px",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#14532d",
              }}
            >
              Request evidence for
            </h2>

            <p
              style={{
                color: "#64748b",
                marginTop: "-5px",
                marginBottom: "20px",
              }}
            >
              Farmer: <strong>Ramesh Kumar</strong> ·{" "}
              <span>FRM-E54DDC4D</span>
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: "14px",
              }}
            >
              {evidenceOptions.map((option) => {
                const selected = selectedEvidence.includes(
                  option.id
                );

                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      toggleEvidence(option.id)
                    }
                    style={{
                      textAlign: "left",
                      padding: "18px",
                      borderRadius: "12px",
                      border: selected
                        ? "2px solid #166534"
                        : "1px solid #cbd5e1",
                      background: selected
                        ? "#f0fdf4"
                        : "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <strong
                        style={{
                          color: "#334155",
                        }}
                      >
                        {option.title}
                      </strong>

                      {selected && (
                        <CheckCircle2
                          size={20}
                          color="#166534"
                        />
                      )}
                    </div>

                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "14px",
                        lineHeight: "1.5",
                      }}
                    >
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={createRequest}
              style={{
                marginTop: "22px",
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                background: "#166534",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Send Evidence Request
            </button>
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
              Request History
            </h2>

            {requests.length === 0 ? (
              <div
                style={{
                  padding: "25px",
                  textAlign: "center",
                  color: "#64748b",
                  background: "#f8fafc",
                  borderRadius: "12px",
                }}
              >
                No evidence requests yet.
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {requests.map((request) => {
                  const status = getStatusDetails(
                    request.status
                  );

                  return (
                    <div
                      key={request.id}
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: "18px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "15px",
                          alignItems: "flex-start",
                        }}
                      >
                        <div>
                          <strong
                            style={{
                              color: "#334155",
                              fontSize: "16px",
                            }}
                          >
                            {request.farmerName}
                          </strong>

                          <div
                            style={{
                              color: "#64748b",
                              fontSize: "13px",
                              marginTop: "4px",
                            }}
                          >
                            {request.id} ·{" "}
                            {request.farmerId}
                          </div>
                        </div>

                        <span
                          className={status.className}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "13px",
                            fontWeight: "700",
                          }}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginTop: "15px",
                        }}
                      >
                        {request.evidence.map((item) => (
                          <span
                            key={item}
                            style={{
                              padding: "7px 10px",
                              borderRadius: "999px",
                              background: "#f1f5f9",
                              color: "#475569",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {getEvidenceTitle(item)}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // FARMER VIEW
  // --------------------------------------------------

  return (
    <div className="app">
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "30px 20px 60px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#166534",
            fontWeight: "600",
            marginBottom: "25px",
          }}
        >
          <ArrowLeft size={19} />
          Back
        </button>

        <div
          style={{
            background: "#14532d",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            marginBottom: "25px",
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
            <ShieldCheck size={30} />

            <h1
              style={{
                margin: 0,
                fontSize: "30px",
              }}
            >
              Evidence Requests
            </h1>
          </div>

          <p
            style={{
              margin: 0,
              lineHeight: "1.6",
              opacity: 0.9,
            }}
          >
            You decide what information is shared with a lender.
            Review each request before approving it.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => onSwitchRole("farmer")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#166534",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Farmer View
          </button>

          <button
            onClick={() => onSwitchRole("lender")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #166534",
              background: "#ffffff",
              color: "#166534",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Preview Lender View
          </button>
        </div>

        {message && (
          <div
            style={{
              padding: "14px 16px",
              borderRadius: "10px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#166534",
              marginBottom: "22px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}

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
            Requests from lenders
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "25px",
            }}
          >
            Review what each lender wants to access before
            sharing your evidence.
          </p>

          {requests.length === 0 ? (
            <div
              style={{
                padding: "35px",
                textAlign: "center",
                background: "#f8fafc",
                borderRadius: "12px",
                color: "#64748b",
              }}
            >
              <ShieldCheck
                size={38}
                style={{ marginBottom: "10px" }}
              />

              <div>
                You currently have no evidence requests.
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {requests.map((request) => {
                const status = getStatusDetails(
                  request.status
                );

                return (
                  <div
                    key={request.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "14px",
                      padding: "20px",
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
                            margin: "0 0 5px",
                            color: "#334155",
                          }}
                        >
                          {request.lender}
                        </h3>

                        <p
                          style={{
                            margin: 0,
                            color: "#64748b",
                            fontSize: "13px",
                          }}
                        >
                          Request ID: {request.id}
                        </p>
                      </div>

                      <span
                        className={status.className}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "13px",
                          fontWeight: "700",
                        }}
                      >
                        {status.icon}
                        {status.label}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "18px",
                        padding: "16px",
                        background: "#f8fafc",
                        borderRadius: "10px",
                      }}
                    >
                      <strong
                        style={{
                          color: "#334155",
                        }}
                      >
                        Evidence requested
                      </strong>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          marginTop: "12px",
                        }}
                      >
                        {request.evidence.map((item) => (
                          <div
                            key={item}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              color: "#475569",
                              fontSize: "14px",
                            }}
                          >
                            <FileCheck2
                              size={17}
                              color="#166534"
                            />
                            {getEvidenceTitle(item)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "18px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id,
                              "approved"
                            )
                          }
                          style={{
                            flex: 1,
                            minWidth: "180px",
                            padding: "13px",
                            borderRadius: "9px",
                            border: "none",
                            background: "#166534",
                            color: "#ffffff",
                            cursor: "pointer",
                            fontWeight: "700",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "7px",
                            }}
                          >
                            <CheckCircle2 size={18} />
                            Approve & Share
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            updateRequestStatus(
                              request.id,
                              "rejected"
                            )
                          }
                          style={{
                            flex: 1,
                            minWidth: "180px",
                            padding: "13px",
                            borderRadius: "9px",
                            border: "1px solid #cbd5e1",
                            background: "#ffffff",
                            color: "#475569",
                            cursor: "pointer",
                            fontWeight: "700",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "7px",
                            }}
                          >
                            <XCircle size={18} />
                            Reject
                          </span>
                        </button>
                      </div>
                    )}

                    {request.status === "approved" && (
                      <div
                        style={{
                          marginTop: "18px",
                          padding: "13px",
                          borderRadius: "9px",
                          background: "#f0fdf4",
                          color: "#166534",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <CheckCircle2 size={18} />
                        You approved this evidence request.
                      </div>
                    )}

                    {request.status === "rejected" && (
                      <div
                        style={{
                          marginTop: "18px",
                          padding: "13px",
                          borderRadius: "9px",
                          background: "#fef2f2",
                          color: "#991b1b",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <XCircle size={18} />
                        You rejected this evidence request.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div
          style={{
            marginTop: "22px",
            padding: "18px",
            borderRadius: "12px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <ShieldCheck
            size={22}
            color="#166534"
            style={{ flexShrink: 0 }}
          />

          <div>
            <strong style={{ color: "#14532d" }}>
              Your data, your choice
            </strong>

            <p
              style={{
                margin: "5px 0 0",
                color: "#475569",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              AgriTrust demonstrates selective disclosure:
              lenders request specific evidence, and you decide
              whether to share it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvidenceRequests;