import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardProduto = (props) => {
  // Função para deletar um produto
  const handleDelete = async (e) => {
    const req = await fetch(`http://localhost:5000/produtos/${props.id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log(res);
    alert(`Produto ${res.nome} removido`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <Card
        style={{
          width: "20rem",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        {/* Imagem do Card */}
        <div style={{ height: "200px", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={props.imagemUrl}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <Card.Body
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
          }}
        >
          {/* Título do card com nome do produto */}
          <Card.Title
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
            }}
          >
            {props.nome}
          </Card.Title>

          {/* Subtítulo no card com preço do produto */}
          <Card.Subtitle
            className="mb-3 text-muted"
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              margin: "10px 0",
            }}
          >
            Preço: R$ {props.preco}
          </Card.Subtitle>

          <Card.Text
            style={{
              fontSize: "1rem",
              color: "#666",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <strong>Tipo:</strong> {props.tipo}
          </Card.Text>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              href={`/produto/editar/${props.id}`}
              variant="outline-primary"
              style={{
                width: "45%",
                borderRadius: "25px",
                fontWeight: "bold",
              }}
            >
              Editar
            </Button>
            <Button
              variant="outline-danger"
              style={{
                width: "45%",
                borderRadius: "25px",
                fontWeight: "bold",
              }}
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduto;
