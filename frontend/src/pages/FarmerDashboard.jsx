import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Leaf,
  MapPin,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";

function FarmerDashboard({ onCreditReadiness }) {
  return (
    <div className="farmer-page">

      {/* Dashboard Header */}
      <header className="dashboard-header">

        <div className="brand">
          <div className="brand-icon">
            <Sprout size={22} />
          </div>

          <span>AgriTrust</span>
        </div>

        <div className="header-actions">
          <button className="icon-button">
            <Bell size={20} />
          </button>

          <div className="profile-avatar">
            RK
          </div>
        </div>

      </header>

      {/* Main Content */}
      <main className="dashboard-container">

        {/* Welcome */}
        <section className="welcome-section">

          <div>
            <p className="dashboard-label">
              FARMER DASHBOARD
            </p>

            <h1>
              Good morning, Ramesh 👋
            </h1>

            <p>
              Your agricultural identity is building a stronger
              picture of your credit readiness.
            </p>
          </div>

          <div className="identity-status">
            <CheckCircle2 size={20} />
            Identity Active
          </div>

        </section>

        {/* Farmer Profile */}
        <section className="profile-card">

          <div className="profile-main">

            <div className="large-avatar">
              RK
            </div>

            <div>
              <p className="profile-label">
                FARMER PROFILE
              </p>

              <h2>Ramesh Kumar</h2>

              <div className="location">
                <MapPin size={15} />
                Nashik, Maharashtra
              </div>
            </div>

          </div>

          <div className="profile-details">

            <div>
              <span>Primary Crop</span>
              <strong>Onion</strong>
            </div>

            <div>
              <span>Farm Size</span>
              <strong>2.5 acres</strong>
            </div>

            <div>
              <span>FPO</span>
              <strong>Nashik Farmers FPO</strong>
            </div>

          </div>

        </section>

        {/* Evidence */}
        <section className="evidence-section">

          <div className="section-title">
            <div>
              <p className="dashboard-label">
                VERIFIED EVIDENCE
              </p>

              <h2>
                Your agricultural activity
              </h2>
            </div>

            <span className="verified-count">
              4 of 4 verified
            </span>
          </div>

          <div className="evidence-grid">

            <div className="evidence-card">
              <div className="evidence-icon">
                <Sprout size={24} />
              </div>

              <div>
                <h3>Production</h3>
                <p>Crop activity verified</p>
              </div>

              <CheckCircle2 className="check-icon" size={20} />
            </div>

            <div className="evidence-card">
              <div className="evidence-icon">
                <Leaf size={24} />
              </div>

              <div>
                <h3>Market Activity</h3>
                <p>Mandi activity verified</p>
              </div>

              <CheckCircle2 className="check-icon" size={20} />
            </div>

            <div className="evidence-card">
              <div className="evidence-icon">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3>Insurance</h3>
                <p>Coverage history verified</p>
              </div>

              <CheckCircle2 className="check-icon" size={20} />
            </div>

            <div className="evidence-card">
              <div className="evidence-icon">
                <Users size={24} />
              </div>

              <div>
                <h3>FPO Participation</h3>
                <p>Membership verified</p>
              </div>

              <CheckCircle2 className="check-icon" size={20} />
            </div>

          </div>

        </section>

        {/* Next Step */}
        <section className="readiness-banner">

          <div className="readiness-icon">
            <ShieldCheck size={28} />
          </div>

          <div className="readiness-content">
            <p>YOUR NEXT STEP</p>

            <h2>
              See your Credit Readiness
            </h2>

            <span>
              Understand what your agricultural activity says
              about your financial readiness.
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

      </main>

    </div>
  );
}

export default FarmerDashboard;