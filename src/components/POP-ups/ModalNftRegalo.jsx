import React from "react";
import { send } from "../../services/sendEmail";

const ModalNftRegalo = ({setModalNftRegalo, mailData}) => {

  console.log("mail Data aca ", mailData)
  const handleClick =()=>{
    send(mailData)
    setModalNftRegalo(false)
  }
  return (
    <>
      <div className="modal-background"></div>
      <div className="modal">
        <div className="modal-text">
        <h1>¡Felicidades Delegado!</h1>
        <p>Recuerda que recibirás tu NFT en un plazo máximo de 48 horas hábiles, lo enviaremos a la dirección 
            que indicaste y te notificaremos mediante un correo.
        </p>
        </div>
        <button
          className="modal-button"
          onClick={() =>handleClick() }
        >
          Aceptar
        </button>
      </div>
    </>
  );
};

export default ModalNftRegalo;