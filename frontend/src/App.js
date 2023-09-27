import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./Pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
}

export default App;
