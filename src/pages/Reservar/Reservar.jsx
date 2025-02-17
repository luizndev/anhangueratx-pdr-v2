import "./Reservar.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkOutline } from "react-icons/io5";
import axios from "axios";
import { FcSelfServiceKiosk, FcBiotech, FcWebcam } from "react-icons/fc";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const username = localStorage.getItem("username");

const MultidisciplinarForm = ({ id }) => {
  const [formData, setFormData] = useState({
    professor: "",
    email: "",
    data: "",
    modalidade: "",
    alunos: "",
    laboratorio: "",
    curso: "",
    turno: "",
    semestre: "",
    disciplina: "",
    tema: "",
    roteiro: "",
    observacao: "",
    // token: generateTokenLab(),
    status: "Não",
  });

  const [message, setMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
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
            setFormData((prevData) => ({
              ...prevData,
              professor: response.data.user.name,
              email: response.data.user.email,
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "data") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 7);

      const selectedDate = new Date(value);

      if (selectedDate < minDate) {
        const formattedMinDate = minDate.toISOString().split("T")[0];
        setFormData({ ...formData, [name]: formattedMinDate });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = generateTokenLab();
      localStorage.setItem("tokenReserva", token);
      const response = await axios.post(
        "https://pdr-auth-ofc.vercel.app/multidisciplinar/register",
        { ...formData, token }
      );
      setMessage(response.data.message);
      setErrorDetails("");
      setFormData({
        professor: "",
        email: "",
        data: "",
        modalidade: "",
        alunos: "",
        laboratorio: "",
        curso: "",
        turno: "",
        semestre: "",
        disciplina: "",
        tema: "",
        roteiro: "",
        observacao: "",
        // token: generateTokenLab(),
        status: "",
      });
    } catch (error) {
      setErrorDetails("Erro ao registrar formulário");
    }
  };

  return (
    <form className="formOpen" onSubmit={handleSubmit}>
      <div className="inputBox">
        <label htmlFor="">Nome do Professor</label>
        <input
          type="text"
          name="professor"
          value={localStorage.getItem("username")}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">E-mail </label>
        <input
          type="text"
          name="email"
          value={localStorage.getItem("email")}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">Data (realização da aula).</label>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">Modalidade </label>
        <select
          name="modalidade"
          value={formData.modalidade}
          onChange={handleChange}
          required
        >
          <option value="">Qual modalidade?</option>
          <option value="100% Online">100% Online</option>
          <option value="Semi Presencial">Semi Presencial</option>
          <option value="Presencial">Presencial</option>
        </select>
      </div>
      <div className="inputBox">
        <label htmlFor="">Quantidade de Alunos</label>
        <input
          type="number"
          name="alunos"
          value={formData.alunos}
          onChange={handleChange}
          required
        />
        <label className="informativo" htmlFor="">
          Atenção: A alocação de laboratórios pode sofrer alterações devido à
          quantidade de alunos prevista. Isso significa que a aula poderá ser
          remanejada para um laboratório diferente do solicitado, conforme a
          disponibilidade.
        </label>
      </div>
      <div className="inputBox">
        <label htmlFor="">Laboratório</label>
        <select
          name="laboratorio"
          value={formData.laboratorio}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma opção</option>
          <option value="Analises Clinicas e Parasitologia e Líquidos Corporais">
            Analises Clinicas e Parasitologia e Líquidos Corporais
          </option>
          <option value="Anatomia I">Anatomia I</option>
          <option value="Anatomia II">Anatomia II</option>
          <option value="Auditorio">Auditorio</option>
          <option value="Biodiversidade e Biotecnologia">
            Biodiversidade e Biotecnologia
          </option>
          <option value="Bioquímica / Microbiologia">
            Bioquímica / Microbiologia
          </option>
          <option value="Bromatologia">Bromatologia</option>
          <option value="Ciências Morfofuncionais">
            Ciências Morfofuncionais
          </option>
          <option value="Clinica de Estética">Clinica de Estética</option>
          <option value="Clinica de Farmacia">Clinica de Farmacia</option>
          <option value="Clinica de Nutrição">Clinica de Nutrição</option>
          <option value="Clinica de Odontologia">Clinica de Odontologia</option>
          <option value="Clinica de Piscologia">Clinica de Piscologia</option>
          <option value="Construção Civil">Construção Civil</option>
          <option value="Cozinha Pedagógica / Tecnologia de alimentos">
            Cozinha Pedagógica / Tecnologia de alimentos
          </option>
          <option value="Desenho Técnico I">Desenho Técnico I</option>
          <option value="Desenho Técnico II">Desenho Técnico II</option>
          <option value="Elétrica e Eletrônica">Elétrica e Eletrônica</option>
          <option value="Enfermagem">Enfermagem</option>
          <option value="Estética Facial e Corporal">
            Estética Facial e Corporal
          </option>
          <option value="Física e Resistencia de Materiais I">
            Física e Resistencia de Materiais I
          </option>
          <option value="Física e Resistencia de Materiais II">
            Física e Resistencia de Materiais II
          </option>
          <option value="Fisioterapia I">Fisioterapia I</option>
          <option value="Fisioterapia  II">Fisioterapia II</option>
          <option value="Hardware e Telecomunicações">
            Hardware e Telecomunicações
          </option>
          <option value="Hidráulica">Hidráulica</option>
          <option value="Imagem Pessoal">Imagem Pessoal</option>
          <option value="Maquetaria">Maquetaria</option>
          <option value="Microscopia I">Microscopia I</option>
          <option value="Microscopia II">Microscopia II</option>
          <option value="Motores e Tecnologia de Soldagem">
            Motores e Tecnologia de Soldagem
          </option>
          <option value="NPJ">NPJ</option>
          <option value="Pista de Atletismo">Pista de Atletismo</option>
          <option value="Pré-clínico de Odontologia">
            Pré-clínico de Odontologia
          </option>
          <option value="Processos Químicos">Processos Químicos</option>
          <option value="Quadra Poliesportiva">Quadra Poliesportiva</option>
          <option value="Química I">Química I</option>
          <option value="Química I">Química II</option>
          <option value="Química III">Química III</option>
          <option value="Sala de Dança">Sala de Dança</option>
          <option value="Sementes">Sementes</option>
          <option value="Sistemas Térmicos">Sistemas Térmicos</option>
          <option value="Solos e Topografia">Solos e Topografia</option>
          <option value="Tecnologia Farmacêutica / Cosmetologia">
            Tecnologia Farmacêutica / Cosmetologia
          </option>
          <option value="Viveiro">Viveiro</option>
        </select>
      </div>
      <div className="inputBox">
        <label htmlFor="">Curso </label>
        <input
          type="text"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">Turno </label>
        <select
          name="turno"
          value={formData.turno}
          onChange={handleChange}
          required
        >
          <option value="">Turno</option>
          <option value="Matutino">Matutino</option>
          <option value="Vespertino">Vespertino</option>
          <option value="Noturno">Noturno</option>
        </select>
      </div>
      <div className="inputBox">
        <label htmlFor="">Semestre </label>
        <input
          type="text"
          name="semestre"
          value={formData.semestre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">Disciplina </label>
        <input
          type="text"
          name="disciplina"
          value={formData.disciplina}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">Tema </label>
        <input
          type="text"
          name="tema"
          value={formData.tema}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div className="inputBoxNone">
        <label htmlFor="">Token </label>
        <input
          type="text"
          name="token"
          value={formData.token}
          onChange={handleChange}
          readOnly
        />
      </div> */}
      <div className="inputBox">
        <label className="anexo" htmlFor="">
          <span>Anexar Roteiro </span>
          <a target="_blank" href="" className="ajuda">
            <AiOutlineQuestionCircle /> Está precisando de ajuda para anexar?
          </a>
        </label>
        <a target="_blank" href="https://uploadnow.io/pt">
          Clique aqui para Anexar
        </a>
      </div>
      <div className="inputBox">
        <label htmlFor="">Compartilhar Roteiro </label>
        <input type="text" name="roteiro" onChange={handleChange} required />
      </div>
      <div className="inputBox">
        <label htmlFor="">Observação</label>
        <input
          type="text"
          name="observacao"
          value={formData.observacao}
          onChange={handleChange}
        />
      </div>
      <div className="inputBox">
        <button type="submit" className="enviar">
          Enviar
        </button>
      </div>
      {message && (
        <div className="modal-container">
          <div className="modal">
            <span className="checkIcon">
              <IoCheckmarkOutline />
            </span>
            <h1>Reserva feita com sucesso!</h1>
            <p>
              Olá! Confirmaremos sua aula em até 72 horas ou uma semana antes da
              data agendada. Para verificar se sua reserva foi confirmada,
              acesse <strong className="diferente">Minhas Solicitações</strong>{" "}
              e filtre pelo token. Seu token é:{" "}
              <strong className="diferente">
                {localStorage.getItem("tokenReserva")}
              </strong>
            </p>
            <button onClick={() => setMessage("")}>Fechar Modal</button>
          </div>
        </div>
      )}
      {errorDetails && <p>{errorDetails}</p>}
    </form>
  );
};

const InformaticaForm = ({ id }) => {
  const [formData, setFormData] = useState({
    professor: "",
    email: "",
    data: "",
    modalidade: "",
    alunos: "",
    laboratorio: "",
    software: "",
    equipamento: "",
    observacao: "",
    status: "Não",
  });

  const [message, setMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");
  const [availableLabs, setAvailableLabs] = useState([]);
  

  const labRestrictions = {
    'Laboratório 5 (Informatica Avançada)': [2, 3], 
    'Laboratório 8 (Informatica Avançada)': [1, 3 ,4], 
    'Laboratório 9 (Informatica Avançada)': [1, 3 ,4], 
    // 0 - Segunda
    // 1 - Terça
  };

  const allLabs = [
    { value: "Laboratório 1 (Informatica Básica)", label: "Laboratório 1 (Informatica Básica)" },
    { value: "Laboratório 2 (Informatica Básica)", label: "Laboratório 2 (Informatica Básica)" },
    { value: "Laboratório 5 (Informatica Avançada)", label: "Laboratório 5 (Informatica Avançada)" },
    { value: "Laboratório 8 (Informatica Avançada)", label: "Laboratório 8 (Informatica Avançada)" },
    { value: "Laboratório 9 (Informatica Avançada)", label: "Laboratório 9 (Informatica Avançada)" },
  ];

  const updateAvailableLabs = (selectedDate) => {
    if (!selectedDate) {
      setAvailableLabs([]);
      return;
    }

    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();

    const availableLaboratories = allLabs.filter(lab => {
      const restrictions = labRestrictions[lab.value];
      return !restrictions || !restrictions.includes(dayOfWeek);
    });

    setAvailableLabs(availableLaboratories);
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
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
            setFormData((prevData) => ({
              ...prevData,
              professor: response.data.user.name,
              email: response.data.user.email,
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "data") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 7);

      const selectedDate = new Date(value);

      if (selectedDate < minDate) {
        const formattedMinDate = minDate.toISOString().split("T")[0];
        setFormData({ ...formData, [name]: formattedMinDate, laboratorio: "" });
        updateAvailableLabs(formattedMinDate);
        return;
      }

      setFormData({ ...formData, [name]: value, laboratorio: "" });
      updateAvailableLabs(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = generateTokenTI();
      localStorage.setItem("tokenReserva", token);
      const response = await axios.post(
        "https://pdr-auth-ofc.vercel.app/informatica/register",
        { ...formData, token }
      );
      setMessage(response.data.message);
      setErrorDetails("");
      setFormData({
        professor: "",
        email: "",
        data: "",
        modalidade: "",
        alunos: "",
        laboratorio: "",
        software: "",
        equipamento: "",
        observacao: "",
        // token: tokenInput,
        status: "",
      });
    } catch (error) {
      setErrorDetails("Erro ao registrar formulário");
    }
  };

  return (
    <form className="formOpen" onSubmit={handleSubmit}>
      <div className="inputBox">
        <label htmlFor="">Nome do Professor</label>
        <input
          type="text"
          name="professor"
          value={localStorage.getItem("username")}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">E-mail </label>
        <input
          type="text"
          name="email"
          value={localStorage.getItem("email")}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">Data (realização da aula).</label>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">Modalidade </label>
        <select
          name="modalidade"
          value={formData.modalidade}
          onChange={handleChange}
          required
        >
          <option value="">Qual modalidade?</option>
          <option value="100% Online">100% Online</option>
          <option value="Semi Presencial">Semi Presencial</option>
          <option value="Presencial">Presencial</option>
        </select>
      </div>
      <div className="inputBox">
        <label htmlFor="">Quantidade de Alunos</label>
        <input
          type="number"
          name="alunos"
          value={formData.alunos}
          onChange={handleChange}
          required
        />
        <label className="informativo" htmlFor="">
          Atenção: A alocação de laboratórios pode sofrer alterações devido à
          quantidade de alunos prevista. Isso significa que a aula poderá ser
          remanejada para um laboratório diferente do solicitado, conforme a
          disponibilidade.
        </label>
      </div>
      
      {formData.data && (
        <div className="inputBox">
          <label htmlFor="">Laboratório</label>
          <select
            name="laboratorio"
            value={formData.laboratorio}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma opção</option>
            {availableLabs.map((lab) => (
              <option key={lab.value} value={lab.value}>
                {lab.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="inputBox">
        <label htmlFor="">Software </label>
        <input
          type="text"
          name="software"
          value={formData.software}
          onChange={handleChange}
          required
        />
      </div>
      <div className="inputBox">
        <label htmlFor="">Equipamento </label>
        <input
          type="text"
          name="equipamento"
          value={formData.equipamento}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div className="inputBox">
        <label htmlFor="">Token </label>
        <input
          type="text"
          name="token"
          value={formData.token}
          onChange={handleChange}
          readOnly
        />
      </div> */}
      <div className="inputBox">
        <label htmlFor="">Observação</label>
        <input
          type="text"
          name="observacao"
          value={formData.observacao}
          onChange={handleChange}
        />
      </div>
      <div className="inputBox">
        <button type="submit" className="enviar">
          Enviar
        </button>
      </div>
      {message && (
        <div className="modal-container">
          <div className="modal">
            <span className="checkIcon">
              <IoCheckmarkOutline />
            </span>
            <h1>Reserva feita com sucesso!</h1>
            <p>
              Olá! Confirmaremos sua aula em até 72 horas ou uma semana antes da
              data agendada. Para verificar se sua reserva foi confirmada,
              acesse <strong className="diferente">Minhas Solicitações</strong>{" "}
              e filtre pelo token. Seu token é:{" "}
              <strong className="diferente">
                {localStorage.getItem("tokenReserva")}
              </strong>
            </p>
            <button onClick={() => setMessage("")}>Fechar Modal</button>
          </div>
        </div>
      )}
      {errorDetails && <p>{errorDetails}</p>}
    </form>
  );
};

function App() {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [activeForm, setActiveForm] = useState(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleButtonClick = (form) => {
    setActiveForm(form);
  };

  return (
    <section>
      <Navbar activePage="realizar-solicitacoes" />
      <div>
        <section className="welcome">
          <div className="welcome-left">
            <h1>Faça sua solicitação de laboratório, {username}!</h1>
            <span>
              É fácil: preencha todos os campos obrigatórios e receba seu token
              de reserva.
            </span>
          </div>
        </section>

        <div className="buttonContainerReserva">
          <button
            className={activeForm === "informatica" ? "active" : ""}
            onClick={() => handleButtonClick("informatica")}
          >
            <FcSelfServiceKiosk /> Informática
          </button>
          <button
            className={activeForm === "multidisciplinar" ? "active" : ""}
            onClick={() => handleButtonClick("multidisciplinar")}
          >
            <FcBiotech /> Multidisciplinar
          </button>
          <button
            className={activeForm === "equipamento" ? "active" : ""}
            onClick={() => handleButtonClick("equipamento")}
          >
            <FcWebcam /> Equipamento
          </button>
        </div>
        {activeForm === "informatica" && <InformaticaForm id={id} />}
        {activeForm === "multidisciplinar" && <MultidisciplinarForm id={id} />}
        {activeForm === "equipamento" && (
          <div>
            <br></br>
            Formulário de Equipamento (ainda não implementado), mas você pode{" "}
            <br></br>
            realizar a reserva por aqui{" "}
            <a href="https://anhangueratx.github.io/reservas/pages/equipamentos.html">
              Ir para a Pagina
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

const generateTokenTI = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "INFO-";
  for (let i = 0; i < 6; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  // localStorage.setItem("tokenReserva", token);
  return token;
};

const generateTokenLab = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "LABS-";
  for (let i = 0; i < 6; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

export default App;
