import React from "react";
import { Tabs } from "../components/Tabs";

export function ModalBenefits ({setOpen, points, level}) {
  return (
    <>
      <div className="modal-background"></div>
      <div className="modal" style={{width:'100%', maxWidth: '1000px'}}>
        {/* <div className="modal-text">
        </div> */}
        <Tabs/>
        <button
          className="modal-button"
          onClick={() => setOpen(false)}
        >
          Aceptar
        </button>
      </div>
    </>
  );
};
