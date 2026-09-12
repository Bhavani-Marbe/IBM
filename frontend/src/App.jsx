import { useState } from "react";

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import FarmerLogin from "./pages/FarmerLogin";
import LenderLogin from "./pages/LenderLogin";
import FarmerDashboard from "./pages/FarmerDashboard";
import LenderDashboard from "./pages/LenderDashboard";
import CreditReadiness from "./pages/CreditReadiness";
import DataControl from "./pages/DataControl";
import ShareConfirmation from "./pages/ShareConfirmation";

import "./index.css";

function App() {
  const [page, setPage] = useState("landing");

  /*
   * ----------------------------------------------------
   * FARMER LOGIN
   * ----------------------------------------------------
   */

  if (page === "farmer-login") {
    return (
      <FarmerLogin
        onBack={() => setPage("landing")}
        onLogin={() => setPage("farmer")}
      />
    );
  }

  /*
   * ----------------------------------------------------
   * LENDER LOGIN
   * ----------------------------------------------------
   */

  if (page === "lender-login") {
    return (
      <LenderLogin
        onBack={() => setPage("landing")}
        onLogin={() => setPage("lender")}
      />
    );
  }

  /*
   * ----------------------------------------------------
   * FARMER DASHBOARD
   * ----------------------------------------------------
   */

  if (page === "farmer") {
    return (
      <FarmerDashboard
        onCreditReadiness={() => setPage("credit")}
      />
    );
  }

  /*
   * ----------------------------------------------------
   * CREDIT READINESS
   * ----------------------------------------------------
   */

  if (page === "credit") {
    return (
      <CreditReadiness
        onBack={() => setPage("farmer")}
        onDataControl={() => setPage("data")}
      />
    );
  }

  /*
   * ----------------------------------------------------
   * DATA CONTROL
   * ----------------------------------------------------
   */

  if (page === "data") {
    return (
      <DataControl
        onBack={() => setPage("credit")}
        onShared={() => setPage("shared")}
      />
    );
  }

  /*
   * ----------------------------------------------------
   * SHARE CONFIRMATION
   * ----------------------------------------------------
   */

  if (page === "shared") {
    return (
      <ShareConfirmation
        onBack={() => setPage("data")}
        onDashboard={() => setPage("farmer")}
      />
    );
  }

  /*
   * ----------------------------------------------------
   * LENDER DASHBOARD
   * ----------------------------------------------------
   */

  if (page === "lender") {
    return (
      <LenderDashboard
        onBack={() => setPage("landing")}
      />
    );
  }

  /*
   * ----------------------------------------------------
   * LANDING PAGE
   * ----------------------------------------------------
   */

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">

        <button
          className="brand"
          onClick={() => setPage("landing")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div className="brand-icon">
            <Sprout size={22} />
          </div>

          <span>
            AgriTrust
          </span>
        </button>

        <div className="nav-links">

          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#why-agritrust">
            Why AgriTrust
          </a>

        </div>

        <button
          className="nav-button"
          onClick={() => setPage("farmer-login")}
        >
          Get Started
        </button>

      </nav>

      {/* Hero */}
      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="eyebrow">

              <Leaf size={16} />

              Farmer-Owned Credit Identity

            </div>

            <h1>
              Your agricultural
              <span> history is your strength.</span>
            </h1>

            <p className="hero-description">

              AgriTrust turns verified agricultural activity into
              explainable credit intelligence — helping lenders
              understand farmers beyond traditional credit history.

            </p>

            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={() => setPage("farmer-login")}
              >
                I'm a Farmer

                <ArrowRight size={18} />

              </button>

              <button
                className="secondary-button"
                onClick={() => setPage("lender-login")}
              >
                I'm a Lender

                <ArrowRight size={18} />

              </button>

            </div>

            <div className="trust-line">

              <CheckCircle2 size={16} />

              <span>
                Privacy-preserving • Explainable • Farmer-controlled
              </span>

            </div>

          </div>

          {/* Hero visual */}
          <div className="hero-visual">

            <div className="visual-glow"></div>

            <div className="credit-card">

              <div className="card-header">

                <div>

                  <p className="small-label">
                    AGRI CREDIT IDENTITY
                  </p>

                  <h3>
                    Ramesh Kumar
                  </h3>

                </div>

                <div className="verified">

                  <ShieldCheck size={18} />

                  Verified

                </div>

              </div>

              <div className="score-section">

                <div className="score-circle">

                  <div>

                    <strong>
                      52
                    </strong>

                    <span>
                      /100
                    </span>

                  </div>

                </div>

                <div className="score-info">

                  <p>
                    Credit Readiness
                  </p>

                  <h4>
                    Developing
                  </h4>

                  <span>
                    Based on verified farm activity
                  </span>

                </div>

              </div>

              <div className="signals">

                <div className="signal">

                  <div className="signal-icon">
                    <Sprout size={17} />
                  </div>

                  <div>
                    <strong>
                      Production
                    </strong>

                    <span>
                      Analyzed
                    </span>
                  </div>

                </div>

                <div className="signal">

                  <div className="signal-icon">
                    <Leaf size={17} />
                  </div>

                  <div>
                    <strong>
                      Market Activity
                    </strong>

                    <span>
                      Analyzed
                    </span>
                  </div>

                </div>

                <div className="signal">

                  <div className="signal-icon">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <strong>
                      FPO
                    </strong>

                    <span>
                      Verified
                    </span>
                  </div>

                </div>

              </div>

            </div>

            <div className="floating-card floating-top">

              <Brain size={18} />

              <div>

                <strong>
                  Explainable AI
                </strong>

                <span>
                  Why this score?
                </span>

              </div>

            </div>

            <div className="floating-card floating-bottom">

              <ShieldCheck size={18} />

              <div>

                <strong>
                  Farmer Controlled
                </strong>

                <span>
                  Share only what matters
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* How it works */}
        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-heading">

            <p className="section-label">
              HOW IT WORKS
            </p>

            <h2>
              From agricultural activity to credit intelligence.
            </h2>

            <p>
              We connect meaningful agricultural signals and turn
              them into an understandable credit-readiness profile.
            </p>

          </div>

          <div className="flow">

            <div className="flow-card">

              <div className="flow-number">
                01
              </div>

              <Sprout size={28} />

              <h3>
                Verify Activity
              </h3>

              <p>
                Crop, production, market, insurance and FPO
                signals are brought together.
              </p>

            </div>

            <div className="flow-arrow">
              <ArrowRight />
            </div>

            <div className="flow-card">

              <div className="flow-number">
                02
              </div>

              <Brain size={28} />

              <h3>
                Analyze Signals
              </h3>

              <p>
                AgriTrust evaluates stability, agricultural risk
                and supporting evidence.
              </p>

            </div>

            <div className="flow-arrow">
              <ArrowRight />
            </div>

            <div className="flow-card">

              <div className="flow-number">
                03
              </div>

              <ShieldCheck size={28} />

              <h3>
                Share With Control
              </h3>

              <p>
                Farmers decide what relevant information is
                shared with a lender.
              </p>

            </div>

          </div>

        </section>

        {/* Value props */}
        <section
          className="values-section"
          id="why-agritrust"
        >

          <div className="value-card">

            <Sprout size={26} />

            <h3>
              Agricultural Intelligence
            </h3>

            <p>
              Convert agricultural history into signals that
              financial institutions can understand.
            </p>

          </div>

          <div className="value-card">

            <Brain size={26} />

            <h3>
              Explainable AI
            </h3>

            <p>
              Don't just give a score. Show the evidence and
              factors behind the assessment.
            </p>

          </div>

          <div className="value-card">

            <ShieldCheck size={26} />

            <h3>
              Farmer-Controlled Data
            </h3>

            <p>
              Give farmers meaningful control over what
              information gets shared and with whom.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;