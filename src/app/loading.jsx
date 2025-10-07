const loading = () => {
  return (
    <div className="container px-3 md:px-8 lg:px-20 w-full max-w-screen-2xl mx-auto min-h-[calc(100vh-100px)] flex items-start justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="100"
        height="100"
        style={{
          margin: "auto",
          shapeRendering: "auto",
          display: "block",
          background: "transparent",
        }}
      >
        <radialGradient
          id="a9"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stopColor="#4F95FF"></stop>
          <stop offset=".3" stopColor="#4F95FF" stopOpacity=".9"></stop>
          <stop offset=".6" stopColor="#4F95FF" stopOpacity=".6"></stop>
          <stop offset=".8" stopColor="#4F95FF" stopOpacity=".3"></stop>
          <stop offset="1" stopColor="#4F95FF" stopOpacity="0"></stop>
        </radialGradient>
        <circle
          transformOrigin="center"
          fill="none"
          stroke="url(#a9)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="200 1000"
          strokeDashoffset="0"
          cx="100"
          cy="100"
          r="70"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="2"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          transformOrigin="center"
          fill="none"
          opacity=".2"
          stroke="#00B140" 
          strokeWidth="15"
          strokeLinecap="round"
          cx="100"
          cy="100"
          r="70"
        ></circle>
      </svg>
    </div>
  );
};

export default loading;
