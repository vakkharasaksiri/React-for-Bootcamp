function App() {
  // 1. create a state named `accounts` to store the accounts with `[{ name: 'Google', code: 1 }]` as initial value.

  // 3. create a state named `creating` to store the creating state with `false` as initial value.

  // 5. create a state named `name` and `code` to store the name and code with `''` as initial value.

  // 7. create a state named `existed` to store the existed state with `false` as initial value.
  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ flex: "auto" }}>Authenticator</h1>
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
          // 4. add `onClick` handler to set `creating` state to `true`
          //    and click again to set `creating` state to `false`
        >
          New
        </button>
      </div>
      {/* 6. render a form with
              - `name` input
              - `code` input
              - submit button

            bind the `name` and `code` input to the state
            and add `onSubmit` handler to add the new account to the `accounts` state (if the `name` is not provided, set it to `Unknown`)
            and set `creating` state to `false`
            and reset the `name` and `code` state to ""
      */}
      {/* 8. update `onClick` handler in the submit button of step (6)
             to set `existed` state to true if the provided account's code is already existed in the state
       */}
      {/* 9. render an alert with <div> to let users know that the code is already existed. */}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {/* 2. replace with the `accounts` state */}
        {[...Array(10)].map((_, i) => (
          <li
            key={i}
            style={{
              borderBottom: "1px solid rgba(0 0 0 / 0.12)",
              paddingBlock: "0.5rem",
            }}
          >
            {/* 1.1 replace the hardcoded value with the account name */}
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
