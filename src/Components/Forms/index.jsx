import { useContext, useEffect, useState } from "react";
import { Button, ButtonTrasparent } from "../Button";
import { Input, Select } from "../Input";
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

export const FormAtivement = ({ places, list, setList, setPlaces, update }) => {
  const { user } = useContext(context);

  const [ativement, setAtivement] = useState({
    number: "",
    name: "",
    locale: "",
  });

  const validateData = async (e) => {
    e.preventDefault();

    const numeracaoEmUso = await validateNumberAtivement();

    //quantidade de caracteres maior que 3
    if(ativement.name.length <= 2){
      alert("Nome do ativo com poucos caracteres")
    }
    //quantidade de caracteres maior que 5 para numeracao
    else if (ativement.number.length<=5){
      alert("Número do ativo com poucos caracteres, obrigatório ser mais do que 5");
    }
    else if (ativement.name.trim() == "" || ativement.locale.trim() == ""){
      alert("Campos nao preenchidos corretamente.")
    }
    else if(numeracaoEmUso){
      alert("Numero do ativo ja utilizado")
    }
    else{
      createAtivement();
    }
    //a numeraçao do ativo nao pode ser repitida 
  }

  const validateNumberAtivement = () => {
    fetch("http://localhost:3000/ativos?numero=" + ativement.number)
    .then( response => response.json())
    .then( response => {
      if ( response[0])
      {
        return true;
      }
      return false;
    })
    .catch(()=>{
      return true;
    })
  }

  const createAtivement = async (e) => {
    try {
      // Procurar o local especificado para ver se ele existe
      const localId = await findPlace(ativement.locale);

      // Definindo os dados a serem enviados.
      const data = {
        // Obtemos todos os dados de ativemente.
        ...ativement,
        locale: localId,
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

      // Alimentando o novo Ativo na lista de ativos
      setList([...list, data]);
    } catch (error) {}
  };

  const findPlace = (local) => {
    return fetch("http://localhost:3000/locais?nome=" + local)
      .then((response) => response.json())
      .then(async (response) => {
        //Se o local, nào for encontrado registrar ele no banco de dados
        if (!response[0]) {
          return await createPlace(local);
        }
        //Caso ele exista, retornar o id do local informado
        else {
          return response[0].id;
        }
      })
      .catch(() => {
        alert("Não foi encontrado nenhum local com essas informaçoes");
      });
  };

  const createPlace = (local) => {
    try {
      const data = {
        id: uuid(),
        nome: local,
      };

      fetch("http://localhost:3000/locais", {
        method: "POST",
        body: JSON.stringify(data),
      });

      //Inserir o novo local na lista de locais
      setPlaces([...places, data]);

      return data.id;
    } catch (error) {
      alert("Não foi possivel registrar o novo local.");
    }
  };

  useEffect(()=>{
    setAtivement(update);
  }, [update])
  return (
    <form
      onSubmit={validateData}
      className="bg-[#D9D3F6] w-full mt-6 py-5 px-10 rounded md:flex justify-between items-end shadow-md"
    >
      {/* Traz os dados ja contido no ativemente e altera apenas o number */}
      <Input
        disabled={!!ativement.id}
        type="number"
        styles="md:w-[20%]"
        id="numeroativo"
        value={ativement.number}
        onChange={(e) => setAtivement({ ...ativement, number: e.target.value })}
      >
        Numero do ativo
      </Input>
      <Input
        type="Text"
        styles="md:w-[20%]"
        id="nomeativo"
        value={ativement.name}
        onChange={(e) => setAtivement({ ...ativement, name: e.target.value })}
      >
        Nome do ativo
      </Input>
      <Select
        places={places}
        styles="md:w-[20%]"
        id="localativo"
        value={ativement.locale}
        onChange={(e) => setAtivement({ ...ativement, locale: e.target.value })}
      >
        Local do aivo
      </Select>

      <ButtonTrasparent styles="my-4 md:my-0 w-full md:w-[15%] border-primary-blue text-primary-blue">
        {" "}
        Limpar campos
      </ButtonTrasparent>

      <Button
        styles="w-full md:w-[15%]"
      >
        Inserir ativo
      </Button>
    </form>
  );
};
