import React, { useState, useEffect } from "react";

const Translate = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("Spanish"); // default target language (Spanish)
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/translate");
    ws.onmessage = (event) => setOutput(event.data);
    setSocket(ws);

    return () => ws.close();
  }, []);

  const handleTranslate = () => {
    if (socket && input) {
      // Send both text + target language to backend
      const payload = JSON.stringify({ text: input, target: language });
      socket.send(payload);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">🗣️ Translate in Real-Time</h2>

      {/* Language Dropdown */}
      <label className="block mb-2 font-semibold">Choose Target Language:</label>
      <select
        className="p-2 border rounded mb-4"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="es">Spanish </option>
        <option value="fr">French </option>
        <option value="de">German </option>
        <option value="hi">Hindi </option>
        <option value="zh">Chinese </option>
        <option value="ar">Arabic </option>
      </select>

      {/* Input Box */}
      <textarea
        className="w-full p-3 border rounded mb-2"
        placeholder="Type something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleTranslate}
      >
        Translate
      </button>

      <div className="mt-4 bg-gray-100 p-3 rounded">
        <strong>Translated:</strong> {output}
      </div>
    </div>
  );
};

export default Translate;