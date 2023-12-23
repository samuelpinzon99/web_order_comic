import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { appendScript } from "../../utils/appendScript";


const Checkout = () => {

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
                factura: String(invoiceNumber),
            };
            let handler = window.ePayco.checkout.configure({
                key: process.env.REACT_APP_EPAYCO_KEY,
                test: true
            });
            let epaycoForm = {
                name: "Token delegados",
                description: "Token para recibir NFT de la membresía delegados",
                invoice: invoiceNumber,
                currency: "cop",
                amount: "160000",
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
            addDoc(ref, epaycoData)
            .then((result) => {
                handler.open(epaycoForm);
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
        
    }
    return (
        <div id="hero" className="geta-nft-test">
            <div className="container p-10">
                <h1>Formulario de pago</h1>
                {/* <p>¡Nos encata tu curiosidad!</p> */}
                {/* <!-- <a href="#" class="ppal_cta">¡Nos encata tu curiosidad!</a> --> */}

                {/* <div class="info-getanft">
                    <div class="container align-items-start py-4 d-flex">

                        <div class="getnftcol1 col-6 ">
                            <p class="getnft-show">Por eso queremos enseñarte cómo utilizar un <span class="yellow_txt">NFT</span>
                                totalmente
                                <span class="yellow_txt">GRATIS</span>.
                            </p>
                        </div>
                        <div class="getnftcol2  col-6">
                            <img src="assets/img/ORDER_NFT_001.gif" class="img-fluid peoplesmoke" alt="" />
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <p className="tonext_a">¡Antes de comprar tu NFT deberás crear una CryptoWallet! ¿Ya tienes la tuya?

                            De no ser así, a continuación encontrarás un video tutorial de como crear una y como compartir su “dirección” para recibir activos digitales en la red que desees, puntualmente Polygon MainNet para esta ocasión.</p>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <div id="instruction-wrapper">
                            {/* <div class="instruction-viddeo"></div> */}
                            
                            {/* <div className="instruction-form"> */}
                            <div >
                                <img src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2FORDER_NFT_001.gif?alt=media&token=17e81759-e587-4403-85c5-0a12ab52c324" className="img-fluid peoplesmoke" alt="" />
                                <form id="get_a_NFT_gift" onSubmit={handlePaymentForm}>
                                    <input id="wallet_address" className="get_a-NFT-input" type-="text" name="wallet_address"
                                        placeholder="Dirección de Crypto Wallet" required onChange={(e) => setWallet(e.target.value)} />
                                    <label> Acepto terminos y condiciones</label>
                                    <input className="get_a-NFT-input" name="terms" type="checkbox" required onChange={(e) => setTerms(e.target.checked)}  />
                                    

                                    {/* <input id="claim_code" className="get_a-NFT-input" type="text" name="claim_code"
                                        placeholder="Código regalo" />
                                    <input id="email" className="get_a-NFT-input" type="email" name="email"
                                        placeholder="Correo" /> */}


                                    <button type="submit" className="get_a-NFT-btn">Proceder al pago</button>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>





                {/* <p className="tonext_a">Ahora, te enviaremos un NFT de prueba para que puedas interactuar con nuestra plataforma antes de realizar tu
                    inversión. Diligencia el formulario y espera tu primer NFT!</p> */}
            </div>
        </div>
    )
}

export default Checkout;