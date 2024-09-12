import React, { useState } from "react";
import { Paragraph, TextError, Title } from "../../Components/Texts";
import { ButtonLink } from "../../Components/Button";
import { FormAccess } from "../../Components/Forms";
import { useNavigate } from "react-router-dom";


const Login = ({
    onLinking, 
    setUser
}) => {
    const navigate = useNavigate();

    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");

    const [userAccess, setUserAccess] = useState("");

    const verifyAccess = (e) => {
        e.preventDefault();

        setLoad(true);
    
        fetch(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`)
        .then( response => response.json() )
        .then( response => {
            if(response[0].login){
                setUser({
                    id: response[0].id,
                    login: response[0].login,
                    imagem: response[0].imagem
                })
                navigate("painel-ativos");
            }else{
                setMessage("Usuario nao encontrado, tente novamente");
            }
        })
        .catch(() => {
            setMessage("Nao foi possivel efetuar o login");
        })


        setLoad(false);
        setUserAccess("");
    }

    return (
        <section className="flex flex-1 flex-col items-center justify-center gap-4 md:gap-8">
            <Title>Entrar na plataforma</Title>

            <Paragraph>Para acessar sua conta, informe seu usuário de acesso vínculado ao Github</Paragraph>

            {/* Formulario de cadastro */}

            <FormAccess
                load={load}
                onSubmit={verifyAccess} 
                textButton="Acessar conta"
                value={userAccess}
                onChange={e => setUserAccess(e.target.value)}/>

            <TextError>{message}</TextError>

            <Paragraph>Seu primeiro acesso? <ButtonLink onClick={onLinking}>registre-se aqui</ButtonLink></Paragraph>
        </section>
    )   
}

export default Login;