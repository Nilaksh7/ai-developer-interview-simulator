import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import DifficultyBadge from "../components/DifficultyBadge";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const navigate = useNavigate();

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || p.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await API.get("/problems");
        setProblems(res.data);
      } catch (err) {
        console.log("Error fetching problems");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4 md:px-8 py-6">
        <div className="flex items-center justify-center h-[50vh] text-gray-500">
          Loading problems...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 px-4 md:px-8 py-6">
      <div className="relative space-y-8">
        {/* Subtle tech grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Coding Problems
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Practice algorithm problems and improve your coding interview
            skills.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {filteredProblems.length} problem
            {filteredProblems.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-2 rounded-lg border border-slate-200 bg-white/70 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setDifficultyFilter("all")}
              className={`px-3 py-1 rounded-full border ${difficultyFilter === "all" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white/70 text-slate-600 border-slate-200"}`}
            >
              All
            </button>

            <button
              onClick={() => setDifficultyFilter("easy")}
              className={`px-3 py-1 rounded-full border ${difficultyFilter === "easy" ? "bg-green-500 text-white border-green-500" : "bg-white/70 text-slate-600 border-slate-200"}`}
            >
              Easy
            </button>

            <button
              onClick={() => setDifficultyFilter("medium")}
              className={`px-3 py-1 rounded-full border ${difficultyFilter === "medium" ? "bg-yellow-500 text-white border-yellow-500" : "bg-white/70 text-slate-600 border-slate-200"}`}
            >
              Medium
            </button>

            <button
              onClick={() => setDifficultyFilter("hard")}
              className={`px-3 py-1 rounded-full border ${difficultyFilter === "hard" ? "bg-red-500 text-white border-red-500" : "bg-white/70 text-slate-600 border-slate-200"}`}
            >
              Hard
            </button>
          </div>
        </div>

        <Card className="relative z-10 overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl hover:shadow-md transition-shadow duration-200">
          {/* Table Header */}
          <div className="grid grid-cols-2 border-b border-slate-200 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-white/40">
            <span>Title</span>
            <span className="text-right">Difficulty</span>
          </div>

          {/* Problems List */}
          {filteredProblems.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No problems found
            </div>
          ) : (
            filteredProblems.map((problem) => (
              <div
                key={problem._id}
                onClick={() => navigate(`/problem/${problem._id}`)}
                className="grid grid-cols-2 px-6 py-4 items-center border-b border-slate-100 last:border-none cursor-pointer hover:bg-white/60 hover:scale-[1.01] transition-all duration-200 group"
              >
                <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {problem.title}
                </span>

                <div className="flex justify-end">
                  <DifficultyBadge difficulty={problem.difficulty} />
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}

export default Problems;
