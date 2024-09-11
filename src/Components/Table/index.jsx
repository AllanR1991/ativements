import React from "react";
import { ButtonTrasparent } from "../Button";

export const Table = ({
    listAtivements
}) => {



    return (
        <div className="overflow-x-scroll lg:overflow-auto">
            <table className="min-w-full mt-10">
                <thead>
                    <tr className="rouded bg-[#e1e0e7]">
                        <th className="py-5 px-10 text-left">Identificacao do ativo</th>
                        <th className="py-5 px-10 text-left">Nome do ativo</th>
                        <th className="py-5 px-10 text-left">Data do registro</th>
                        <th className="py-5 px-10 text-left">Acoes do ativo</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        listAtivements.map(( item, index) => {
                            return (
                                <tr key={index} className="hover:bg-[#f1f0f5] hover:last:border-l-2 hover:border-primary-purple">
                                    <td className="py-5 px-10 text-left">{item.numero}</td>
                                    <td className="py-5 px-10 text-left">{item.nome}</td>
                                    <td className="py-5 px-10 text-left">{item.dataRegistro}</td>
                                    <td className="py-5 px-10 text-left flex gap-5">
                                        <ButtonTrasparent styles="border-none py-0 px-0 text-[#009e9e]">Editar ativo</ButtonTrasparent>
                                        <ButtonTrasparent styles="border-none py-0 px-0 text-primary-red">Remover ativo</ButtonTrasparent>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}