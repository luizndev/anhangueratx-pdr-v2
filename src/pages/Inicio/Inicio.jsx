import "./Inicio.css";

// IMPORTAÇÃO DE LIBS
import { motion, AnimatePresence } from "framer-motion";

// IMPORTAÇÃO DE COMPONENTES
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const months = [
    "jan.",
    "fev.",
    "mar.",
    "abr.",
    "mai.",
    "jun.",
    "jul.",
    "ago.",
    "set.",
    "out.",
    "nov.",
    "dez.",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek}, ${day} de ${month}, ${year} `;
}

function App() {
  const banners = [
    { id: 1, src: "./banner.png", alt: "Banner 1" },
    { id: 2, src: "./banner.png", alt: "Banner 2" },
    { id: 3, src: "./banner.png", alt: "Banner 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const name = localStorage.getItem("username");

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    const fetchRecentClasses = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          `https://pdr-auth-ofc.vercel.app/minhassolicitacoes/${email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const allClasses = [
            ...(response.data.informatica || []),
            ...(response.data.multidisciplinar || []),
          ];

          const today = new Date();

          const pastClasses = allClasses
            .filter((item) => {
              const classDate = new Date(item.data);
              return classDate < today;
            })
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .slice(0, 5);
          console.log(pastClasses);
          setFilteredData(pastClasses);
        }
      } catch (error) {
        console.error("Erro ao buscar as aulas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentClasses();
  }, [navigate]);

  return (
    <section className={`app-section ${isLoading ? "loading" : ""}`}>
      {isLoading ? (
        <div className="loading-container">
          <img className="icon-loading" src="./loading.png" alt="" />
          <p>Carregando...</p>
        </div>
      ) : (
        <>
          <Navbar activePage="inicio" />

          <section className="welcome">
            <div className="welcome-left">
              <h1>Boas-vindas, ao Portal de Reservas, {name}!</h1>
              <span>
                Vem por aqui: reserve seu espaço no laboratório e transforme
                vidas
              </span>
            </div>
          </section>

          <section className="infoCard">
            {/* <section className="new-news">
              <h1 className="titulo-HIstoria">Avisos Importantes</h1>
              <div className="slider-container">
                <img
                  src={banners[currentIndex].src}
                  alt={banners[currentIndex].alt}
                  className="slider-image"
                />
                <button className="slider-button prev" onClick={handlePrev}>
                  ‹
                </button>
                <button className="slider-button next" onClick={handleNext}>
                  ›
                </button>
              </div>
              <div className="slider-indicators">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${
                      currentIndex === index ? "active" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  ></button>
                ))}
              </div>
            </section> */}
            <section className="history">
              <h1 className="titulo-HIstoria">Minhas últimas aulas práticas</h1>
              {filteredData.length > 0 ? (
                <div className="ultimasaulas-container">
                  {filteredData.map((item, index) => (
                    <div className="ultimasaulas-card" key={index}>
                      <div className="aulas-card-l">
                        <img src="./profile.png" alt="" />
                      </div>
                      <div className="aulas-card-r">
                        <h1>{item.laboratorio}</h1>
                        <span>{formatDate(item.data)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Não há aulas recentes.</p>
              )}
            </section>
          </section>
        </>
      )}
    </section>
  );
}

export default App;
