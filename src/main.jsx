import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./reset.css";

// IMPORTAÇÃO DE PAGES
import Inicio from "./pages/Inicio/Inicio.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Minhas from "./pages/Minhas/Minhas.jsx";
import Feed from "./pages/Feed/Feed.jsx";
import Reservar from "./pages/Reservar/Reservar.jsx";
import ResetPassword from "./pages/Reset/Reset.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="minhas-solicitacoes" element={<Minhas />} />{" "}
        <Route path="feedback" element={<Feed />} />
        <Route path="realizar-solicitacoes" element={<Reservar />} />
      </Routes>
    </Router>
  </StrictMode>
);
