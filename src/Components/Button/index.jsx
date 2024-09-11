import { LoadSpinner } from "../LoadSpinner"

export const Button = (props) => {
    return <button disabled={props.load} type="submit" className={`flex justify-center py-2 px-4 rounded bg-[#004852] text-complementary-white ${props.styles}`}>{props.load ?  <LoadSpinner/> : props.children}</button>
}

export const ButtonLink = (props) => {
    return <button type="button" onClick={props.onClick} className="p-1 underline text-[#372097]">{props.children}</button>
}

export const ButtonTrasparent = (props) => {
    return <button onClick={props.onClick} className={`flex justify-center border items-center rounded py-2 px-4 ${props.styles}`}>{props.children}</button>
}