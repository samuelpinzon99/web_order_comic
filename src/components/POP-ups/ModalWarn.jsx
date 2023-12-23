import React from "react";

const ModalWarn = ({setModalWarn}) => {
  return (
    <>
      <div className="modal-background"></div>
      <div className="modal">
        <div className="modal-text">
        <h1>Código Inválido</h1>
        <p>Ooops, algo salió mal. Revisa que el código sea correcto o comunícate con nuestra área 
            de servicio.
        </p>
        </div>
        <button
          className="modal-button"
          onClick={() => setModalWarn(false)}
        >
          Aceptar
        </button>
      </div>
    </>
  );
};

export default ModalWarn;