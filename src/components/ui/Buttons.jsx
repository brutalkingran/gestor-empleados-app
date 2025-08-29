import { Navigate, useNavigate } from "react-router"

export const ButtonDesktop = ({ text, styles, action = () => console.log("button pressed")}) => {
  return (
    <button
      className = {`cursor-pointer rounded p-2 text-white m-2 hover:scale-105 transition-transform duration-200 ${styles}`}
      onClick={action}
    >
      { text }
    </button>
  )
}

export const ButtonMobile = ({ text, action }) => {
  return (
    <button
      className="cursor-pointer p-1 m-2 py-1 px-40"
      onClick={action}
    >
      { text }
    </button>
  )
}

export const ButtonNavbar = ({ text, to, styles = "text-slate-100 hover:text-gray-200" }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`cursor-pointer ${styles}`}
      onClick={() => navigate(to)}
    >
      { text }
    </button>
  )
}