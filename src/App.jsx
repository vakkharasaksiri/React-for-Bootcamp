import { useState, useEffect } from "react";

function randomSixDigits() {
  return [...Array(6)].map(() => Math.floor(Math.random() * 10));
}

function IntervalNumber() {
  const [number, setNumber] = useState(randomSixDigits());
  // 1. create a state named `turn` to store the current turn with initial value 0.

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNumber(randomSixDigits());
    }, [30000]);
    return () => clearTimeout(timeout);
  }, [number]);

  // 2. create a useEffect to update the `turn` state every second.
  //    💡 HINT: turn value is between 0-1, meaning the initial value is 0 and after 30 seconds it will be 1.

  return (
    <div style={{ fontSize: "1.5rem", color: "blueviolet" }}>
      {number.map((num, i) => (
        <span key={i} style={{ marginLeft: i === 3 ? "0.75rem" : 0 }}>
          {num}
        </span>
      ))}
      {/* 3. create a <span> tag to represent the time-left indicator using CSS conic-gradient
             💡 HINT: try this in your browser console to see how it works: 
             <span
              style={{
                marginLeft: "auto",
                display: "block",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: `conic-gradient(transparent 0deg, transparent 0.5turn, violet 0.5turn)`,
              }}
            />
      */}
    </div>
  );
}

function App() {
  const [accounts, setAccounts] = useState([{ name: "Google", code: "1" }]);
  const [creating, setCreating] = useState(false);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [existed, setExisted] = useState(false);

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ flex: "auto" }}>Authenticator</h1>
        {creating ? (
          <button
            style={{
              display: "flex",
              backgroundColor: "lightgrey",
              border: "none",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setCreating(false)}
          >
            Cancel
          </button>
        ) : (
          <button
            style={{
              display: "flex",
              backgroundColor: "violet",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setCreating(true)}
          >
            New
          </button>
        )}
      </div>
      {creating && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "1rem",
          }}
        >
          {existed && (
            <div
              style={{
                gridColumn: "span 2",
                backgroundColor: "lightsalmon",
                borderRadius: "4px",
                padding: "0.5rem 0.75rem",
                marginBottom: "1rem",
              }}
            >
              ⚠️ Account existed! Please try another code.
            </div>
          )}
          <label htmlFor="account-name">Name: </label>
          <input
            id="account-name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="account-code">Code: </label>
          <input
            id="account-code"
            placeholder="Code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <button
            onClick={() => {
              if (accounts.find((item) => item.code === code)) {
                setExisted(true);
                return;
              }
              setAccounts((prev) => [
                ...prev,
                { name: name || "Unknown", code },
              ]);
              setCreating(false);
              setExisted(false);
              setName("");
              setCode("");
            }}
          >
            Submit
          </button>
        </div>
      )}
      {!creating && (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {accounts.map((item) => (
            <li
              key={item.code}
              style={{
                borderBottom: "1px solid rgba(0 0 0 / 0.12)",
                paddingBlock: "0.5rem",
              }}
            >
              <div style={{ fontSize: "1.25rem" }}>{item.name}</div>
              <IntervalNumber />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
