import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./web/pages/Home";
import Login from "./web/pages/Login";
import Register from "./web/pages/Register";
import Dashboard from "./web/pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/dashboard" element = {<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
