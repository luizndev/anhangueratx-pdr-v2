import "./Minhas.css";

// IMPORTAÇÃO DE COMPONENTES
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");

  const [role, setRole] = useState("");
  const [informaticaData, setInformaticaData] = useState([]);
  const [multidisciplinarData, setMultidisciplinarData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    fetchRecentClasses();
  }, [navigate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://pdr-auth-ofc.vercel.app/auth/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.status === 200) {
            setRole(response.data.user.role);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchInformaticaData = async () => {
      if (email) {
        try {
          const response = await axios.get(
            `https://pdr-auth-ofc.vercel.app/minhassolicitacoes/${email}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.status === 200) {
            const informatica = response.data.informatica || [];
            const multidisciplinar = response.data.multidisciplinar || [];

            const combinedData = [
              ...informatica.map((item) => ({
                email: item.email,
                data: item.data,
                laboratorio: item.laboratorio,
                token: item.token,
                status: item.status,
              })),
              ...multidisciplinar.map((item) => ({
                email: item.email,
                data: item.data,
                laboratorio: item.laboratorio,
                token: item.token,
                status: item.status,
              })),
            ];

            setInformaticaData(informatica);
            setMultidisciplinarData(multidisciplinar);
            setFilteredData(combinedData);
            setLoading(false); // Dados carregados
          }
        } catch (error) {
          console.error("Error fetching informatica data:", error);
          setLoading(false); // Em caso de erro
        }
      }
    };

    fetchInformaticaData();
  }, [email]);

  useEffect(() => {
    const filterData = () => {
      let filtered = [...informaticaData, ...multidisciplinarData];

      if (selectedDate) {
        filtered = filtered.filter((item) => item.data === selectedDate);
      }

      if (selectedToken) {
        filtered = filtered.filter((item) =>
          item.token.includes(selectedToken)
        );
      }

      setFilteredData(filtered);
    };

    filterData();
  }, [selectedDate, selectedToken, informaticaData, multidisciplinarData]);

  const fetchRecentClasses = async () => {
    try {
      const response = await axios.get("/api/recent-classes");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar as aulas recentes:", error);
    }
  };

  return (
    <section className={`app-section ${loading ? "loading" : ""}`}>
      {loading ? (
        <div className="loading-container">
          <img className="icon-loading" src="./loading.png" alt="" />
          <p>Carregando...</p>
        </div>
      ) : (
        <>
          <section>
            <Navbar activePage="minhas-solicitacoes" />
            <div className="dados">
              <div className="boasVindas">
                <p className="boasVindasTexto">
                  Acompanhe suas solicitações de laboratórios abaixo:
                </p>
                <h2 className="subtitulo">
                  Minhas Solicitações de Laboratórios
                </h2>
              </div>

              <div className="inputFilterContainer">
                <input
                  className="inputFilter"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  placeholder="Filtrar por data"
                />
                <input
                  className="inputFilter"
                  type="text"
                  value={selectedToken}
                  onChange={handleTokenChange}
                  placeholder="Filtrar por token"
                />
              </div>
              <table id="tableView">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Laboratório</th>
                    <th>Token</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index}>
                        <td>{formatDate(item.data)}</td>
                        <td>{item.laboratorio}</td>
                        <td>{item.token}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">Nenhuma solicitação encontrada.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </section>
  );
}

export default App;
