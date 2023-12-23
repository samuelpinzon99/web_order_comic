import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { appendScript } from "../../utils/appendScript";



const ModalPago = ({showModal, setShowModal}) => {
 
    // useEffect(() => {
    //     appendScript("https://checkout.epayco.co/checkout.js");
    // })

    const [wallet, setWallet] = useState("");
    const [terms, setTerms] = useState(false);


  const handlePaymentForm = (event) => {
        event.preventDefault();
        if(terms && wallet){
            const ref = collection(firestore, 'Compras');
            let invoiceNumber = Math.floor(Math.random() * 1000000000);
            let epaycoData = {
                wallet: wallet,
                fechaCompra: new Date(),
                estado: "Pendiente",
                nftEnviado:false,
                factura: String(invoiceNumber),
            };
            let handler = window.ePayco.checkout.configure({
                key: process.env.REACT_APP_EPAYCO_KEY,
                test: false
            });
            let epaycoForm = {
                name: "Token delegados",
                description: "Token para recibir NFT de la membresía delegados",
                invoice: invoiceNumber,
                currency: "usd",
                amount: "120",
                tax_base: "0",
                tax: "0",
                country: "co",
                lang: "es",
          
                //Onpage="false" - Standard="true"
                external: "false",
          
                //Atributos opcionales
                // extra1: "extra1",
                // extra2: "extra2",
                // extra3: "extra3",
                confirmation: "https://us-central1-nft-collection-e23b5.cloudfunctions.net/app/epayco/response",
                response: `${window.location.origin}/paymentResponse`,
          
                //Atributos cliente
                // name_billing: "Andres Perez",
                // address_billing: "Carrera 19 numero 14 91",
                // type_doc_billing: "cc",
                // mobilephone_billing: "3050000000",
                // number_doc_billing: "100000000",
          
                //atributo deshabilitación metodo de pago
                // methodsDisable: ["TDC", "PSE","SP","CASH","DP"
            };
            console.log("epycoData",epaycoData)
            addDoc(ref, epaycoData)
            .then((result) => {
                handler.open(epaycoForm);
                console.log("epaycoForm", epaycoForm)
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
        
    }

    
  return (
  <>
   <div className="modal-background"></div>
  <div className="modalP" style={{ display: showModal ? "block" : "none" }}>
  <div className="modal-contentP">
  {/* <button className="close-modal-btn" onClick={()=>setShowModal(false)}>x</button> */}
  <button className="modalCloseP" onClick={() => setShowModal(false)}>X</button>

    <form id="" onSubmit={handlePaymentForm}>
      <input
        id="wallet_address"
        className="get_a-NFT-input"
        type="text"
        name="wallet_address"
        placeholder="Dirección de Crypto Wallet"
        required
        onChange={(e) => setWallet(e.target.value)}
      />
      <label>
        Acepto terminos y condiciones
        <input
          className="get_a-NFT-input"
          name="terms"
          type="checkbox"
          required
          onChange={(e) => setTerms(e.target.checked)}
        />
      </label>
      <button type="submit" className="get_a-NFT-btn modalAcceptBtn">
        Proceder al pago
      </button>
    </form>
  </div>
</div>
<div
  className="modalOverlayP"
  style={{ display: showModal ? "block" : "none" }}
></div>


  </>
    )
  }

  export default ModalPago
  // <div className="modal">
  //   <div className="modal-background" onClick={()=>setShowModal(false)}></div> 
  //   <div className="modal-content">
  //     <form id="get_a_NFT_gift" onSubmit={handlePaymentForm}>
  //       <input
  //         id="wallet_address"
  //         className="get_a-NFT-input"
  //         type="text"
  //         name="wallet_address"
  //         placeholder="Dirección de Crypto Wallet"
  //         required
  //         onChange={(e) => setWallet(e.target.value)}
  //       />
  //       <label>
  //         Acepto terminos y condiciones
  //         <input
  //           className="get_a-NFT-input"
  //           name="terms"
  //           type="checkbox"
  //           required
  //           onChange={(e) => setTerms(e.target.checked)}
  //         />
  //       </label>
  //       <button type="submit" className="get_a-NFT-btn">
  //         Proceder al pago
  //       </button>
  //     <button onClick={()=>setShowModal(false)}>Cerrar</button>
  //     </form>
  //   </div>
  // </div>