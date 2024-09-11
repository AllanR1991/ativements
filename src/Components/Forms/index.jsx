import { useContext, useState } from "react";
import { Button, ButtonTrasparent } from "../Button";
import { Input } from "../Input";
import { v4 as uuid } from "uuid";
import context from "../../Context/context";

export const FormAccess = ({ textButton, onSubmit, onChange, value, load }) => {
  return (
    <form onSubmit={onSubmit} className="w-[40%]">
      <Input
        styles="w-full"
        id="campoFormulario"
        value={value}
        onChange={onChange}
      >
        Usuario de acesso
      </Input>
      <Button load={load} styles="w-full mt-4">
        {textButton}
      </Button>
    </form>
  );
};

export const FormAtivement = () => {
  const { user } = useContext(context);

  const [ativement, setAtivement] = useState({
    number: "",
    name: "",
    locale: "",
  });

  const createAtivement = (e) => {
    e.preventDefault();

    try {
      // Definindo os dados a serem enviados.
      const data = {
        // Obtemos todos os dados de ativemente.
        ...ativement,
        // Adicionamos mais dados para fazer sentido.
        id: uuid(),
        usuario_id: user.id,
        dataRegistro: new Date().toLocaleString(),
        status: true,
      };

      //Faz a presistencia dos dados no JsonServer.
      fetch("http://localhost:3000/ativos", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {}
  };

  return (
    <form
      onSubmit={createAtivement}
      className="bg-[#D9D3F6] w-full mt-6 py-5 px-10 rounded md:flex justify-between items-end shadow-md"
    >
      {/* Traz os dados ja contido no ativemente e altera apenas o number */}
      <Input
        styles="md:w-[20%]"
        id="numeroativo"
        value={ativement.number}
        onChange={(e) => setAtivement({ ...ativement, number: e.target.value })}
      >
        Numero do ativo
      </Input>
      <Input
        styles="md:w-[20%]"
        id="nomeativo"
        value={ativement.name}
        onChange={(e) => setAtivement({ ...ativement, name: e.target.value })}
      >
        Nome do ativo
      </Input>
      <Input
        styles="md:w-[20%]"
        id="localativo"
        value={ativement.locale}
        onChange={(e) => setAtivement({ ...ativement, locale: e.target.value })}
      >
        Local do aivo
      </Input>

      <ButtonTrasparent styles="my-4 md:my-0 w-full md:w-[15%] border-primary-blue text-primary-blue">
        {" "}
        Limpar campos
      </ButtonTrasparent>

      <Button styles="w-full md:w-[15%]">Inserir ativo</Button>
    </form>
  );
};
