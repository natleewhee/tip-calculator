import { useState } from "react";

const TIP_OPTIONS = [10, 15, 20];

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState(1);
  const [tip, setTip] = useState(15);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = billNum * (tip / 100);
  const total = billNum + tipAmount;
  const perPerson = people > 0 ? total / people : 0;
  const tipPerPerson = people > 0 ? tipAmount / people : 0;

  const fmt = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f0e8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; }

        .card {
          background: #faf7f2;
          border: 1px solid #ddd5c4;
          border-radius: 2px;
          width: 100%;
          max-width: 420px;
          overflow: hidden;
          box-shadow: 0 2px 40px rgba(0,0,0,0.06);
        }

        .header {
          background: #1c1612;
          padding: 28px 32px 24px;
          color: #f5f0e8;
        }

        .header-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a89880;
          margin-bottom: 6px;
        }

        .header-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px;
          font-weight: 700;
          color: #f5f0e8;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .body {
          padding: 28px 32px;
        }

        .field {
          margin-bottom: 22px;
        }

        .field-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8c7d6e;
          margin-bottom: 8px;
          display: block;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .prefix {
          position: absolute;
          left: 14px;
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          color: #b0a090;
          pointer-events: none;
          line-height: 1;
        }

        .input {
          width: 100%;
          padding: 12px 14px 12px 30px;
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #1c1612;
          background: #fff;
          border: 1px solid #ddd5c4;
          border-radius: 2px;
          outline: none;
          transition: border-color 0.15s;
          appearance: none;
          -webkit-appearance: none;
        }

        .input:focus {
          border-color: #8c7d6e;
        }

        .input-plain {
          padding-left: 14px;
        }

        .stepper {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid #ddd5c4;
          border-radius: 2px;
          overflow: hidden;
          background: #fff;
        }

        .step-btn {
          width: 44px;
          height: 48px;
          background: none;
          border: none;
          cursor: pointer;
          color: #8c7d6e;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.1s, color 0.1s;
          flex-shrink: 0;
          font-family: 'DM Mono', monospace;
          line-height: 1;
        }

        .step-btn:hover { background: #f0ebe2; color: #1c1612; }
        .step-btn:active { background: #e8e0d4; }

        .step-val {
          flex: 1;
          text-align: center;
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #1c1612;
          border-left: 1px solid #ddd5c4;
          border-right: 1px solid #ddd5c4;
          padding: 12px 0;
          line-height: 1.2;
          user-select: none;
        }

        .tip-group {
          display: flex;
          gap: 8px;
        }

        .tip-btn {
          flex: 1;
          padding: 11px 0;
          border: 1px solid #ddd5c4;
          border-radius: 2px;
          background: #fff;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #8c7d6e;
          letter-spacing: 0.05em;
          transition: all 0.15s;
        }

        .tip-btn:hover { background: #f0ebe2; color: #1c1612; border-color: #b0a090; }

        .tip-btn.active {
          background: #1c1612;
          border-color: #1c1612;
          color: #f5f0e8;
        }

        .divider {
          height: 1px;
          background: #ddd5c4;
          margin: 4px 0 24px;
        }

        .results {
          background: #1c1612;
          border-radius: 2px;
          padding: 22px 24px;
        }

        .result-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 14px;
        }

        .result-row:last-child { margin-bottom: 0; }

        .result-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7a6e62;
        }

        .result-val {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #f5f0e8;
          letter-spacing: -0.01em;
        }

        .result-row.highlight .result-val {
          font-size: 26px;
          color: #e8d5a3;
        }

        .result-row.highlight .result-label {
          color: #a89880;
        }

        .result-sep {
          height: 1px;
          background: #2e2820;
          margin: 14px 0;
        }

        .reset-btn {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          background: none;
          border: 1px solid #ddd5c4;
          border-radius: 2px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b0a090;
          cursor: pointer;
          transition: all 0.15s;
        }

        .reset-btn:hover {
          background: #f0ebe2;
          color: #1c1612;
          border-color: #b0a090;
        }
      `}</style>

      <div className="card">
        <div className="header">
          <div className="header-label">Bill Calculator</div>
          <div className="header-title">Tip & Split</div>
        </div>

        <div className="body">
          {/* Bill Amount */}
          <div className="field">
            <label className="field-label">Bill Amount</label>
            <div className="input-wrap">
              <span className="prefix">$</span>
              <input
                className="input"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </div>
          </div>

          {/* Tip % */}
          <div className="field">
            <label className="field-label">Tip Percentage</label>
            <div className="tip-group">
              {TIP_OPTIONS.map((t) => (
                <button
                  key={t}
                  className={`tip-btn${tip === t ? " active" : ""}`}
                  onClick={() => setTip(t)}
                >
                  {t}%
                </button>
              ))}
            </div>
          </div>

          {/* People */}
          <div className="field">
            <label className="field-label">Split Between</label>
            <div className="stepper">
              <button
                className="step-btn"
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                aria-label="decrease"
              >−</button>
              <div className="step-val">
                {people} {people === 1 ? "person" : "people"}
              </div>
              <button
                className="step-btn"
                onClick={() => setPeople((p) => p + 1)}
                aria-label="increase"
              >+</button>
            </div>
          </div>

          <div className="divider" />

          {/* Results */}
          <div className="results">
            <div className="result-row">
              <span className="result-label">Bill</span>
              <span className="result-val">{fmt(billNum)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Tip ({tip}%)</span>
              <span className="result-val">{fmt(tipAmount)}</span>
            </div>
            <div className="result-sep" />
            {people > 1 && (
              <>
                <div className="result-row">
                  <span className="result-label">Tip / person</span>
                  <span className="result-val">{fmt(tipPerPerson)}</span>
                </div>
                <div className="result-row highlight">
                  <span className="result-label">Each pays</span>
                  <span className="result-val">{fmt(perPerson)}</span>
                </div>
              </>
            )}
            {people === 1 && (
              <div className="result-row highlight">
                <span className="result-label">Total</span>
                <span className="result-val">{fmt(total)}</span>
              </div>
            )}
          </div>

          <button
            className="reset-btn"
            onClick={() => { setBill(""); setPeople(1); setTip(15); }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}