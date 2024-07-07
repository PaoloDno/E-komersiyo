// App.js
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderNav from './components/Header';
import AppRoutes from "./components/routes/AppRoutes";

function App() {
  return (
    <>
      <Router>
        <HeaderNav />
        <div className="min-w-screen px-1 lg:px-6 py-3 flex items-center justify-center bg-slate-200 min-h-screen">
          <AppRoutes />
        </div>
      </Router>
    </>
  );
}

export default App;
