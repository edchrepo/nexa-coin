// Skeleton for animated loading chart
const ChartSkeleton = () => {
  return (
    <div className="animate-pulse relative overflow-hidden">
      <svg viewBox="0 0 400 120" className="w-full">
        {/* Axes */}
        <line
          x1="10"
          y1="110"
          x2="390"
          y2="110"
          stroke="#ccc"
          strokeWidth="2"
        />
        <line x1="10" y1="10" x2="10" y2="110" stroke="#ccc" strokeWidth="2" />
        {/* Line Animations */}
        <path
          d="M10,70 Q100,20 200,70 T390,70"
          fill="none"
          stroke="#bbb"
          strokeWidth="2"
          strokeDasharray="0"
          className="skeleton-animate"
        />
      </svg>

      <style jsx>{`
        @keyframes skeleton-loading {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .skeleton-animate {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: skeleton-loading 2s infinite linear forwards;
        }
      `}</style>
    </div>
  );
};
export default ChartSkeleton;
