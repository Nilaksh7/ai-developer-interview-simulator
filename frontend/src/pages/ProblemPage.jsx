import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import API from "../services/api";
import Card from "../components/Card";
import DifficultyBadge from "../components/DifficultyBadge";
import ReactMarkdown from "react-markdown";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [result, setResult] = useState(null);
  const [runOutput, setRunOutput] = useState(null);
  const [code, setCode] = useState(
    `function solution(){

    }`,
  );

  const [language, setLanguage] = useState("javascript");
  const [leftWidth, setLeftWidth] = useState(35);
  const [focusEditor, setFocusEditor] = useState(false);

  const [nextProblemId, setNextProblemId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [totalProblems, setTotalProblems] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const isResizing = useRef(false);

  useEffect(() => {
    const fetchProblem = async () => {
      const res = await API.get(`/problems/${id}`);
      setProblem(res.data);

      if (res.data.starterCode) {
        setCode(res.data.starterCode);
      }
    };

    fetchProblem();

    const stored = localStorage.getItem("interviewProblems");
    if (stored) {
      try {
        const arr = JSON.parse(stored);

        setTotalProblems(arr.length);

        const idx = arr.findIndex((p) => String(p._id || p.id) === String(id));

        if (idx === -1) {
          navigate("/interview");
          return;
        }

        setCurrentIndex(idx);

        if (idx < arr.length - 1) {
          const next = arr[idx + 1];
          setNextProblemId(next._id || next.id);
        }

        const start = localStorage.getItem("interviewStart");
        if (start) {
          const INTERVIEW_DURATION = 45 * 60;

          const updateTimer = () => {
            const elapsed = Math.floor((Date.now() - Number(start)) / 1000);
            const remaining = INTERVIEW_DURATION - elapsed;

            if (remaining <= 0) {
              setTimeLeft(0);
              navigate("/interview");
              return;
            }

            setTimeLeft(remaining);
          };

          updateTimer();
          const timer = setInterval(updateTimer, 1000);

          return () => clearInterval(timer);
        }
      } catch (e) {
        console.log("Interview navigation parse failed");
      }
    }
  }, [id]);

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading problem...
      </div>
    );
  }

  const handleRun = async () => {
    try {
      const res = await API.post("/submissions/run", {
        problemId: id,
        code: code,
        language: language,
      });

      setRunOutput(res.data.output);
    } catch (error) {
      console.log("Run failed");
    }
  };

  const handleSubmit = async () => {
    try {
      await API.get("/auth/me");
    } catch (err) {
      alert("Please login to submit your solution");
      navigate("/login");
      return;
    }

    try {
      const res = await API.post("/submissions", {
        problemId: id,
        code: code,
        language: language,
      });

      setResult(res.data);
    } catch (error) {
      console.log("Submission failed");
    }
  };

  const startResize = () => {
    isResizing.current = true;
  };

  const stopResize = () => {
    isResizing.current = false;
  };

  const handleResize = (e) => {
    if (!isResizing.current) return;

    const newWidth = (e.clientX / window.innerWidth) * 100;

    if (newWidth > 15 && newWidth < 70) {
      setLeftWidth(newWidth);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 overflow-hidden">
      {/* Page Header */}
      <div className="relative z-10 flex items-center justify-between mb-3 px-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            {problem.title}
          </h1>
          {currentIndex !== null && totalProblems !== null && (
            <div className="text-xs text-slate-500 mt-1">
              Question {currentIndex + 1} / {totalProblems}
            </div>
          )}

          {timeLeft !== null && (
            <div className="text-xs text-red-600 font-semibold mt-1">
              Time Left: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </div>
          )}
          <div className="mt-1">
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFocusEditor((prev) => !prev)}
            className="text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            {focusEditor ? "Show Description" : "Focus Editor"}
          </button>

          <button
            onClick={() => navigate("/problems")}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Problems
          </button>
        </div>
      </div>
      {/* subtle tech grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div
        className="relative z-10 flex h-[calc(100vh-90px)]"
        onMouseMove={handleResize}
        onMouseUp={stopResize}
      >
        {/* LEFT SIDE - Problem Description */}
        {!focusEditor && (
          <div style={{ width: `${leftWidth}%` }} className="pr-2 h-full">
            <Card className="overflow-y-auto p-6 space-y-4 h-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl custom-scroll">
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                <ReactMarkdown>{problem.description}</ReactMarkdown>
              </div>
              {problem.testCases && (
                <div className="mt-6">
                  <p className="font-semibold text-slate-800 mb-2">
                    Example Test Cases
                  </p>

                  {problem.testCases.map((t, i) => (
                    <div
                      key={i}
                      className="text-xs bg-slate-50 border border-slate-200 rounded p-2 mb-2"
                    >
                      <p>
                        <strong>Input:</strong> {t.input}
                      </p>
                      <p>
                        <strong>Output:</strong> {t.output}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {!focusEditor && (
          <div
            className="w-1 cursor-col-resize bg-slate-200 hover:bg-indigo-400 transition"
            onMouseDown={startResize}
          />
        )}

        {/* RIGHT SIDE - Code Editor */}
        <div
          style={{ width: focusEditor ? "100%" : `${100 - leftWidth}%` }}
          className={`h-full flex flex-1 ${focusEditor ? "pl-0" : "pl-2"}`}
        >
          <Card className="flex flex-col p-0 overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl h-full w-full">
            <div className="border-b border-slate-200 bg-white/40 backdrop-blur px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Language
                </span>
                <select
                  className="border border-slate-200 bg-white/70 backdrop-blur px-3 py-2 rounded text-sm"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition"
                  onClick={handleRun}
                >
                  Run
                </button>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                language={language === "cpp" ? "cpp" : language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
              />
            </div>

            {(result || runOutput) && (
              <div className="border-t border-slate-200 bg-white/40 backdrop-blur p-4 space-y-3">
                {runOutput && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Run Output
                    </p>
                    <div className="text-xs font-mono text-slate-700 bg-slate-50 rounded p-3 overflow-auto max-h-28">
                      {runOutput}
                    </div>
                  </div>
                )}

                {result && (
                  <div>
                    <p className="text-sm font-medium">
                      Status: {result.status}
                    </p>

                    {result.aiScore !== undefined && (
                      <p className="text-sm text-slate-700 mt-1">
                        <strong>AI Score:</strong> {result.aiScore} / 10
                      </p>
                    )}

                    {result.timeComplexity && (
                      <p className="text-sm text-slate-700">
                        <strong>Time Complexity:</strong>{" "}
                        {result.timeComplexity}
                      </p>
                    )}

                    {result.spaceComplexity && (
                      <p className="text-sm text-slate-700">
                        <strong>Space Complexity:</strong>{" "}
                        {result.spaceComplexity}
                      </p>
                    )}

                    {result.codeQuality !== undefined && (
                      <p className="text-sm text-slate-700">
                        <strong>Code Quality:</strong> {result.codeQuality} / 10
                      </p>
                    )}

                    {result.aiFeedback && (
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        {result.aiFeedback}
                      </p>
                    )}

                    {result.issues && result.issues.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
                          Issues
                        </p>
                        <ul className="text-xs text-slate-700 list-disc ml-4">
                          {result.issues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.improvements && result.improvements.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">
                          Improvements
                        </p>
                        <ul className="text-xs text-slate-700 list-disc ml-4">
                          {result.improvements.map((imp, i) => (
                            <li key={i}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {nextProblemId && (
                      <button
                        onClick={() => navigate(`/problems/${nextProblemId}`)}
                        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                      >
                        Next Question →
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;
