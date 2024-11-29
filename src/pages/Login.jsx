import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// URL da API do JSON Server
const url = "http://localhost:5000/usuarios"; // Endereço onde o JSON Server está rodando

const LoginUsuario = () => {
  // Estados para armazenar os dados do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estado para o alerta de feedback
  const [alertClass, setAlertClass] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate(); // Hook para navegação

  // Função para validar e fazer login do usuário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregamento da página

    // Validação dos campos
    if (!email || !senha) {
      setAlertClass("mb-3 mt-2");
      setAlertMessage("Todos os campos devem ser preenchidos");
      return;
    }

    try {
      // Buscando o usuário pelo email
      const res = await fetch(url);
      const usuarios = await res.json();
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email && usuario.senha === senha
      );

      // Verificando se o login foi bem-sucedido
      if (usuarioEncontrado) {
        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMessage("Login realizado com sucesso!");
        alert("Login realizado com sucesso!");

        // Redirecionando para a página inicial ou outra página após o login
        setTimeout(() => {
          navigate("/home"); // Redireciona para a página de home
        }, 2000);
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMessage("Email ou senha inválidos");
      }
    } catch (error) {
      console.log(error);
      setAlertClass("mb-3 mt-2");
      setAlertMessage("Houve um erro ao tentar realizar o login. Tente novamente.");
    }
  };

  return (
    <div
      style={{
        background: "#ffcbdb", // Alterando o fundo para #ffcbdb
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container
        style={{
          background: "#ffcbdb",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.493)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#333" }}>Login de Usuário</h2>
          <p style={{ color: "#666" }}>Preencha os campos abaixo para entrar</p>
        </div>

        {/* Alerta de feedback */}
        <Alert className={alertClass} variant={alertVariant}>
          {alertMessage}
        </Alert>

        {/* Formulário de login com fundo rosa suave */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: "#f9c9d6", // Rosa suave para o fundo do formulário
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formSenha" className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                background: "#007bff",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.background = "#007bff")}
            >
              Entrar
            </Button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#666" }}>
            Não tem uma conta?{" "}
            <a
              href="/cadastro"
              style={{
                textDecoration: "none",
                color: "#007bff",
              }}
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LoginUsuario;
