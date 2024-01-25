import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const currencies = new Map();
  countries.forEach((country) => {
    Object.entries(country.currencies || {}).forEach(([key, currency]) => {
      currencies.set(key, currency);
    });
  });
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <main
      style={{
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <h1>Country Finder</h1>
      {loading ? (
        "loading..."
      ) : (
        <>
          <input
            placeholder="Type to find..."
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            style={{
              border: "none",
              background: "#f5f5f5",
              padding: "0.75rem 1rem",
              width: "100%",
              fontSize: "1rem",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              overflow: "auto",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            {[...currencies].map(([key, currency]) => (
              <div
                key={key}
                style={{
                  borderRadius: "40px",
                  border: "1px solid #f5f5f5",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  padding: "0.5rem 0.75rem",
                  whiteSpace: "nowrap",
                }}
              >
                {currency.symbol} {currency.name}
              </div>
            ))}
          </div>
          <ul style={{ margin: 0, padding: 0, marginTop: "1rem" }}>
            {countries
              .filter((country) => country.name.official.includes(text))
              .map((country) => (
                <li
                  key={country.name.official}
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #e5e5e5",
                    padding: "0.5rem 0",
                  }}
                >
                  {country.flag} {country.name.official}
                </li>
              ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
