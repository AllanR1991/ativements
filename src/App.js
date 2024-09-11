import { Paragraph, Title } from "./Components/Texts";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import logomarca from "./Assets/logomarca.png"
import { useState } from "react";

function App({setUser}) {
  const [left, setLeft] = useState("top-[0%] md:left-[0%] md:top-[0%] h-3/6"); 
  return (
    <main className="flex flex-col h-screen gap-10 sm:flex-row sm:gap-0">
      <section className={`flex flex-col items-center justify-center h- bg-atvGradient md:w-[50%] absolute md:h-screen transition-all duration-500 w-full ${left}`}>
        <Title styles="text-complementary-white">Bem-vindo ao <img src={logomarca} alt="Ativements"/></Title>

        <Paragraph styles="text-complementary-white mt-[60px] md:mt-[60px]">A plataforma eficiente para gerenciar e acompanhar todos os recursos da escola SENAI Informática</Paragraph>
        
      </section>
      <Register onLinking={e => setLeft("top-[0%] md:left-[0%] md:top-[0%] h-3/6")} setUser={setUser}/>
      <Login onLinking={e => setLeft("top-[50%] md:left-[50%] md:top-[0%] h-4/6")} setUser={setUser}/>
    </main>
  );
}

export default App;
