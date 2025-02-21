import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import AddConnection from "./pages/AddConnection.js";
import Networks from "./pages/Networks.js";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Adicionar Conexão</Link></li>
            <li><Link to="/networks">Ver/Apagar Conexões</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddConnection />} />
          <Route path="/networks" element={<Networks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

