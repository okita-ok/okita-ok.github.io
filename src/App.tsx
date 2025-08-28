import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    let seedValue = 1;
    let prevSeedValue = seedValue;

    const interval = setInterval(() => {
      seedValue = Math.floor(Math.random() * 100);
      if (prevSeedValue === seedValue) {
        seedValue += 1;
      }
      prevSeedValue = seedValue;

      // Update the turbulence seed
      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute("seed", seedValue.toString());
      }
    }, 150);

    return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id="noise">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves={2}
              seed={1}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={20}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        {/* Wobbly text */}
        <div className="wobbly-animation">
          <div
            className="wobbly-text-container"
            contentEditable={true}
            style={{ filter: "url(#noise)" }}
          >
            <center>okita</center>
          </div>
        </div>
        <p>
          <span className="username-color">Eduardo Okita</span> / okita-ok{" "}
          <br /> Full Stack Web Developer
          <br /> ☆*: .｡. Website in Construction! .｡.:*☆
        </p>
        <a href="">Portfolio</a>
        {/* <a aria-disabled="true">Shironeko Labs (Coming Soon!)</a> */}
        <a href="https://github.com/okita-ok">GitHub</a>
        <a href="https://www.linkedin.com/in/eduardo-okita/">LinkedIn</a>
        <p>~ internet's silliest soldier!! ~</p>
      </header>
    </div>
  );
}

export default App;
