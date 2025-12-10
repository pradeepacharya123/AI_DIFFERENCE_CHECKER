import "../styles/statsBar.css";

export default function StatsBar({ total, add, del }) {
  return (
    <div className="stats-bar">

      <div className="stat-box">
        <span className="stat-title">Total Changes</span>
        <span className="stat-number">{total}</span>
      </div>

      <div className="stat-box">
        <span className="stat-title">Additions</span>
        <span className="stat-number add">{add}%</span>
      </div>

      <div className="stat-box">
        <span className="stat-title">Deletions</span>
        <span className="stat-number del">{del}%</span>
      </div>

    </div>
  );
}
