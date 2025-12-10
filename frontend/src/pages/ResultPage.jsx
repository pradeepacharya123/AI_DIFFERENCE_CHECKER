import { useLocation, useNavigate } from "react-router-dom";
import StatsBar from "../components/StatsBar";
import DiffViewer from "../components/DiffViewer";
import SummaryPanel from "../components/SummaryPanel";
import { useState } from "react";
import { getSummary } from "../api/backend";
import Loader from "../components/Loader";
import "../styles/resultPage.css";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const diff = location.state?.diff;

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  if (!diff) {
    return (
      <div className="p-4">
        <h2>No data found. Please upload documents again.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handleSummary = async () => {
    try {
      setLoading(true);
      const res = await getSummary(diff.diff_text);

      // Extract summary_text safely
      let summaryText = "";
      if (Array.isArray(res.data) && res.data[0]?.summary_text) {
        summaryText = res.data[0].summary_text;
      } else if (res.data.summary) {
        summaryText = res.data.summary;
      } else {
        summaryText = "No summary returned from API.";
      }

      setSummary(summaryText);
    } catch (err) {
      console.error(err);
      alert("Summary failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="result-page">
      {loading && <Loader />}

      <StatsBar
        total={diff.total_changes}
        add={diff.add_pct}
        del={diff.del_pct}
      />

      <DiffViewer html={diff.html_diff} />

      <div className="generate-summary-container">
        <button className="generate-summary-btn" onClick={handleSummary}>
          Generate Summary
        </button>
      </div>

      {summary && <SummaryPanel text={summary} />}
    </div>
  );
}
