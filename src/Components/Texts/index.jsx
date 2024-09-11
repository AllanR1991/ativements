import React from "react";

export const Title = (props) => {
    return <h1 className={`text-xl font-semibold text-center sm:text-2xl ${props.styles}`}>{props.children}</h1>
}

export const Paragraph = (props) => {
    return <p className={`text-base text-center w-[80%] sm:text-xl sm:w-[47%] ${props.styles}`}>{props.children}</p>
}

export const TextError = (props) => {
    return <p className="text-lg text-primary-red">{props.children}</p>
}