import { useState } from "react";

function App() {
  const [accounts, setAccounts] = useState([{ name: "Google", code: "1" }]);
  const [creating, setCreating] = useState(false);

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
            <div style={{ fontSize: "1.25rem" }}>Google</div>
            <div style={{ fontSize: "1.5rem", color: "blueviolet" }}>
              181 951
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
