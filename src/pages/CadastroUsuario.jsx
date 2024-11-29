import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// URL da API do JSON Server
const url = "http://localhost:5000/usuarios"; // Endereço onde o JSON Server está rodando

const CadastroUsuario = () => {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estado para o alerta de feedback
  const [alertClass, setAlertClass] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate(); // Hook para navegação

  // Função para validar e cadastrar o usuário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregamento da página

    // Validação dos campos
    if (!nome || !email || !senha) {
      setAlertClass("mb-3 mt-2");
      setAlertMessage("Todos os campos devem ser preenchidos");
      return;
    }

    // Criando o objeto do usuário
    const novoUsuario = { nome, email, senha };

    try {
      // Enviando os dados para o JSON Server
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      // Verificando se o cadastro foi bem-sucedido
      if (res.ok) {
        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMessage("Usuário cadastrado com sucesso!");
        alert("Cadastro realizado com sucesso!");

        // Redirecionando para a página de login ou home após o cadastro
        setTimeout(() => {
          navigate("/login"); // Redireciona para a página de login (ou outra página)
        }, 2000);
      } else {
        throw new Error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.log(error);
      setAlertClass("mb-3 mt-2");
      setAlertMessage("Houve um erro ao cadastrar o usuário. Tente novamente.");
    }
  };

  return (
    <div
      style={{
        background: "#ffcbdb", // Alterando o fundo para #ffcbdb (rosa)
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
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#333" }}>Cadastro de Usuário</h2>
          <p style={{ color: "#666" }}>Preencha os campos abaixo para se cadastrar</p>
        </div>

        {/* Alerta de feedback */}
        <Alert className={alertClass} variant={alertVariant}>
          {alertMessage}
        </Alert>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="formNome" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

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
            Cadastrar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CadastroUsuario;
