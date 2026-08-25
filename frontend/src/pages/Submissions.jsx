import { useEffect, useState } from "react";
import API from "../services/api";
import Card from "../components/Card";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get("/submissions");
        setSubmissions(res.data);
      } catch (error) {
        console.log("Error fetching submissions");
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4 md:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Submission History
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          Review your past submissions and track your progress.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-16 bg-white/80 backdrop-blur border border-white/60 rounded-2xl shadow-sm">
          <p className="text-gray-600 text-lg">No submissions yet.</p>
          <p className="text-gray-400 text-sm mt-2">
            Start solving problems to see your submissions here.
          </p>
        </div>
      ) : (
        <Card className="overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl">
          <div className="grid grid-cols-3 border-b border-slate-200 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-white/40">
            <span>Problem</span>
            <span>Status</span>
            <span>Submitted</span>
          </div>

          {submissions.map((submission) => (
            <div
              key={submission._id}
              className="grid grid-cols-3 px-6 py-4 items-center border-b border-slate-100 last:border-none hover:bg-white/60 transition-all duration-200"
            >
              <span className="font-semibold text-slate-900">
                {submission.problemId.title}
              </span>

              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full w-fit ${
                  submission.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submission.status}
              </span>

              <span className="text-sm text-slate-500">
                {new Date(submission.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

export default Submissions;
