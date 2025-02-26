import { Link } from "react-router-dom";
import './HomePage.css';
import { FaLinkedin } from 'react-icons/fa';

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
        <Link to="/find">
          <button className="action-button">Buscar Conexões</button>
        </Link>
      </nav>

      <div className="author-info">
        <span className="author-text">Sobre a autora</span>
        <a href="https://www.linkedin.com/in/emanuela-wenning/" target="_blank" rel="noopener noreferrer">
          <button className="linkedin-button">
            <FaLinkedin size={30} />
          </button>
        </a>
      </div>
    </div>
  );
}

export default HomePage;


