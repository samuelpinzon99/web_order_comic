import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import { useNFTsByOwnerAllContracts } from "../../hooks/useContractData";
import { useGetCollection } from "../../hooks/useClientData";

const COLLECTIONS_TESNET = [
  {
    name: "Los delegados del fundador",
    contract: "0x282e6F1222cD91F7d608F2d4936EC114c9842196",
    priority: 1,
    video:
      "https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FABRIL-VIDEO%202%20cambios%20ok.mp4?alt=media&token=3c5491ff-7fa7-4c22-91b5-1ce0362afeb0",
  },
  {
    name: "Order special guest",
    contract: "0xc882c4abF93eD56632Acc9a5a8677c6321bA4514",
    priority: 1,
    video:
      "https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FABRIL-VIDEO%202%20cambios%20ok.mp4?alt=media&token=3c5491ff-7fa7-4c22-91b5-1ce0362afeb0",
  },
  {
    name: "Prueba nft order",
    contract: "0xf1e56Ee5E2654c689642AECfA46B38a40EAb3C44",
    priority: 3,
    video:
      "https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FABRIL-VIDEO%203.mp4?alt=media&token=53adc3ce-9f68-48aa-b656-fd98dc525b7c",
  },
];

function CardCollection({ collection }) {
  return (
    <NavLink to={`/collecion-club/${collection.contract}`}>
      <div className="welcome-card card h-100">
        <div>
        <img
          src={collection.coleccion_img}
          className="card-img-top"
          alt="..."
        />
        </div>
        
        <div className="card-body d-flex justify-content-center align-items-center">
          <h5 className="card-title">{collection.nombre}</h5>
        </div>
      </div>
    </NavLink>
  );
}

export function WelcomeClub() {
  const navigate = useNavigate();
  const { account, chainId, balance } = useConnectWalletContext();

  /**
   * cambiar la colecion id del Cliente a ORDER
   */
  const { colecciones } = useGetCollection();
  const { nftsAccountAllContracts, priorityCollection, loading } =
    useNFTsByOwnerAllContracts();

    /**
   * cambiar lA red a mainet 137
   */
  if (chainId !== "80001") {
    return (
      <div id="hero" className="bienvenido-al-club">
        <div className="container p-10">
          <p>¡Red no soportada, cambia de red en Metamask!! 😼</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div id="hero" className="bienvenido-al-club">
        <div className="container p-10">
          <p>¡Conecta tu billetera para poder identificarte!</p>
          <span
            href="#"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/wallet")}
            className="get_a_test-NFT-btn ppal_cta"
          >
            Conectar wallet
          </span>
        </div>
      </div>
    );
  }

  if (nftsAccountAllContracts.length < 1) {
    return (
      <div id="hero" className="bienvenido-al-club">
        <div className="container p-10">
          {loading ? (
            <p>Cargando....</p>
          ) : (
            <p>
              ¡Actualmente no cuentas con ningun nft de nuestras colecciones!!
            </p>
          )}
        </div>
      </div>
    );
  }


  return (
    <div id="hero" className="bienvenido-al-club">
      {console.log("colecccions", colecciones)}
      <div className="container-lg pt-lg-4" style={{ paddingTop: "100px" }}>
        {loading ? (
          <p>Cargando ....</p>
        ) : (
          <>
            {/* {priorityCollection.state ? (
              <h1>¡Bienvenido al club delegado!</h1>
            ) : (
              <h1>¡Bienvenido!</h1>
            )} */}
            {/* <p>{col}</p> */}
            {/* <p>¡Conecta tu billetera para poder identificarte! </p> */}
            {/* <a href="#" class="ppal_cta">¡Conviertete en uno!</a> */}
            {/* <div
              id="welcome-delegado-wrapper"
              className="welcome-delegado-container"
            >
              <div className="video_welcome-video">
                <video
                  id="video_welcome-video"
                  poster="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fabout_order-nft.webp?alt=media&token=75fdfabd-826f-4508-bf56-9dade48811c8"
                  controls
                  loop
                  disablePictureInPicture
                  controlsList="nodownload"
                >
                  <source src={priorityCollection.video} />
                </video>
              </div>
            </div> */}

            <h1 class="collections-title">Coleciones</h1>
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-3">
              {colecciones &&
                colecciones.map((collection) => (
                  <div key={collection.contract} className="col">
                    <CardCollection collection={collection} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
