import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { FormAtivement } from "../../Components/Forms";
import { Tabs } from "../../Components/Tabs";
import { Table } from "../../Components/Table";


const Painel = () => {

    const [ selectedPlace, setSelectedPlace] = useState("");
    const [ places, setPlaces] = useState([]);
    const [ listAtivements, setListAtivements] = useState([]);
    const [update, setUpdate] = useState({});
    const getPlaces = () => {
        fetch("http://localhost:3000/locais")
        .then(response => response.json())
        .then(response => {
            setPlaces(response);
            // Se Tiver ao menos um local cadastrado usar o primeiro resultado como filtro dos ativos
            if(response[0]){
                setSelectedPlace(response[0].id)
            }
        })
        .catch(() => {
            alert("Erro inesperado, não foi possivel obter os locais dos ativos.");
        })
    }

    const filterAtivements = ( local ) => {
        fetch("http://localhost:3000/ativos?locale=" + local)
        .then(response => response.json())
        .then(response=> {
            setListAtivements(response);
        })
        .catch(()=>{
            alert("Nao foi possivel obter os ativos.")
        })
    }

    useEffect(() => {
        if(selectedPlace === ""){
            getPlaces()
        }
    }, [])

    useEffect(()=>{
        filterAtivements(selectedPlace)
    }, [selectedPlace]);

    return (
        <div className='w-10/12 mx-auto my-0'>
            <Header/>
            
            <FormAtivement places={places} setPlaces={setPlaces} setListAtivements={setListAtivements} list={listAtivements} update={update}/>

            <Tabs places={places} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>

            <Table listAtivements={listAtivements.filter(x => x.locale === selectedPlace)} setList={setListAtivements} setUpdate={setUpdate} />
        </div>
    )
}

export default Painel;