const CardProduto = (props) => {
    const handleDelete = async (e) => {
      const req = await fetch(`http://localhost:5000/produtos/${props.id}`, {
        method: "DELETE",
      });
      const res = await req.json();
      console.log(res);
      alert(`Produto ${res.nome} removido`);
    };
  
    return (
      <div className="w-96 border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        {/* Imagem do Card */}
        <img
          src={props.imagemUrl}
          alt={props.nome}
          className="w-full h-48 object-cover"
        />
  
        <div className="p-4">
          {/* Título do card com nome do produto */}
          <h2 className="text-xl font-semibold mb-2">{props.nome}</h2>
  
          {/* Subtítulo com o preço do produto */}
          <h3 className="text-lg text-gray-600 mb-4">Preço: {props.preco}</h3>
  
          {/* Descrição do produto */}
          <p className="text-sm text-gray-700 mb-4">
            <b>Descrição:</b> <br />
            {props.descricao}
          </p>
  
          {/* Categoria do produto */}
          <p className="text-sm text-gray-700 mb-4">
            <b>Categoria:</b> <br />
            {props.categoria}
          </p>
  
          {/* Botões de Ação */}
          <div className="flex justify-between">
            {/* Botão de Editar */}
            <a
              href={`/produto/editar/${props.id}`}
              className="text-center bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Editar
            </a>
  
            {/* Botão de Excluir */}
            <button
              onClick={handleDelete}
              className="text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardProduto;
  