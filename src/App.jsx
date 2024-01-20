import { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";

function randomSixDigits() {
  return [...Array(6)].map(() => Math.floor(Math.random() * 10));
}

function IntervalNumber() {
  const [number, setNumber] = useState(randomSixDigits());
  const [turn, setTurn] = useState(0); // 0 - 1 in 30s
  const duration = 20; // 30s

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNumber(randomSixDigits());
      setTurn(0);
    }, [duration * 1000]);
    return () => clearTimeout(timeout);
  }, [number, duration]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTurn((prev) => prev + 1 / duration);
    }, [1000]);
    return () => clearTimeout(timeout);
  }, [turn, duration]);

  return (
    <button
      style={{
        fontSize: "1.5rem",
        color: "blueviolet",
        display: "flex",
        alignItems: "center",
        width: "100%",
        border: "none",
        background: "none",
        padding: 0,
        cursor: "pointer",
      }}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(number.join(""));
        } catch (error) {
          console.warn("Copy failed", error);
        }
      }}
    >
      {number.map((num, i) => (
        <span key={i} style={{ marginLeft: i === 3 ? "0.75rem" : 0 }}>
          {num}
        </span>
      ))}
      <span
        style={{
          marginLeft: "auto",
          display: "block",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `conic-gradient(transparent 0deg, transparent ${turn}turn, violet ${turn}turn)`,
        }}
      />
    </button>
  );
}

function App() {
  const [accounts, setAccounts] = useState([{ name: "Google", code: "1" }]);
  const [creating, setCreating] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [existed, setExisted] = useState(false);

  useEffect(() => {
    if (capturing && videoRef.current) {
      const video = videoRef.current;
      const canvasElement = document.createElement("canvas");
      canvasElement.hidden = true;
      const canvas = canvasElement.getContext("2d", {
        willReadFrequently: true,
      });

      // eslint-disable-next-line no-inner-declarations
      function tick() {
        let code;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvasElement.height = video.videoHeight;
          canvasElement.width = video.videoWidth;
          canvas.drawImage(
            video,
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );
          const imageData = canvas.getImageData(
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );
          code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (code?.data) {
            const searchParams = new URLSearchParams(code.data);
            if (
              accounts.find((item) => item.code === searchParams.get("code"))
            ) {
              setExisted(true);
              code = null;
            } else {
              setAccounts((prev) => [
                ...prev,
                {
                  name: searchParams.get("name") || "Unknown",
                  code: searchParams.get("code"),
                },
              ]);
              setExisted(false);
              setCapturing(false);
            }
          } else {
            code = null;
          }
        }
        if (!code) {
          requestAnimationFrame(tick);
        }
      }

      // Use facingMode: environment to attemt to get the front camera on phones
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
          video.srcObject = stream;
          video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
          video.play();
          requestAnimationFrame(tick);
        });

      return () => {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
          track.stop();
        });

        video.srcObject = null;
      };
    }
  }, [capturing]);

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
            onClick={() => {
              setCreating(false);
            }}
          >
            Cancel
          </button>
        ) : (
          [
            <button
              key="qr-camera"
              style={{
                display: "flex",
                backgroundColor: "lightgrey",
                border: "none",
                padding: "0.5rem",
                fontSize: "1rem",
                lineHeight: "normal",
                fontWeight: 500,
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => setCapturing(!capturing)}
            >
              {capturing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ width: "1em", height: "1em", fontSize: "19.5px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ width: "1em", height: "1em", fontSize: "19.5px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
              )}
            </button>,
            <label
              key="qr-image"
              style={{
                display: "flex",
                backgroundColor: "lightgrey",
                border: "none",
                padding: "0.5rem",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "4px",
                cursor: "pointer",
                lineHeight: "normal",
                marginLeft: "0.5rem",
              }}
              onClick={() => {
                setExisted(false);
              }}
            >
              QR
              <input
                type="file"
                style={{
                  clip: "rect(0 0 0 0)",
                  clipPath: "inset(50%)",
                  height: "1px",
                  overflow: "hidden",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  whiteSpace: "nowrap",
                  width: "1px",
                }}
                accept="image/*"
                onChange={(event) => {
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");
                  const img = new Image();
                  img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(
                      0,
                      0,
                      canvas.width,
                      canvas.height
                    );
                    const code = jsQR(
                      imageData.data,
                      imageData.width,
                      imageData.height
                    );
                    canvas.remove();
                    if (code?.data) {
                      const searchParams = new URLSearchParams(code.data);
                      if (
                        accounts.find(
                          (item) => item.code === searchParams.get("code")
                        )
                      ) {
                        setExisted(true);
                        return;
                      }
                      setAccounts((prev) => [
                        ...prev,
                        {
                          name: searchParams.get("name") || "Unknown",
                          code: searchParams.get("code"),
                        },
                      ]);
                    }
                  };
                  img.src = URL.createObjectURL(event.target.files[0]);
                  event.target.value = "";
                }}
              />
            </label>,
            <button
              key="new-account"
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
                marginLeft: "0.5rem",
              }}
              onClick={() => {
                setCreating(true);
                setExisted(false);
              }}
            >
              New
            </button>,
          ]
        )}
      </div>
      {capturing && (
        <video ref={videoRef} id="video" style={{ width: "100%" }}></video>
      )}
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
      {creating && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "1rem",
          }}
        >
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
      {!creating && !capturing && (
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
