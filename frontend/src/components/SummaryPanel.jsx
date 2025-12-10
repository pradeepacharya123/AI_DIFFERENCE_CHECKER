export default function SummaryPanel({ text }) {
  return (
    <div className="summary-panel">
      <h3 className="summary-title">Summary of Changes</h3>
      <p className="summary-text">{text}</p>
    </div>
  );
}
