// Importando components
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarra from "../components/NavBarra";

// URLs para consumo de API
const API_TIPOS = "http://localhost:5000/tipo";
const API_PRODUTOS = "http://localhost:5000/produtos";

// Componente principal
const CadastroProduto = () => {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [alertClass, setAlertClass] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate();

  const linkImagemPadrao =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  // Busca as categorias da API ao carregar
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(API_TIPOS);
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error.message);
      }
    };
    fetchCategorias();
  }, []);

  // Lida com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!nome.trim()) {
      setAlert("danger", "O campo nome não pode estar vazio");
      return;
    }
    if (!preco.trim()) {
      setAlert("danger", "O campo preço não pode estar vazio");
      return;
    }

    const novoProduto = { nome, tipo, preco, imagemUrl };

    try {
      const response = await fetch(API_PRODUTOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar produto");

      setAlert("success", "Produto cadastrado com sucesso");
      setTimeout(() => navigate("/home"), 2000);

      // Reseta os campos
      setNome("");
      setPreco("");
      setTipo("");
      setImagemUrl("");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error.message);
      setAlert("danger", "Erro ao cadastrar produto");
    }
  };

  // Função para exibir o alerta
  const setAlert = (variant, message) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setAlertClass("mb-3 mt-2");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFCBDB" }}>
      <NavBarra />
      <Container>
        <h1 className="text-center my-5">Cadastrar Produto</h1>

        <form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Coluna esquerda */}
            <Col md={6}>
              <FloatingLabel
                controlId="floatingInputNome"
                label="Nome do Produto"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do produto"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>

              <Form.Group controlId="formGridTipo">
                <Form.Label>Tipo de Produto</Form.Label>
                <Form.Select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">Selecione o tipo</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.nome}>
                      {categoria.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <FloatingLabel
                controlId="floatingInputPreco"
                label="Preço"
                className="mt-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Digite o preço"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FloatingLabel>
            </Col>

            {/* Coluna direita */}
            <Col md={6}>
              <FloatingLabel
                controlId="floatingInputImagem"
                label="URL da Imagem"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Insira o link da imagem"
                  value={imagemUrl}
                  onChange={(e) => setImagemUrl(e.target.value)}
                />
              </FloatingLabel>

              <Image
                src={imagemUrl || linkImagemPadrao}
                rounded
                width={300}
                height={300}
                className="d-block mx-auto"
                style={{
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
                }}
              />
            </Col>
          </Row>

          {/* Alerta */}
          <Alert className={alertClass} variant={alertVariant}>
            {alertMessage}
          </Alert>

          {/* Botão de submissão */}
          <div className="text-center">
            <Button
              variant="success"
              size="lg"
              type="submit"
              className="mt-3"
            >
              Cadastrar Produto
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default CadastroProduto;
