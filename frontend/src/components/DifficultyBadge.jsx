function DifficultyBadge({ difficulty }) {
  const colors = {
    easy: "text-green-600",
    medium: "text-yellow-600",
    hard: "text-red-600",
  };

  const label = difficulty ? difficulty.toLowerCase() : "";

  return (
    <span className={`text-sm font-medium ${colors[label] || "text-gray-600"}`}>
      {difficulty}
    </span>
  );
}

export default DifficultyBadge;
