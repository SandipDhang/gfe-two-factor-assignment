import "./style.css";
import React, { useState, useRef, Fragment } from "react";

const TwoFactorAuth = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (e, index) => {
    const digit = e.target.value;

    // Reject non-numeric input
    if (!/^[0-9]$/.test(digit)) {
      return;
    }

    // Set the code if number
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = digit;
      return newCode;
    });

    // No need to focus next input if already in last
    if (index < code.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      setCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = "";
        return newCode;
      });

      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const submitCode = () => {
    const enteredCode = code.join("");
    alert(`Entered code ${enteredCode}`);
  };

  return (
    <Fragment>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={inputRefs[index]}
            style={{
              width: "40px", // Adjust the width as needed
              height: "40px", // Adjust the height as needed
              textAlign: "center", // Center text horizontally
            }}
          />
        ))}
      </div>
      <button onClick={submitCode}>Submit</button>
    </Fragment>
  );
};

export default TwoFactorAuth;

