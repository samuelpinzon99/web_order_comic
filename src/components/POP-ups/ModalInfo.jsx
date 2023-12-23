import React from "react";

export const ModalInfo = ({setModalInfo, message}) => {
  return (
    <>
      <div className="modal-background"></div>
      <div className="modal">
        <div className="modal-text">
        <h1>Información</h1>
        <p>{message}</p>
        </div>
        <button
          className="modal-button"
          onClick={() => setModalInfo(false)}
        >
          Aceptar
        </button>
      </div>
    </>
  );
};
