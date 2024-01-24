function App() {
  // 1. create a state (using `useState` hook) named `text` with initial value of empty string.
  return (
    <main
      style={{
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <h1>Country Finder</h1>
      <input
        placeholder="Type to find..."
        // 2. bind the `text` state to the input value
        style={{
          border: "none",
          background: "#f5f5f5",
          padding: "0.75rem 1rem",
          width: "100%",
          fontSize: "1rem",
        }}
      />
      <ul style={{ margin: 0, padding: 0, marginTop: "1rem" }}>
        {[
          { name: "United States", flag: "🇺🇸" },
          { name: "Brazil", flag: "🇧🇷" },
          { name: "Thailand", flag: "🇹🇭" },
          { name: "Japan", flag: "🇯🇵" },
          { name: "China", flag: "🇨🇳" },
        ]
          // 3. filter the countries based on the `text` state
          .map((country) => (
            <li
              key={country.name}
              style={{
                display: "flex",
                borderBottom: "1px solid #e5e5e5",
                padding: "0.5rem 0",
              }}
            >
              {country.flag} {country.name}
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
