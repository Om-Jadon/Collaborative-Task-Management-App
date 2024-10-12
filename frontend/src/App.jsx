import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignupPage from "./pages/SignupPage";
import ProfiePage from "./pages/ProfiePage";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/profile" element={<ProfiePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
