import { useState } from "react";

const PasswordForm = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [strongMode, setStrongMode] = useState(false);
  const [inputValue, setInputValue] = useState("8");
  const [lengthError, setLengthError] = useState("");
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [label, setLabel] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [viewPassword, setViewPassword] = useState(null);
  const [enteredKey, setEnteredKey] = useState("");
  const [viewError, setViewError] = useState("");

  const handleLengthInput = (e) => {
    const val = e.target.value;

    if (/^\d*$/.test(val)) {
      setInputValue(val);
      const num = parseInt(val, 10);
      if (val === "") {
        setLength(0);
        setLengthError("");
        return;
      }

      if (num >= 4 && num <= 15) {
        setLength(num);
        setLengthError("");
        setPassword("");
        setStrongMode(false);
      } else {
        setLength(num);
        setLengthError("Password length must be between 4 and 15.");
      }
    }
  };

  const generateSimplePassword = () => {
    if (length < 4 || length > 15) {
      setLengthError("Password length must be between 4 and 15.");
      return;
    }

    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let charsPool = chars + numbers.slice(0, 3);
    let result = "";

    for (let i = 0; i < length; i++) {
      result += charsPool.charAt(Math.floor(Math.random() * charsPool.length));
    }

    setPassword(result);
    setStrongMode(true);
    setShowLabelInput(false);
    setSavedMessage("");
  };

  const generateStrongPassword = () => {
    if (length < 4 || length > 15) {
      alert("Password length must be between 4 and 15.");
      return;
    }

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!#$%^&*()-_=+[]{}|;:,.<>?@";

    const mustInclude = [
      upper[Math.floor(Math.random() * upper.length)],
      lower[Math.floor(Math.random() * lower.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      "@",
    ];

    const allChars = upper + lower + numbers + special;
    let remainingLength = length - mustInclude.length;
    let result = mustInclude.join("");

    for (let i = 0; i < remainingLength; i++) {
      result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    const shuffled = result
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    setPassword(shuffled);
    setStrongMode(false);
    setShowLabelInput(false);
    setSavedMessage("");
  };

  const handleSaveLabel = () => {
    if (label.trim() !== "" && secretKey.trim() !== "") {
      const encodedPassword = btoa(password); // base64 encode
      setSavedPasswords((prev) => [
        ...prev,
        {
          label: label.trim(),
          password: encodedPassword,
          secretKey: secretKey.trim(),
          revealedPassword: null,
        },
      ]);
      setSavedMessage(`✅ Saved "${label}" with password.`);
      setLabel("");
      setSecretKey("");
      setShowLabelInput(false);
    }
  };

  const handleViewPassword = (index) => {
    setViewPassword(index);
    setEnteredKey("");
    setViewError("");
  };

  const handleCheckKey = (index) => {
    const item = savedPasswords[index];
    if (enteredKey === item.secretKey) {
      const updated = [...savedPasswords];
      updated[index].revealedPassword = atob(item.password);
      setSavedPasswords(updated);
      setViewPassword(null);
    } else {
      setViewError("❌ Incorrect Secret Key");
    }
  };

  return (
    <div className="min-h-[75vh] bg-gray-900 text-white flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6">
        {/* Password Generator Left Panel */}
        <div className="flex-1 p-6 rounded-2xl bg-gray-800 shadow-2xl space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-400">
            🔐 Password Generator
          </h1>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Password Length (4 to 15)
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleLengthInput}
              placeholder="Enter length"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={2}
            />
            {lengthError && (
              <p className="text-red-400 text-sm mt-1">{lengthError}</p>
            )}
          </div>

          <button
            onClick={generateSimplePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Generate Password
          </button>

          {password && (
            <div className="text-center space-y-3">
              <p className="text-gray-300">Your Password:</p>
              <p className="text-lg font-mono bg-gray-700 px-4 py-2 rounded-lg break-all">
                {password}
              </p>

              {strongMode && (
                <button
                  onClick={generateStrongPassword}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Make it Strong 💪
                </button>
              )}

              <button
                onClick={() => setShowLabelInput(true)}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg transition duration-300"
              >
                Add Label to Save 🏷️
              </button>

              {showLabelInput && (
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    placeholder="Enter label (e.g. Instagram)"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="password"
                    placeholder="Enter secret key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    onClick={handleSaveLabel}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition duration-300 w-full"
                  >
                    Save Label
                  </button>
                </div>
              )}

              {savedMessage && (
                <p className="text-green-400 text-sm mt-2">{savedMessage}</p>
              )}
            </div>
          )}
        </div>

        {/* Saved Passwords Right Panel */}
        {savedPasswords.length > 0 && (
          <div className="flex-1 p-6 rounded-2xl bg-gray-800 shadow-2xl space-y-4">
            <h2 className="text-xl font-semibold text-yellow-400">
              🔒 Saved Passwords
            </h2>
            {savedPasswords.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-md flex flex-col"
              >
                <p className="text-sm text-gray-400">Label:</p>
                <p className="text-base font-semibold text-white mb-2">{item.label}</p>
                <p className="text-sm text-gray-400">Password:</p>
                <p className="font-mono break-all text-green-300 mb-2">
                  {"*".repeat(atob(item.password).length)}
                </p>

                {!item.revealedPassword && (
                  <>
                    <button
                      onClick={() => handleViewPassword(idx)}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-lg transition duration-300 self-start"
                    >
                      View 🔍
                    </button>

                    {viewPassword === idx && (
                      <div className="mt-3 space-y-2">
                        <input
                          type="password"
                          placeholder="Enter secret key"
                          value={enteredKey}
                          onChange={(e) => setEnteredKey(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {viewError && <p className="text-red-400">{viewError}</p>}
                        <button
                          onClick={() => handleCheckKey(idx)}
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-lg transition duration-300 w-full"
                        >
                          Submit 🔐
                        </button>
                      </div>
                    )}
                  </>
                )}

                {item.revealedPassword && (
                  <p className="mt-2 text-white">
                    🔓 <strong>Original Password:</strong> {item.revealedPassword}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordForm;
