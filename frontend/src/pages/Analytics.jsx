import { useEffect, useState } from "react";
import API from "../services/api";
import Card from "../components/Card";

function Analytics() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await API.get("/submissions");
      setSubmissions(res.data);
    };

    fetchSubmissions();
  }, []);

  const total = submissions.length;

  const accepted = submissions.filter((s) => s.status === "accepted").length;

  const avgScore =
    submissions.length > 0
      ? (
          submissions.reduce((a, b) => a + (b.aiScore || 0), 0) /
          submissions.length
        ).toFixed(1)
      : 0;

  const successRate = total > 0 ? ((accepted / total) * 100).toFixed(0) : 0;

  let interviewFeedback =
    "Start solving problems to receive AI interview feedback.";

  if (total > 0) {
    if (successRate >= 80 && avgScore >= 8) {
      interviewFeedback =
        "Excellent performance. You consistently solved problems with strong code quality and efficiency. Continue practicing harder problems to simulate real technical interviews.";
    } else if (successRate >= 60) {
      interviewFeedback =
        "Good progress. You are solving many problems but there is room for improvement in optimization, edge cases, and clean coding practices.";
    } else if (successRate >= 40) {
      interviewFeedback =
        "Moderate performance. Focus on improving problem understanding, debugging strategies, and algorithm fundamentals.";
    } else {
      interviewFeedback =
        "You should spend more time practicing coding problems and reviewing basic data structures and algorithms before attempting mock interviews.";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4 md:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Your Interview Analytics
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Track your performance, AI scores, and coding progress.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-5 bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total Submissions
          </p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{total}</p>
        </Card>

        <Card className="p-5 bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Problems Solved
          </p>
          <p className="text-3xl font-bold text-green-600 mt-1">{accepted}</p>
        </Card>

        <Card className="p-5 bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Average AI Score
          </p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">{avgScore}</p>
        </Card>

        <Card className="p-5 bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Success Rate
          </p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {successRate}%
          </p>
        </Card>
      </div>

      <Card className="p-6 bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Submissions
        </h2>

        <div className="space-y-2">
          {submissions.slice(0, 5).map((s) => (
            <div
              key={s._id}
              className="flex justify-between items-center text-sm border-b border-slate-100 py-2 hover:bg-white/50 px-2 rounded transition"
            >
              <span className="font-medium text-slate-800">
                {s.problemId.title}
              </span>

              <span className="text-slate-500 text-xs font-medium">
                {s.status} • Score {s.aiScore}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 mt-6 bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          AI Interviewer Feedback
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          {interviewFeedback}
        </p>
      </Card>
    </div>
  );
}

export default Analytics;
