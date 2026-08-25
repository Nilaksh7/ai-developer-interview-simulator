import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import DifficultyBadge from "../components/DifficultyBadge";

function Interview() {
  const navigate = useNavigate();

  const INTERVIEW_DURATION = 45 * 60; // seconds
  const [timeLeft, setTimeLeft] = useState(INTERVIEW_DURATION);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [problems, setProblems] = useState([]);
  const [startTime] = useState(() => {
    const saved = localStorage.getItem("interviewStart");
    if (saved) return Number(saved);

    const now = Date.now();
    localStorage.setItem("interviewStart", now);
    return now;
  });

  const handleSubmitInterview = () => {
    setInterviewFinished(true);
    localStorage.removeItem("interviewProblems");
    localStorage.removeItem("interviewStart");
  };

  useEffect(() => {
    const fetchProblems = async () => {
      const saved = localStorage.getItem("interviewProblems");

      if (saved) {
        setProblems(JSON.parse(saved));
        return;
      }

      const res = await API.get("/problems");
      const shuffled = [...res.data].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);

      setProblems(selected);
      localStorage.setItem("interviewProblems", JSON.stringify(selected));
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = INTERVIEW_DURATION - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setInterviewFinished(true);
        clearInterval(timer);
        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      if (!interviewFinished) return;

      try {
        const res = await API.get("/submissions");

        const relevant = res.data.filter(
          (s) =>
            problems.some((p) => p._id === s.problemId._id) &&
            new Date(s.createdAt).getTime() >= startTime,
        );

        setEvaluations(relevant);
      } catch (err) {
        console.error("Failed to fetch evaluations", err);
      }
    };

    fetchEvaluations();
  }, [interviewFinished, problems]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Interview Mode
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Solve the selected problems within the time limit. This simulates a
            real technical interview.
          </p>
        </div>
        <div className="text-lg font-semibold bg-white/80 backdrop-blur border border-white/60 px-5 py-2 rounded-xl shadow-sm">
          ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </div>

      <Card className="mb-6 bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl">
        <div className="text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800 mb-1">Interview Rules</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>You have 45 minutes to solve the problems.</li>
            <li>Choose any problem and start solving.</li>
            <li>Your submissions will be recorded.</li>
          </ul>
        </div>
      </Card>

      {interviewFinished && (
        <Card className="mb-6 bg-white/80 backdrop-blur border border-white/60 rounded-2xl shadow-sm">
          <div className="p-4 space-y-3">
            <p className="text-sm font-semibold text-slate-800">
              Interview Summary
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">Problems</p>
                <p>{problems.length}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Time Given</p>
                <p>45 min</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Time Used</p>
                <p>{Math.floor((Date.now() - startTime) / 60000)} min</p>
              </div>

              <div>
                <p className="font-semibold text-slate-800">Status</p>
                <p className="text-red-600 font-medium">Interview Finished</p>
              </div>
            </div>

            <div className="text-xs text-red-600 font-medium">
              Interview time finished. You can no longer start new problems.
            </div>

            <div className="mt-4 border-t border-slate-200 pt-3">
              <p className="text-sm font-semibold text-slate-800 mb-2">
                AI Evaluation
              </p>

              <div className="text-xs text-slate-600 space-y-1">
                {evaluations.length === 0 ? (
                  <p>No submissions recorded during the interview.</p>
                ) : (
                  evaluations.map((s, idx) => (
                    <p key={s._id}>
                      Problem {idx + 1} ({s.problemId.title}): Score {s.aiScore}
                      /10
                    </p>
                  ))
                )}

                {evaluations.length > 0 && (
                  <p className="font-medium text-indigo-600 mt-2">
                    Overall Rating:{" "}
                    {(
                      evaluations.reduce(
                        (acc, cur) => acc + (cur.aiScore || 0),
                        0,
                      ) / evaluations.length
                    ).toFixed(1)}{" "}
                    / 10
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {!interviewFinished && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSubmitInterview}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Submit Interview
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {problems.map((problem) => (
          <Card
            key={problem._id}
            onClick={() => {
              if (!interviewFinished) {
                navigate(`/problem/${problem._id}`);
              }
            }}
            className={`bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl transition-all duration-200 ${
              interviewFinished
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:shadow-md hover:scale-[1.02]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {problem.title}
              </span>
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Interview;
