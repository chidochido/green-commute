import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
}

export default App;
