import { Link } from "react-router-dom";
import './HomePage.css'; // Certifique-se de ter um arquivo de estilo separado para HomePage

function HomePage() {
  return (
    <div className="home-page-container">
      <h2>Gerencie suas conexões de rede facilmente.</h2>
      <nav className="nav-links">
        <Link to="/add">
          <button className="action-button">Adicionar Conexão</button>
        </Link>
        <Link to="/networks">
          <button className="action-button">Ver/Apagar Conexões</button>
        </Link>
      </nav>
    </div>
  );
}

export default HomePage;
