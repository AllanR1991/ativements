import React, { useState } from "react";
import { Paragraph, TextError, Title } from "../../Components/Texts";
import { ButtonLink } from "../../Components/Button";
import { FormAccess } from "../../Components/Forms";
import { octokit } from "../../Utils/githubKey";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const Register = ({ onLinking, setUser }) => {
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");

  const [userAccess, setUserAccess] = useState("");

  const validateUser = (e) => {
    e.preventDefault();

    setLoad(true);
    octokit
      .request("GET /users/{username}", {
        username: userAccess,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then(async (response) => {
        console.log(response);
        const verify = await checkUserExists();

        if (!verify) {
          registerUser(response.data);
        } else {
          setMessage("Usuario ja cadastrado");
        }
      })
      .catch(() => {
        setMessage("Usuario nao encontrado, tente novamente");
      });

    setLoad(false);
    setMessage("");
  };

  const checkUserExists = () => {
    return fetch(
      `http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.length > 0) {
          return true;
        }
        return false;
      })
      .catch(() => {
        alert("Nao foi possivel encontrar o usuario");
      });
  };

  const registerUser = (user) => {
    setMessage("");
    try {
      const data = {
        id: uuid(),
        login: user.login.toLowerCase(),
        imagem: user.avatar_url,
      };
      fetch("http://localhost:3000/usuarios", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setUser(data);
      navigate("/painel-ativos");
    } catch (error) {
      setMessage("Nao foi possivel efetuar o resgistro");
    }
  };
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-3 sm:gap-8">
      <Title>Registrar-se na plataforma</Title>

      <Paragraph>
        Para criar uma conta, informe a url de acesso ao seu perfil da plataforma do Github
      </Paragraph>

      {/* Formulario de cadastro */}

      <FormAccess
        load={load}
        onSubmit={validateUser}
        textButton="Cadastrar conta"
        value={userAccess}
        onChange={(e) => setUserAccess(e.target.value)}
      />

      <TextError>{message}</TextError>

      <Paragraph>
        Já possui registro?{" "}
        <ButtonLink onClick={onLinking}>acessar aqui</ButtonLink>
      </Paragraph>
    </section>
  );
};

export default Register;
