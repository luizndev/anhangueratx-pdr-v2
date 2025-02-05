import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiSolidErrorAlt } from "react-icons/bi";

// IMPORTAÇÃO DE STYLE
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Redireciona para o link externo quando o componente for montado
  useEffect(() => {
    window.location.href = "https://anhangueratx-pdr.vercel.app/"; // Substitua pelo seu link externo desejado
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://pdr-auth-ofc.vercel.app/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const idVerify = response.data.userId;
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("id", idVerify);

        sessionStorage.setItem("isLoggedIn", "true");

        fetchData(idVerify, token);

        navigate(`/inicio`);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao logar. Tente novamente.");
      }
    }
  };

  const fetchData = async (id, token) => {
    try {
      const response = await axios.get(
        `https://pdr-auth-ofc.vercel.app/auth/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      <header>
        <img src="./Logotype.svg" alt="" />
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
            <button className="submit" type="submit">
              Entrar
            </button>
          </div>
          <div className="dicas">
            <Link to="#" className="esqueciminha">
              Esqueci minha senha
            </Link>
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
    </div>
  );
};

export default Login;
