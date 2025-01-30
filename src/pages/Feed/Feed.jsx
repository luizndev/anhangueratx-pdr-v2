import "./Feed.css";

// IMPORTAÇÃO DE COMPONENTES
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    } else {
      fetchRecentClasses(); // Garante que só executa se o usuário estiver logado
    }
  }, [navigate]);

  const fetchRecentClasses = async () => {
    try {
      const response = await axios.get("/api/recent-classes");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar as aulas recentes:", error);
    }
  };

  return (
    <section>
      <Navbar activePage="feedback" />
      <div>
        <h1>Bem-vindo ao Feed!</h1>
        <p>Acompanhe suas atualizações mais recentes aqui.</p>
      </div>
    </section>
  );
}

export default App;
