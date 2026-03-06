import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import ReactGA from "react-ga4";

ReactGA.initialize("G-35FF7GGYY1");
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);