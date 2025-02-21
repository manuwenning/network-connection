import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Bem-vindo ao Network App</h1>
      <p>Gerencie suas conexões de rede facilmente.</p>
      <nav>
        <Link to="/add"><button>Adicionar Conexão</button></Link>
        <Link to="/networks"><button>Ver/Apagar Conexões</button></Link>
      </nav>
    </div>
  );
}

export default HomePage;


