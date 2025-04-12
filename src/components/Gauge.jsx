import React, { useEffect, useState } from "react";

const Gauge = ({ data }) => {
  const [animatedPositiveScore, setAnimatedPositiveScore] = useState(0);
  const [animatedNegativeScore, setAnimatedNegativeScore] = useState(0);

  const positiveScore =
    (data[0].find((item) => item.label === "POSITIVE")?.score || 0) * 100;
  const negativeScore =
    (data[0].find((item) => item.label === "NEGATIVE")?.score || 0) * 100;

  useEffect(() => {
    let positiveAnimationFrame;
    let negativeAnimationFrame;

    const animatePositive = () => {
      setAnimatedPositiveScore((prev) => {
        if (prev < positiveScore / 2) {
          positiveAnimationFrame = requestAnimationFrame(animatePositive);
          return prev + 0.05; // Make the animation even slower
        }
        return positiveScore / 2;
      });
    };

    const animateNegative = () => {
      setAnimatedNegativeScore((prev) => {
        if (prev < negativeScore / 2) {
          negativeAnimationFrame = requestAnimationFrame(animateNegative);
          return prev + 0.05; // Make the animation even slower
        }
        return negativeScore / 2;
      });
    };

    animatePositive();
    animateNegative();

    return () => {
      cancelAnimationFrame(positiveAnimationFrame);
      cancelAnimationFrame(negativeAnimationFrame);
    };
  }, [positiveScore, negativeScore]);

  return (
    <div className="relative size-80">
      <svg
        className="size-full rotate-180"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-orange-100 dark:text-neutral-700"
          strokeWidth="3"
          strokeDasharray="50 100"
          strokeLinecap="round"
        ></circle>

        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-green-600 dark:text-green-500"
          strokeWidth="1"
          strokeDasharray={`${animatedPositiveScore} 100`}
          strokeLinecap="round"
        ></circle>

        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-red-600 dark:text-red-500"
          strokeWidth="1"
          strokeDasharray={`${animatedNegativeScore} 100`}
          strokeDashoffset={`-${animatedPositiveScore}`}
          strokeLinecap="round"
        ></circle>
      </svg>

      <div className="absolute top-20 start-1/2 transform -translate-x-1/2 text-center">
        <span className="text-2xl font-bold text-green-600 dark:text-green-500">
          {positiveScore.toFixed(0)}% Positive
        </span>
        <span className="text-2xl font-bold text-red-600 dark:text-red-500 block">
          {negativeScore.toFixed(0)}% Negative
        </span>
      </div>
    </div>
  );
};

export default Gauge;
