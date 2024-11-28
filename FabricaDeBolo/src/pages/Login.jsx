import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Se não estiver importado


const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMessagem, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const url = "http://localhost:5000/usuarios";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(url);
        const users = await req.json();
        setUsuarios(users);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  const gravarLocalStorage = (usuario) => {
    localStorage.setItem("usuarioLogado", usuario.nome);
    localStorage.setItem("email", usuario.email);
    localStorage.setItem("senha", usuario.senha);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userToFind = usuarios.find((user) => user.email === email);

    if (email) {
      if (senha) {
        if (userToFind && userToFind.senha === senha) {
          gravarLocalStorage(userToFind);
          setAlertClass("mb-3 mt-2");
          setAlertVariant("success");
          setAlertMessage("Login efetuado com sucesso");
          alert("Login efetuado com sucesso");
          navigate("/home");
        } else {
          setAlertClass("mb-3 mt-2");
          setAlertMessage("Usuário ou senha inválidos");
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMessage("O campo senha não pode ser vazio");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMessage("O campo email não pode ser vazio");
    }
  };

  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex flex-col justify-center items-center">
          <img
            alt="Your Company"
            src="logo.png"
            className="h-custom w-custom"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium"
              ></label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="  Email:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 bg-white text-black "
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium"
                ></label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="  Senha:"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 bg-white text-black placeholder-slate-700"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
