import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import ModalPago from "../components/ModalPago";

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return <Link {...props} className={match ? "active" : "non-active"} />;
};
const BecomeDelegate = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && (
        <ModalPago showModal={showModal} setShowModal={setShowModal} />
      )}
      {/* HERO   */}
      <div id="hero" className="bienvenido-al-club herroo">
        <div className="container p-10">
          <h1>CONVIERTETE EN UN DELEGADO</h1>
          <p>
            ¡Recuerda! Antes de comprar tu NFT debes crear tu CryptoWallet.{" "}
          </p>
          <div className="delegados_images">
            <ul>
              <li>
                <img
                  className="img-fluid"
                  src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2FNFTs%20Muestra%2FORDER_NFT_Colleccion_040.gif?alt=media&token=4eaf03ff-8b75-4291-ab9c-e016b01d6974"
                  alt="nft1"
                />
              </li>
              <li>
                <img
                  className="img-fluid"
                  src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2FNFTs%20Muestra%2FORDER_NFT_Colleccion_045.gif?alt=media&token=3920aa07-d1d7-476a-9600-8d47e3006c84"
                  alt="nft3"
                />
              </li>
              <li>
                <img
                  className="img-fluid"
                  src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2FNFTs%20Muestra%2FORDER_NFT_Colleccion_053.gif?alt=media&token=fc3f370b-1e9a-495f-9e21-7c0554716eb1"
                  alt="nft4"
                />
              </li>
              <li>
                <img
                  className="img-fluid"
                  src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2FNFTs%20Muestra%2FORDER_NFT_Colleccion_056.gif?alt=media&token=7623b298-876d-4223-b970-9ce8bf1200d0"
                  alt="nft5"
                />
              </li>
            </ul>
          </div>
          <button className="ppal_cta" onClick={() => setShowModal(true)}>
            ¡Comprar nft!
          </button>
        </div>
      </div>
      {/* END HERO   */}

      <div id="yasanescomo">
        <div className="container">
          <h2>¿Ya sabes cómo hacerlo?</h2>
          <h4>¡Nosotros te enseñamos en 90 segundos!</h4>

          <p>
            A continuación, encontrarás un video tutorial de como crear tu
            billetera digital (CryptoWallet) y cómo compartir su dirección" de
            destino para recibir activos digitales (NFT' S) en la red de
            Polygon.
          </p>

          <video
            poster="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fabout_order-nft.webp?alt=media&token=75fdfabd-826f-4508-bf56-9dade48811c8"
            controls
            loop
            disablePictureInPicture
            controlsList="nodownload"
          >
            <source src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FABRIL-WALLET%20FINAL.mp4?alt=media&token=33b91cb9-4722-4d7f-985a-af688dfd51b8" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default BecomeDelegate;
