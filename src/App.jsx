import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (text.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center relative">
      {/* Radial gradient layer */}
      <div className="absolute inset-0 bg-gray-900">
        <div
          className="w-full h-full bg-gradient-radial from-blue-500 via-purple-500 to-transparent opacity-50"
          style={{
            background:
              "radial-gradient(circle at 10% 10%, rgba(59,130,246,0.5) 30%, rgba(0,0,0,0) 70%)",
          }}
        ></div>
      </div>
      {/* Content */}
      <h1
        className={`text-4xl font-bold z-10 transition-all duration-500 ${
          submitted ? "opacity-0 translate-y-[-50px]" : "opacity-100"
        }`}
      >
        Sentiment Analyzer
      </h1>
      <div
        className={`mt-4 w-3/4 h-32 relative transition-all duration-500 ${
          submitted ? "translate-y-20" : ""
        }`}
      >
        <textarea
          className="p-4 w-full h-full bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 z-10 resize-none"
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button
          className={`absolute bottom-2 right-2 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
            text
              ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!text}
          onClick={handleSubmit}
        >
          Analyze
        </button>
      </div>
    </div>
  );
}

export default App;
