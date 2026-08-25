import Card from "./Card";

function ActionCard({ title, desc, onClick, tag }) {
  return (
    <Card
      onClick={onClick}
      className="group relative flex flex-col justify-between p-8 bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm cursor-pointer rounded-[2rem] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-indigo-50 via-transparent to-teal-50"></div>

      <div>
        <span className="inline-block px-2 py-0.5 mb-4 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 rounded">
          {tag}
        </span>

        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>

      <div className="mt-6 flex items-center text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
        Explore
        <span className="ml-1 transform group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </Card>
  );
}

export default ActionCard;
