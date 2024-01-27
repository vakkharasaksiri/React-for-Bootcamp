import React from 'react';
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("eng");
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
          <div style={{ display: "flex", gap: "0.5rem" }}>
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
                flex: "auto",
              }}
            />
            <select
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value);
              }}
              style={{
                border: "1px solid",
                backgroundColor: "#fff",
                fontSize: "1rem",
                minWidth: "min-content",
              }}
            >
              <option value="eng">eng</option>
              <option value="ara">ara</option>
              <option value="fra">fra</option>
              <option value="ita">ita</option>
              <option value="jpn">jpn</option>
              <option value="zho">zho</option>
            </select>
          </div>
          <ul style={{ margin: 0, padding: 0, marginTop: "1rem" }}>
            {countries
              .filter((country) =>
                (
                  country.translations[language]?.official ||
                  country.name.official
                ).includes(text)
              )
              .map((country) => {

                const name = country.translations[language]?.official ||
                  country.name.official;

                const splitText = name.split(text); //array of string

                return (
                  <li
                    key={country.name.official}
                    style={{
                      display: "flex",
                      borderBottom: "1px solid #e5e5e5",
                      padding: "0.5rem 0",
                      whiteSpace: "pre", //preserver whitespace
                    }}
                  >
                    {country.flag} 
                    {splitText.map((fragment,index) => {
                      return (
                        <React.Fragment key={index}>
                          {index !== 0 && (
                            <span style={{background:"salmon"}}>{text}</span>
                          )}
                          {fragment}
                        </React.Fragment>
                      );
                    })}
                  </li>
                );
            })}
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
