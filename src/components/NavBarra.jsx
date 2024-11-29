import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBarra = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#2C3E50", // Fundo escuro para um estilo moderno
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Adiciona sombra para destaque
      }}
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand href="/home">
          <img
            src="logo192.png"
            alt="Logo"
            width="45"
            height="45"
            style={{
              borderRadius: "50%",
              border: "3px solid #1ABC9C",
              padding: "3px",
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ border: "1px solid #fff", color: "#fff" }}
        />
        <Navbar.Collapse id="navbarScroll">
          {/* Links de navegação */}
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Nav.Link
              href="/produto/cadastrar"
              style={{
                color: "#ECF0F1",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Cadastrar Produto
            </Nav.Link>
            <Nav.Link
              href="/login"
              style={{
                color: "#E74C3C",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Sair
            </Nav.Link>
          </Nav>

          {/* Campo de busca */}
          <Form
            className="d-flex"
            onSubmit={handleSearch}
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <Form.Control
              type="search"
              placeholder="Procurar"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                border: "1px solid #1ABC9C",
                borderRadius: "5px",
                padding: "0.5rem",
              }}
            />
            <Button
              variant="success"
              type="submit"
              style={{
                backgroundColor: "#1ABC9C",
                border: "none",
                padding: "0.5rem 1rem",
                fontWeight: "bold",
              }}
            >
              Buscar
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarra;
