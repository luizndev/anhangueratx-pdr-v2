import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await axios.post("http://localhost/auth/reset-password", {
        token,
        newPassword,
      });

      if (response.status === 200) {
        setSuccess("Senha redefinida com sucesso!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setError("Erro ao redefinir senha. Tente novamente.");
    }
  };

  return (
    <div className="container-reset">
      <h1>Redefinir Senha</h1>
      token {token}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );
};

export default ResetPassword;
