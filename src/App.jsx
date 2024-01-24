import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  // 1. create a state named `language` with initial value `eng`
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
          {/* 2. create a <select> with these options: `eng, ara, fra, ita, jpn, zho`. style it as you'd like */}
          {/* 3. bind the language state with the <select> */}
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
          <ul style={{ margin: 0, padding: 0, marginTop: "1rem" }}>
            {countries
              .filter((country) => country.name.official.includes(text))
              // 4. filter the countries by the selected language
              //    💡 HINT: use the `translations` property of the country object
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
                  {/* 5. show the translated name if possible. */}
                </li>
              ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
