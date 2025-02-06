import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidErrorAlt } from "react-icons/bi";
import "./Register.css";

// Loading Modal Component
const LoadingModal = () => (
  <div className="loading-modal-overlay">
    <div className="loading-modal">
      <div className="loading-spinner"></div>
      <p>Processando seu registro...</p>
    </div>
  </div>
);

const ConfirmModal = ({ onNavigateToLogin }) => (
  <div className="loading-modal-overlay">
    <div className="loading-modal success-modal">
      <IoShieldCheckmarkSharp className="success-icon" />
      <p>Registrado com sucesso!</p>
      <button className="login-button" onClick={onNavigateToLogin}>
        Ir para o Login
      </button>
    </div>
  </div>
);

const Register = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    setIsSuccess(false);
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Verificação de senhas
    if (senha !== confirmarSenha) {
      setError("As senhas não são iguais.");
      setIsLoading(false);
      return;
    }

    const newUser = {
      name: `${nome} ${sobrenome}`,
      email: email,
      password: senha,
      confirmpassword: senha,
      role: role,
    };

    try {
      const response = await fetch(
        "https://pdr-auth-ofc.vercel.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (response.ok) {
        setError("");
        setIsLoading(false);
        setIsSuccess(true);
      } else {
        setError("Erro ao registrar. Tente novamente mais tarde.");
        setIsLoading(false);
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container-login">
      {isLoading && <LoadingModal />}
      {isSuccess && <ConfirmModal onNavigateToLogin={handleNavigateToLogin} />}
      <header>
        <img src="./Logotype.svg" alt="Logotipo" />
      </header>
      <div className="right">
        <form className="logincontainer" onSubmit={handleSubmit}>
          <h1>Registre-se</h1>
          <h2>Portal de Reservas</h2>
          {error && (
            <p className="error-message">
              <BiSolidErrorAlt /> {error}
            </p>
          )}

          <div className="inputType">
            <FaUser className="icone" />
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="inputType">
            <FaUser className="icone" />
            <input
              type="text"
              name="sobrenome"
              id="sobrenome"
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
            />
          </div>

          <div className="inputType">
            <MdEmail className="icone" />
            <input
              type="email"
              name="email"
              id="email"
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="inputType">
            <RiLockPasswordFill className="icone" />
            <input
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <div className="inputType">
            <label className="funcao" htmlFor="role">Função</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">Tutor/Docente</option>
            </select>
          </div>

          <div className="containerButton">
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar"} <FaChevronRight />
            </button>
          </div>

          <div className="dicas2">
            <p>Já tem uma conta?</p>
            <Link to="/login">Fazer login</Link>
          </div>
        </form>
      </div>

      <footer>
        <span>
          Precisa de ajuda? Envie um e-mail para:
          <Link to="mailto:luis.e.silva@kroton.com.br">
            luis.e.silva@kroton.com.br
          </Link>
        </span>
      </footer>
    </div>
  );
};

export default Register;