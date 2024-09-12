import React, { useContext } from "react";
import context from "../../Context/context";

import logomarca from "../../Assets/logomarca_dark.png";
import { FaPowerOff } from "react-icons/fa";
import { ButtonTrasparent } from "../Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(context); // chamando dentro do contexto do projeto os dados do usuario.

  const navigate = useNavigate();

  /**
   * Função para deslogar o usuário.
   */
  const logoutUser = () => {
    try {
      const data = {
        ...user,
        ultimoAcesso: new Date().toJSON(),
      };
      /**
       * Atulizando os dados do usuario no banco de dados informando a data do utimo acesso.
       */
      fetch("http://localhost:3000/usuarios/" + user.id, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setUser({});//Limpando os dados de acesso na context.
      navigate("/");//Navegando para tela home
    } catch (error) {
      alert("Não foi possivel sair da aplicação.");
    }
  };



  return (
    <header className="w-full flex justify-between items-center py-5">
      <img src={logomarca} alt="Logo ativements" />
      <div className="flex justify-center items-center gap-5">
        <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${user.login}`}>
          <img
            className="w-14 rounded"
            src={user.imagem}
            alt="imagem de perfil do usuario"
          />
        </a>

        <ButtonTrasparent onClick={logoutUser} styles="border-primary-red">
          <FaPowerOff fill="#bf0000" />
        </ButtonTrasparent>
      </div>
    </header>
  );
};

export default Header;
