import React from "react";
import { send } from "../../services/sendEmail";

const ModalNftPrueba = ({setModalNftPrueba, mailData}) => {

  const handleClick=()=>{
    send(mailData)
    setModalNftPrueba(false)
  }

  return (
    <>
      <div className="modal-background"></div>
      <div className="modal">
        <div className="modal-text">
        <h1>¡Felicidades!</h1>
        <p>Te enviaremos un NFT de prueba en un plazo máximo de 48 horas hábiles. Una vez sea enviado, te notificaremos mediante un correo.</p>
        </div>
        <button
          className="modal-button"
          onClick={() => handleClick()}
        >
          Aceptar
        </button>
      </div>
    </>
  );
};

export default ModalNftPrueba;