import { useState } from "react";
import { usePaymentStatus } from "../login/PaymentStatusContext";

const PasswordForm = ({ isDarkMode }) => {
  const { isPremium } = usePaymentStatus();

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

    const shuffled = result.split("").sort(() => 0.5 - Math.random()).join("");

    setPassword(shuffled);
    setStrongMode(false);
    setShowLabelInput(false);
    setSavedMessage("");
  };

  const handleSaveLabel = () => {
    if (label.trim() !== "" && secretKey.trim() !== "") {
      const encodedPassword = btoa(password);
      setSavedPasswords((prev) => [
        ...prev,
        {
          label: label.trim(),
          password: encodedPassword,
          secretKey: secretKey.trim(),
          revealedPassword: null,
        },
      ]);
      setSavedMessage(`Saved "${label}" successfully.`);
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
      setViewError("Incorrect Secret Key");
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto mt-10 p-6 border-2 rounded-2xl shadow-md backdrop-blur-lg transition-colors duration-300 space-y-6
        ${isDarkMode
          ? "bg-purple-900/20 border-white text-white"
          : "bg-purple-300/80 border-purple-200 text-black"
        }`}
    >
      <h2 className="text-2xl font-semibold text-center mb-2">Password Generator</h2>

      <input
        type="text"
        value={inputValue}
        onChange={handleLengthInput}
        placeholder="Password length (4-15)"
        maxLength={2}
        className={`w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2
          ${isDarkMode
            ? "bg-purple-900/80 text-white focus:ring-purple-300"
            : "bg-purple-100 text-black focus:ring-blue-400"
          }`}
      />
      {lengthError && <p className="text-red-500 text-sm">{lengthError}</p>}

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={generateSimplePassword}
          className="bg-blue-600 text-white px-4 py-2 rounded-3xl hover:bg-blue-700 transition"
        >
          Generate Simple
        </button>
        {password && strongMode && (
          <button
            onClick={generateStrongPassword}
            className="bg-green-600 text-white px-4 py-2 rounded-3xl hover:bg-green-700 transition"
          >
            Make Stronger
          </button>
        )}
        {password && (
          <button
            onClick={() => {
              if (isPremium) {
                setShowLabelInput(true);
              } else {
                alert("Saving with label is a premium feature. Please upgrade to access it.");
              }
            }}
            className={`px-4 py-2 rounded-3xl transition 
              ${isPremium ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-gray-400 text-white cursor-not-allowed"}`}
          >
            Save with Label
          </button>
        )}
      </div>

      {password && (
        <div>
          <p className="mt-4 text-sm">Generated Password:</p>
          <p className={`px-4 py-2 font-mono rounded-lg mt-1 break-all 
            ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black border"}`}>
            {password}
          </p>
        </div>
      )}

      {showLabelInput && isPremium && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter label (e.g. Instagram)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className={`w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2
              ${isDarkMode
                ? "bg-purple-900/80 text-white focus:ring-yellow-300"
                : "bg-purple-100 text-black focus:ring-yellow-500"
              }`}
          />
          <input
            type="password"
            placeholder="Enter secret key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className={`w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2
              ${isDarkMode
                ? "bg-purple-900/80 text-white focus:ring-yellow-300"
                : "bg-purple-100 text-black focus:ring-yellow-500"
              }`}
          />
          <button
            onClick={handleSaveLabel}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-3xl transition"
          >
            Save
          </button>
        </div>
      )}

      {savedMessage && <p className="text-green-400">{savedMessage}</p>}

      {savedPasswords.length > 0 && (
        <div className="pt-4 space-y-4">
          <h3 className="text-xl font-semibold">Saved Passwords</h3>
          {savedPasswords.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border
              ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}>
              <p className="text-sm">Label: <strong>{item.label}</strong></p>
              <p className="text-sm">Password: <span className="text-green-500 font-mono">{'*'.repeat(atob(item.password).length)}</span></p>

              {!item.revealedPassword ? (
                <>
                  <button
                    onClick={() => handleViewPassword(idx)}
                    className="mt-2 bg-purple-600 text-white px-4 py-1 rounded-3xl hover:bg-purple-700 transition"
                  >
                    View
                  </button>

                  {viewPassword === idx && (
                    <div className="mt-2 space-y-2">
                      <input
                        type="password"
                        placeholder="Enter secret key"
                        value={enteredKey}
                        onChange={(e) => setEnteredKey(e.target.value)}
                        className={`w-full px-3 py-2 rounded-3xl focus:outline-none focus:ring-2
                          ${isDarkMode
                            ? "bg-purple-900/80 text-white focus:ring-purple-300"
                            : "bg-purple-100 text-black focus:ring-blue-400"
                          }`}
                      />
                      {viewError && <p className="text-red-500">{viewError}</p>}
                      <button
                        onClick={() => handleCheckKey(idx)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-3xl transition"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-2 text-sm text-white">Original: <span className="font-mono text-green-300">{item.revealedPassword}</span></p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordForm;
