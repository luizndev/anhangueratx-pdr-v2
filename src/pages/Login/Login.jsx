import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiSolidErrorAlt } from "react-icons/bi";
import { GoCheckCircle } from "react-icons/go";
import "./Login.css";

const LoadingModal = () => (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="loading-spinner"></div>
      <p>Autenticando...</p>
    </div>
  </div>
);

const SuccessModal = () => (
  <div className="modal-overlay">
    <div className="modal-content success">
    <GoCheckCircle />
      <p>Logado com sucesso!</p>
    </div>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [esqueci, setEsqueci] = useState(false);
  const [formDataEmail, setFormDataEmail] = useState({ email: "" });
  const navigate = useNavigate();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost/auth/recover", {
        email: formDataEmail.email,
      });

      if (response.status === 200) {
        alert("E-mail enviado com sucesso! Verifique sua caixa de entrada.");
        setEsqueci(false);
        setFormDataEmail({ email: "" });
      }
    } catch (error) {
      setError("Erro ao registrar formulário");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://pdr-auth-ofc.vercel.app/auth/login",
        { email, password }
      );

      if (response.status === 200) {
        const { userId, token } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("id", userId);
        sessionStorage.setItem("isLoggedIn", "true");

        await fetchData(userId, token);
        setIsLoading(false);
        setIsSuccess(true);
        
        setTimeout(() => {
          navigate('/inicio');
        }, 1200);
      }
    } catch (error) {
      setIsLoading(false);
      setError(
        error.response ? error.response.data.message : "Erro ao logar. Tente novamente."
      );
    }
  };

  const fetchData = async (id, token) => {
    try {
      const response = await axios.get(
        `https://pdr-auth-ofc.vercel.app/auth/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const { name, email, role } = response.data.user;

        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        setUsername(name);
        setRole(role);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container-login">
      {isLoading && <LoadingModal />}
      {isSuccess && <SuccessModal />}
      
      <header>
        <img src="./Logotype.svg" alt="Logo" />
      </header>
      
      <div className="right">
        <form className="logincontainer" onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <h2>Portal de Reservas</h2>
          
          {error && (
            <p className="error-message">
              <BiSolidErrorAlt /> {error}
            </p>
          )}
          
          <div className="inputType">
            <MdEmail className="icone" />
            <input
              type="email"
              name="login"
              id="login"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="inputType">
            <RiLockPasswordFill className="icone" />
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="containerButton">
            <button 
              className="submit" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"} <FaChevronRight />
            </button>
          </div>
          
          <div className="dicas">
            <button 
              type="button"
              className="esqueciminha" 
              onClick={() => setEsqueci(true)}
            >
              Esqueci minha senha
            </button>
            <div className="criarConta">
              <p>Não tem uma conta?</p>
              <Link to="/register">Criar sua conta</Link>
            </div>
          </div>
        </form>
      </div>

      <footer>
        <span>
          Precisa de ajuda? Por favor, envie um e-mail para:
          <Link to="mailto:luis.e.silva@kroton.com.br">
            luis.e.silva@kroton.com.br
          </Link>
        </span>
      </footer>

      {esqueci && (
        <div className="modal-container2">
          <div className="modal2">
            <h1>Esqueci minha senha</h1>
            <p>
              Olá! Para enviarmos sua senha, por favor, digite seu e-mail. 
              Você a receberá diretamente na sua caixa de entrada. 📩
            </p>
            <form onSubmit={handleSubmitEmail}>
              <div className="inputType2">
                <MdEmail className="icone" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  value={formDataEmail.email}
                  onChange={(e) =>
                    setFormDataEmail({ ...formDataEmail, email: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit">Receber via e-mail</button>
            </form>
            <button onClick={() => setEsqueci(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;