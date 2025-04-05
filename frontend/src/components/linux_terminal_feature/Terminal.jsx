import React, { useState, useEffect, useRef } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const inputRef = useRef(null); // To focus on the input field
  const historyRef = useRef([]); // To persist history

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const handleCommand = async (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    if (cmd === "clear") {
      setOutput([]);
      setInput("");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmd }),
      });

      const data = await res.text();
      setOutput((prev) => [...prev, `$ ${cmd}`, data]);
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(null); // Reset history index when a new command is typed
    } catch (err) {
      setOutput((prev) => [...prev, `$ ${cmd}`, "⚠️ Server error"]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      if (historyIndex === null) {
        setHistoryIndex(history.length - 1);
      } else if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
      }
      setInput(historyRef.current[historyIndex] || "");
    } else if (e.key === "ArrowDown") {
      if (historyIndex === null || historyIndex === history.length - 1) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(historyIndex + 1);
        setInput(historyRef.current[historyIndex + 1] || "");
      }
    }
  };

  return (
    <div className="bg-black text-green-400 p-4 h-screen font-mono overflow-auto">
      <div>
        {output.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex mt-2">
        <span className="mr-2">$</span>
        <input
          className="bg-black text-green-400 outline-none w-full"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          ref={inputRef}
        />
      </form>
    </div>
  );
};

export default Terminal;
