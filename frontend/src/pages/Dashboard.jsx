import { useNavigate } from "react-router-dom";
import ActionCard from "../components/ActionCard";

function Dashboard() {
  const navigate = useNavigate();

  return (
    /* Changed to min-h-screen and removed the translate hacks. 
       Used a subtle slate-50 background for a premium look. */
    <div className="min-h-screen w-fullbg-gradient-to-br from-slate-100 via-blue-100 to-indigo-200 text-slate-900 font-sans selection:bg-indigo-100">
      {/* 1. Global Background Pattern (Clean & Subtle) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* 2. Main Container - This fixes your "distant corners" and alignment issues */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Hero Section: High Contrast Dark Mode */}
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl shadow-indigo-500/10">
          {/* Subtle Glow Effects */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />

          <div className="relative z-10 p-8 md:p-20">
            <div className="max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Next-Generation Practice
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
                Master the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">
                  Technical Interview
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
                The ultimate environment for developers. Solve complex
                algorithms and refine code with AI-powered insights.
              </p>

              <div className="flex flex-wrap gap-5 pt-4">
                <button
                  onClick={() => navigate("/problems")}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                >
                  Start Solving
                </button>
                <button
                  onClick={() => navigate("/interview")}
                  className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-bold backdrop-blur-md hover:bg-white/10 transition-all duration-300"
                >
                  Interview Mode
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Stats: Modern Glass Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Problems", value: "100+", color: "text-indigo-600" },
            { label: "Languages", value: "4", color: "text-blue-600" },
            {
              label: "AI Analysis",
              value: "Active",
              color: "text-emerald-600",
            },
            { label: "Success", value: "98%", color: "text-indigo-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-3xl bg-white/90 backdrop-blur border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </span>
              <p className={`text-3xl font-black mt-1 ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">
                Training Modules
              </h2>
              <div className="h-1.5 w-20 bg-indigo-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <ActionCard
              title="🧩 Solve Problems"
              desc="Practice algorithm challenges and improve your coding logic."
              onClick={() => navigate("/problems")}
              tag="Algorithm"
            />
            <ActionCard
              title="⏱ Interview Mode"
              desc="Simulate real-world pressure with timed sessions and random tasks."
              onClick={() => navigate("/interview")}
              tag="Simulation"
            />
            <ActionCard
              title="📊 History"
              desc="Review previous submissions and track your AI feedback history."
              onClick={() => navigate("/submissions")}
              tag="Analytics"
            />
          </div>
        </div>

        {/* Feature Highlights: Minimal & Clean */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-10 bg-white/70 backdrop-blur rounded-[3rem] border border-slate-200 shadow-sm">
          <Feature
            icon="⚡"
            title="Fast Execution"
            desc="Isolated Docker environments for JS, Python, and C++."
          />
          <Feature
            icon="🤖"
            title="AI Code Review"
            desc="Instant feedback on time complexity and logic."
          />
          <Feature
            icon="🧠"
            title="Mental Rigor"
            desc="Built-in timer to mirror top tech firm conditions."
          />
        </div>

        {/* Platform Footer */}
        <footer className="border-t border-slate-200 pt-14 pb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black text-xl shadow-lg">
              N
            </div>
            <div>
              <p className="font-bold text-slate-900">Nilaksh • NIT Delhi</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">
                AI Interview Simulator
              </p>
            </div>
          </div>

          <div className="flex gap-10">
            <FooterLink href="https://github.com/Nilaksh7" label="GitHub" />
            <FooterLink
              href="https://www.linkedin.com/in/nilaksh-berwal-g07071952/"
              label="LinkedIn"
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

/* Helper Components to keep the main code clean */
const Feature = ({ icon, title, desc }) => (
  <div className="space-y-3">
    <div className="text-3xl">{icon}</div>
    <h3 className="font-bold text-lg text-slate-900">{title}</h3>
    <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const FooterLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
  >
    {label}
  </a>
);

export default Dashboard;
