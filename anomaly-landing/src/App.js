// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Animated Typing Header
function TypingHeader({ text, speed = 100 }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      setDisplay((d) => d + text[idx]);
      idx++;
      if (idx === text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return (
    <h1 className="typing-header">
      {display}
      <span className="cursor">|</span>
    </h1>
  );
}

// Counter
function Counter({ end, label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000,
      increment = Math.ceil(end / (duration / 30));
    const timer = setInterval(() => {
      start = Math.min(start + increment, end);
      setCount(start);
      if (start === end) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <div className="stat">
      <div className="stat-number">{count}%</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// BackToTop
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return visible ? (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  ) : null;
}

// Live IP Tracker
function IPTrackerCard() {
  const [ip, setIp] = useState("Loading...");
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setIp(d.ip))
      .catch(() => setIp("Unavailable"));
  }, []);
  return (
    <div className="card">
      <h3>Live IP Tracking</h3>
      <p>
        Your IP Address: <span className="ip-value">{ip}</span>
      </p>
    </div>
  );
}

// Threat Map
function ThreatMapCard() {
  const points = [
    { coords: [-74.006, 40.7128], name: "New York" },
    { coords: [2.3522, 48.8566], name: "Paris" },
    { coords: [103.8198, 1.3521], name: "Singapore" },
  ];
  return (
    <div className="map-card">
      <h3>Global Threat Map</h3>
      <ComposableMap projectionConfig={{ scale: 150 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((g) => (
              <Geography
                key={g.rsmKey}
                geography={g}
                fill="#110000"
                stroke="#333"
              />
            ))
          }
        </Geographies>
        {points.map((p, i) => (
          <Marker key={i} coordinates={p.coords}>
            <circle r={5} fill="#ff4444" stroke="#000" strokeWidth={1} />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fill: "#ff4444", fontSize: "0.6rem" }}
            >
              {p.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}

// Custom Alert Builder
function AlertBuilderCard() {
  const [alerts, setAlerts] = useState([]),
    [rule, setRule] = useState("");
  const addAlert = () => {
    if (rule.trim()) {
      setAlerts([...alerts, rule.trim()]);
      setRule("");
    }
  };
  return (
    <div className="card alert-card">
      <h3>Custom Alert Builder</h3>
      <input
        className="alert-input"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        placeholder="e.g. CPU > 80%"
      />
      <button className="alert-add-button" onClick={addAlert}>
        Add Rule
      </button>
      <ul className="alert-list">
        {alerts.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}

// System Monitor
function SysMonitorCard() {
  const [cpu, setCpu] = useState(0),
    [mem, setMem] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setCpu(Math.floor(Math.random() * 30 + 50));
      setMem(Math.floor(Math.random() * 40 + 40));
    }, 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="card sys-card">
      <h3>System Monitor</h3>
      <p>
        CPU Usage: <strong>{cpu}%</strong>
      </p>
      <p>
        Memory Usage: <strong>{mem}%</strong>
      </p>
    </div>
  );
}

// Latency Checker
function LatencyCheckerCard() {
  const [lat, setLat] = useState(null);
  const check = async () => {
    const t0 = Date.now();
    await fetch("https://api.ipify.org?format=json");
    setLat(Date.now() - t0);
  };
  useEffect(() => {
    check();
  }, []);
  return (
    <div className="card latency-card">
      <h3>Network Latency</h3>
      <p>{lat !== null ? `${lat} ms` : "Checking..."}</p>
      <button onClick={check}>Re-check</button>
    </div>
  );
}

// Packet Rate
function PacketRateCard() {
  const [rate, setRate] = useState(0);
  useEffect(() => {
    const iv = setInterval(
      () => setRate(Math.floor(Math.random() * 500 + 500)),
      1500
    );
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="card packet-card">
      <h3>Packet Rate</h3>
      <p>
        <strong>{rate}</strong> pkt/s
      </p>
    </div>
  );
}

// Error Log Stream
function ErrorLogCard() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const iv = setInterval(() => {
      setLogs((l) =>
        [
          `Error ${Math.floor(
            Math.random() * 1000
          )} at ${new Date().toLocaleTimeString()}`,
          ...l,
        ].slice(0, 5)
      );
    }, 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="card log-card">
      <h3>Error Log Stream</h3>
      <ul>
        {logs.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

// Port Scanner
function PortScannerCard() {
  const ports = [22, 80, 443, 3306],
    [open, setOpen] = useState([]);
  const scan = () => setOpen(ports.filter(() => Math.random() > 0.5));
  return (
    <div className="card port-card">
      <h3>Port Scanner</h3>
      <button onClick={scan}>Scan Ports</button>
      {open.length > 0 && <p>Open: {open.join(", ")}</p>}
    </div>
  );
}

// Dark Mode Toggle
function DarkModeToggle({ dark, setDark }) {
  return (
    <button className="toggle-btn" onClick={() => setDark(!dark)}>
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.body.className = dark ? "theme-dark" : "";
  }, [dark]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">AnomalyDetect</div>
        <ul className="nav-links">
          {["home", "about", "project", "features", "stats", "contact"].map(
            (id) => (
              <li key={id}>
                <a href={`#${id}`}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            )
          )}
        </ul>
        <DarkModeToggle dark={dark} setDark={setDark} />
      </nav>

      <header id="home" className="hero parallax">
        <TypingHeader text="Network Anomaly Detection" />
        <p>Securing networks with intelligent, real-time insights.</p>
        <a href="#project" className="cta-button">
          Discover More
        </a>
      </header>

      <section id="about" className="section about">
        <h2>Who We Are</h2>
        <p>
          CSE undergrads at VIT passionate about cybersecurity, guided by Dr.
          Shobha Rekh.
        </p>
      </section>

      <section id="project" className="section project">
        <h2>What We Do</h2>
        <p>
          Using Autoencoders, DNNs &amp; LLMs to detect anomalies and generate
          insights.
        </p>
      </section>

      <section id="features" className="section features">
        <h2>Stunning Features</h2>
        <div className="feature-cards">
          <IPTrackerCard />
          <ThreatMapCard />
          <AlertBuilderCard />
          <SysMonitorCard />
          <LatencyCheckerCard />
          <PacketRateCard />
          <ErrorLogCard />
          <PortScannerCard />
        </div>
      </section>

      <section id="stats" className="section stats">
        <h2>Our Impact</h2>
        <div className="stats-container">
          <Counter end={98} label="Detection Rate" />
          <Counter end={95} label="Accuracy" />
          <Counter end={99} label="Uptime" />
          <Counter end={90} label="User Trust" />
        </div>
      </section>

      <section id="contact" className="section contact">
        <h2>Contact Us</h2>
        <p>
          Reach out at{" "}
          <a href="mailto:vansh.gupta2021@vitstudent.ac.in">
            vansh.gupta2021@vitstudent.ac.in
          </a>
          .
        </p>
      </section>

      <footer className="footer">&copy; 2025 AnomalyDetect Team</footer>
      <BackToTop />
    </div>
  );
}
